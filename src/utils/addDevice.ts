// adds device to sphere

import { DeviceObj, Device } from './types'

export function generateDeviceOnSphere(devices: Device[]): DeviceObj[] {
  let newDevices: DeviceObj[] = []
  let i = 0
  for (let device of devices) {
    const radius = 0.8
    const theta = Math.random() * 2 * Math.PI
    const phi = Math.acos(2 * Math.random() - 1)
    const x = radius * Math.cos(theta) * Math.sin(phi)
    const y = radius * Math.sin(theta) * Math.sin(phi)
    const z = radius * Math.cos(phi)
    newDevices.push({ position: [x, y, z], device: { ...device, ip: `${i}` } })
    i += 1
  }
  return newDevices
}
