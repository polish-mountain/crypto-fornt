export type DeviceType = 'laptop' | 'desktop' | 'phone' | 'tablet'

export type Device = {
  ip: string
  host?: string
  open_services?: Service[]
  device_name: string
  device_type: DeviceType
  screenshots: string[]
}

export type Service = {
  port: number
  proto: string
  title?: string
}

export type DeviceObj = {
  device: Device
  position: [number, number, number]
  spherePosition?: [number, number, number]
}

export type MaterialInput = {
  name: string
  material: THREE.Material
}
