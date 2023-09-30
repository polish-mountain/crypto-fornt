import { BORDERS } from './global'
import { DeviceObj } from './types'

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
