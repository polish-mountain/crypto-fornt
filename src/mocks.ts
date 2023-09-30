import { BORDERS } from './utils/global'
import { DeviceObj } from './utils/types'

export const DEVICES_OBJ: DeviceObj[] = [
  {
    device: {
      ip: '10.250.192.197',
      host: '',
      open_services: [
        {
          port: 80,
          proto: 'tcp',
          title: '',
        },
      ],
      device_name: '3.27.0.112-DESKTOP-4CVEEMF.fc1866fa-3d1e-4e47-9198-a1a41031a8f4',
      device_type: 'desktop',
    },
    position: [0, 0, 0],
  },
  {
    device: {
      ip: '10.250.163.146',
      host: '',
      open_services: [],
      device_name: 'iPhone13_kefa',
      device_type: 'phone',
    },
    position: [0, BORDERS[1], 0],
  },
  {
    device: {
      ip: 'fe80::ff6b:96c7:1f2c:40f0',
      host: '',
      open_services: [],
      device_name: 'MATEUSZ-ARCH-LAPTOP',
      device_type: 'laptop',
    },
    position: [BORDERS[0], 0, 0],
  },
  {
    device: {
      ip: '10.250.192.192',
      host: '',
      open_services: [
        {
          port: 80,
          proto: 'tcp',
          title: '',
        },
      ],
      device_name: '3.27.0.112-DESKTOP-4CVEEMF.fc1866fa-3d1e-4e47-9198-a1a41031a8f4',
      device_type: 'desktop',
    },
    position: [-BORDERS[0], 0, 0],
  },
  {
    device: {
      ip: '10.250.192.190',
      host: '',
      open_services: [
        {
          port: 80,
          proto: 'tcp',
          title: '',
        },
      ],
      device_name: '3.27.0.112-DESKTOP-4CVEEMF.fc1866fa-3d1e-4e47-9198-a1a41031a8f4',
      device_type: 'desktop',
    },
    position: [0, -BORDERS[1], 0],
  },
]
