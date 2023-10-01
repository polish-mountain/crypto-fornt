import { PreviewControlsActionContext, PreviewControlsStateContext } from '@/contexts/previewControlls'
import useMouse from '@/hooks/useMouse'
import { cameraDefault } from '@/utils/global'
import { Device, DeviceObj, DeviceType } from '@/utils/types'
import { useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { DeviceModel } from '../DeviceModel'

import { getHosts, hostUpdateHook } from '@/utils/api'
import { LayoutFuncsProps, generateDeviceOnSphere, transformPositionsToGrid } from '@/utils/layoutFuncs'
import { useScroll } from '@react-three/drei'
import { groupBy } from '@/utils/functions'

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
  const { previewControls, yScrollOffset } = useContext(PreviewControlsStateContext)
  const { setPreviewControls, setYScrollOffset } = useContext(PreviewControlsActionContext)
  const isInGridMode = previewControls !== null

  const layoutFunc = isInGridMode ? transformPositionsToGrid : generateDeviceOnSphere
  const layoutFuncProps: LayoutFuncsProps = { deviceType: previewControls }

  //scroll
  useEffect(() => {
    function scrollListener(ev: WheelEvent) {
      if (isInGridMode) setYScrollOffset(yScrollOffset + ev.deltaY * 0.004)
    }
    document.body.addEventListener('wheel', scrollListener)
    return () => document.body.removeEventListener('wheel', scrollListener)
  }, [yScrollOffset, isInGridMode])

  // reset scroll when grid mode is toggled
  useEffect(() => {
    setYScrollOffset(0)
  }, [isInGridMode])

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

  const positions = useMemo(
    () => Object.fromEntries(layoutFunc(hosts, layoutFuncProps).map((position, i) => [hosts[i].ip, position])),
    [hosts, layoutFunc],
  )

  const cameraCenter = useRef<{ y: number; z: number }>({ y: cameraDefault[1], z: cameraDefault[2] })

  useFrame(({ camera }) => {
    const tempX = camera.position.x
    const tempY = camera.position.y
    const [defaultX] = cameraDefault

    camera.position.x += (defaultX + -mouseX * 0.4 - tempX) * CAMERA_SPEED
    camera.position.y += (cameraCenter.current.y - -(mouseY * 0.45) - tempY) * CAMERA_SPEED

    camera.lookAt(0, 0, 0)
  })

  const grouppedHosts = groupBy(hosts, (host) => host.device_type)
  return (
    <motion.group animate={{ y: yScrollOffset }} transition={{ duration: 0.5 }}>
      {Object.keys(grouppedHosts).map((device_type: DeviceType) => {
        const devices = grouppedHosts[device_type]
        return (
          <motion.group
            key={device_type}
            whileHover={{ scale: isInGridMode ? 1 : 1.1 }}
            onClick={(e) => {
              e.stopPropagation()
              setPreviewControls(device_type)
            }}>
            {devices.map((device) => {
              return (
                <DeviceModel
                  variant={device.device_type || 'desktop'}
                  key={device.ip}
                  device={device}
                  animate={{ position: positions[device.ip] }}
                  materials={DESKTOP_MATERIALS}
                />
              )
            })}
          </motion.group>
        )
      })}
    </motion.group>
  )
}
