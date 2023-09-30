export type Device = {
  ip: string
  host?: string
  open_services?: Service[]
  device_name: string
  device_type?: 'laptop' | 'desktop' | 'phone'
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
