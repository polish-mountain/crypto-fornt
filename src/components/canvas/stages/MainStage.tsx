import { useContext, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Desktop } from '../Desktop'
import useMouse from '@/hooks/useMouse'
import { useFrame } from '@react-three/fiber'
import { cameraDefault } from '@/utils/global'
import { DeviceObj } from '@/utils/types'
import { DEVICES_OBJ } from '@/mocks'
import { motion } from 'framer-motion-3d'
import { PreviewControlsAction, PreviewControlsState } from '@/contexts/previewControlls'
import { getHosts, hostUpdateHook } from '@/utils/api'
import { generateDeviceOnSphere, transformPositionsToGrid } from '@/utils/layoutFuncs'

const CAMERA_SPEED = 0.08

type Props = {
  title: string
  setLoaded: () => void
}

export default function MainStage({ title, setLoaded }: Props) {
  let { mouseX, mouseY } = useMouse()
  const [desktops, setDesktops] = useState<DeviceObj[]>([])
  const clickedDevice = useContext(PreviewControlsState)
  const setClickedDevice = useContext(PreviewControlsAction)

  const isDesktopsClicked = clickedDevice === 'desktop'

  // const [layoutFunc, setLayoutFunc] = useState<(devices: DeviceObj[]) => DeviceObj[]>(generateDeviceOnSphere)

  const layoutFunc = isDesktopsClicked ? transformPositionsToGrid : generateDeviceOnSphere

  useEffect(() => {
    setLoaded()
    getHosts().then((hosts) => {
      setDesktops([
        ...desktops,
        ...layoutFunc(
          hosts.map((h) => {
            return {
              position: [0, 0, 0],
              device: h,
            }
          }),
        ),
      ])
    })
  }, [])

  useEffect(() => {}, [isDesktopsClicked, desktops])
  hostUpdateHook((d) => {
    let didExist = false
    let newDesktops = desktops.map((desktop) => {
      if (desktop.device.ip === d.ip) {
        didExist = true
        return { ...desktop, device: d }
      }
      return desktop
    })
    if (!didExist) {
      setDesktops([
        ...desktops,
        layoutFunc([
          {
            position: [0, 0, 0],
            device: d,
          },
        ])[0],
      ])
    } else {
      setDesktops(newDesktops)
    }
  })

  useEffect(() => {
    setDesktops(layoutFunc(desktops))
  }, [isDesktopsClicked, layoutFunc, desktops])

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
        setClickedDevice('desktop')
      }}>
      {desktops.map(({ device, position }, idx) => (
        <Desktop key={idx} animate={{ position: position }} isOpened={isDesktopsClicked} />
      ))}
    </motion.group>
  )
}
