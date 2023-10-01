import { useEffect } from 'react'
import useWebSocket from 'react-use-websocket'
import { Device } from './types'

const ROOT_URL = 'https://cyber-api.alu.dog'

export async function getHosts(): Promise<Device[]> {
  const response = await fetch(ROOT_URL + '/api/hosts')
  const objs = await response.json()
  return objs.map(host => {
    if (host.device_type == '')
      host.device_type = 'router'
    host.device_type
    return host
  })
}

export function hostUpdateHook(): Device | null {
  let socketUrl = ROOT_URL.replace('https://', 'wss://').replace('http://', 'ws://')
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl + '/api/ws')
  if (lastMessage) {
    let obj = JSON.parse(lastMessage.data)
    if (obj.device_type == '')
      obj.device_type = 'router'
    return obj
  }

  return null
}
