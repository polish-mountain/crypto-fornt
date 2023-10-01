// adds device to sphere

import { BORDERS } from './global'
import { Device, DeviceObj, DeviceType } from './types'

const DUPA_POINT: [number, number, number] = [-10, -10, 0]
const Z_MAP = {
  laptop: -0.4,
  desktop: 0.8,
  phone: 0.4,
  tablet: 0
}
const STEP_MAP = {
  laptop: 1.2,
  desktop: 1,
  phone: 0.8,
  tablet: 1
}

export type LayoutFuncsProps = {
  deviceType: DeviceType
}

export function generateDeviceOnSphere(devices: Device[]): [number, number, number][] {
  return devices.map((device) => {
    const MAX_I32 = 1 << (32 - 1)
    // Create cyrb128 state:
    var seed = cyrb128(device.ip)
    // Four 32-bit component hashes provide the seed for sfc32.
    // var rand = sfc32(seed[0], seed[1], seed[2], seed[3])

    // Only one 32-bit component hash is needed for mulberry32.
    var rand = mulberry32(seed[0])

    // Obtain sequential random numbers like so:
    const rand1 = rand()
    const rand2 = rand()

    const radius = 0.8
    const theta = rand1 * 2 * Math.PI
    const phi = Math.acos(2 * rand2 - 1)
    let xOffset = 0
    let yOffset = 0
    if (['phone', 'tablet'].includes(device.device_type)) {
      xOffset = -BORDERS[0]
      yOffset = 0
    }
    if (device.device_type === 'laptop') {
      xOffset = +BORDERS[0]
      yOffset = 0
    }
    const x = radius * Math.cos(theta) * Math.sin(phi) + xOffset
    const y = radius * Math.sin(theta) * Math.sin(phi) + yOffset
    const z = radius * Math.cos(phi)
    return [x, y, z]
  })
}

function cyrb128(str) {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i)
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067)
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233)
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213)
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179)
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067)
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233)
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213)
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179)
    ; (h1 ^= h2 ^ h3 ^ h4), (h2 ^= h1), (h3 ^= h1), (h4 ^= h1)
  return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0]
}
function sfc32(a, b, c, d) {
  return function () {
    a >>>= 0
    b >>>= 0
    c >>>= 0
    d >>>= 0
    var t = (a + b) | 0
    a = b ^ (b >>> 9)
    b = (c + (c << 3)) | 0
    c = (c << 21) | (c >>> 11)
    d = (d + 1) | 0
    t = (t + d) | 0
    c = (c + t) | 0
    return (t >>> 0) / 4294967296
  }
}
function mulberry32(a) {
  return function () {
    var t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
export function transformPositionsToGrid(devices: Device[], { deviceType }: LayoutFuncsProps): [number, number, number][] {
  let i = 0
  console.log(devices)
  return devices.map((device) => {
    if (device.device_type === deviceType) {
      const step = STEP_MAP[deviceType]
      const x = step * (i % 10)
      const y = step * Math.floor(i / 10)
      const stepCenter = (10 * step - 10) / 2
      i++
      return [x - BORDERS[0] - stepCenter, y - BORDERS[1], Z_MAP[deviceType]]
    } else {
      return [...DUPA_POINT]
    }
  })
}
