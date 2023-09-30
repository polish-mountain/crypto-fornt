import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Desktop } from '../Desktop'
import useMouse from '@/hooks/useMouse'
import { useFrame } from '@react-three/fiber'
import { cameraDefault } from '@/utils/global'
import { DeviceObj } from '@/utils/types'
import { DEVICES_OBJ } from '@/mocks'

const CAMERA_SPEED = 0.08

type Props = {
  title: string
  setLoaded: () => void
}

export default function MainStage({ title, setLoaded }: Props) {
  let { mouseX, mouseY } = useMouse()
  const [devices, setDevices] = useState<DeviceObj[]>([])
  const cameraCenter = useRef<{ y: number; z: number }>({ y: cameraDefault[1], z: cameraDefault[2] })

  useEffect(() => {
    setLoaded()
  }, [])

  useFrame(({ camera }) => {
    const tempX = camera.position.x
    const tempY = camera.position.y
    const [defaultX] = cameraDefault

    camera.position.x += (defaultX + -mouseX - tempX) * CAMERA_SPEED
    camera.position.y += (cameraCenter.current.y - -(mouseY * 0.9) - tempY) * CAMERA_SPEED

    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      {DEVICES_OBJ.map(({ device, position }) => (
        <Desktop key={device.ip} position={position} />
      ))}
    </>
  )
}
