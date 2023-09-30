// adds device to sphere

import { BORDERS } from './global'
import { DeviceObj, Device } from './types'

export function generateDeviceOnSphere(devices: DeviceObj[]): DeviceObj[] {
  return devices.map((device) => {
    if (!device.spherePosition) {
      const radius = 0.8
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)
      let xOffset = 0
      let yOffset = 0
      if (device.device.device_type === 'phone') {
        xOffset = -BORDERS[0]
        yOffset = 0
      }
      const x = radius * Math.cos(theta) * Math.sin(phi) + xOffset
      const y = radius * Math.sin(theta) * Math.sin(phi) + yOffset
      const z = radius * Math.cos(phi)
      device = { ...device, spherePosition: [x, y, z] }
    }
    return { ...device, position: device.spherePosition }
  })
}

export function transformPositionsToGrid(devices: DeviceObj[]): DeviceObj[] {
  const step = 1
  const grid: DeviceObj[] = []
  let i = 0
  for (let device of devices) {
    const x = step * (i % 10)
    const y = step * Math.floor(i / 10)
    const z = 0
    grid.push({ position: [x - BORDERS[0], y - BORDERS[1], z], device: { ...device.device, ip: `${i}` } })
    i += 1
  }
  return grid
}
