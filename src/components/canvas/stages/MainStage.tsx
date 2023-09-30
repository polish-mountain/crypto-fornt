import { useContext, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Desktop } from '../Desktop'
import useMouse from '@/hooks/useMouse'
import { useFrame } from '@react-three/fiber'
import { cameraDefault } from '@/utils/global'
import { DeviceObj } from '@/utils/types'
import { DEVICES_OBJ } from '@/mocks'
import { generateDeviceOnSphere } from '@/utils/addDevice'
import { motion } from 'framer-motion-3d'
import { transformPositionsToGrid } from '@/utils/transformPositionsToGrid'
import { PreviewControlsAction, PreviewControlsState } from '@/contexts/previewControlls'

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
  console.log(isDesktopsClicked)

  useEffect(() => {
    setLoaded()
  }, [])

  useEffect(() => {
    if (!isDesktopsClicked) {
      setDesktops(generateDeviceOnSphere(new Array(50).fill(DEVICES_OBJ[0].device)))
    } else {
      setDesktops((prev) => transformPositionsToGrid(prev))
    }
  }, [isDesktopsClicked])

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
