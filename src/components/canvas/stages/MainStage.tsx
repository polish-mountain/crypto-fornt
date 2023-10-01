import { PreviewControlsActionContext, PreviewControlsStateContext } from '@/contexts/previewControlls'
import useMouse from '@/hooks/useMouse'
import { cameraDefault } from '@/utils/global'
import { Device, DeviceObj } from '@/utils/types'
import { useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { DeviceModel } from '../DeviceModel'

import { getHosts, hostUpdateHook } from '@/utils/api'
import { generateDeviceOnSphere, transformPositionsToGrid } from '@/utils/layoutFuncs'

const DESKTOP_MATERIALS = [
  {
    name: 'Main_MAt',
    material: new THREE.MeshNormalMaterial({ color: '#7F5AF0' }),
  },
  {
    name: 'Display',
    material: new THREE.MeshBasicMaterial({ color: '#86efac' }),
  },
]

const CAMERA_SPEED = 0.08

type Props = {
  title: string
  setLoaded: () => void
}

export default function MainStage({ title, setLoaded }: Props) {
  let { mouseX, mouseY } = useMouse()

  const [hosts, setHosts] = useState<Device[]>([])
  const { previewControls } = useContext(PreviewControlsStateContext)
  const { setPreviewControls } = useContext(PreviewControlsActionContext)
  const isDesktopsClicked = previewControls === 'desktop'

  // const [layoutFunc, setLayoutFunc] = useState<(devices: DeviceObj[]) => DeviceObj[]>(generateDeviceOnSphere)

  const layoutFunc = isDesktopsClicked ? transformPositionsToGrid : generateDeviceOnSphere

  useEffect(() => {
    console.log(previewControls)
  }, [previewControls])

  useEffect(() => {
    setLoaded()
    getHosts().then((newHosts) => {
      setHosts([...hosts, ...newHosts])
    })
  }, [])

  const d = hostUpdateHook()
  useEffect(() => {
    if (!d) return
    let didExist = false
    let newDesktops = hosts.map((desktop) => {
      if (desktop.ip === d.ip) {
        didExist = true
        return { ...desktop, device: d }
      }
      return desktop
    })
    if (!didExist) {
      setHosts([...hosts, d])
    } else {
      setHosts(newDesktops)
    }
  }, [d])

  const positions = useMemo(() => layoutFunc(hosts), [hosts, layoutFunc])

  const cameraCenter = useRef<{ y: number; z: number }>({ y: cameraDefault[1], z: cameraDefault[2] })

  useFrame(({ camera }) => {
    const tempX = camera.position.x
    const tempY = camera.position.y
    const [defaultX] = cameraDefault

    camera.position.x += (defaultX + -mouseX * 0.4 - tempX) * CAMERA_SPEED
    camera.position.y += (cameraCenter.current.y - -(mouseY * 0.45) - tempY) * CAMERA_SPEED

    camera.lookAt(0, 0, 0)
  })

  return (
    <motion.group
      whileHover={{ scale: isDesktopsClicked ? 1 : 1.1 }}
      onClick={(e) => {
        e.stopPropagation()
        console.log('clicked out')
        setPreviewControls('desktop')
      }}>
      {hosts.map((device, idx) => (
        <DeviceModel variant='desktop' key={idx} animate={{ position: positions[idx] }} materials={DESKTOP_MATERIALS} />
      ))}
    </motion.group>
  )
}
