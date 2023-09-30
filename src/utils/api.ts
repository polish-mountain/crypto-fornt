import { useEffect } from 'react'
import useWebSocket from 'react-use-websocket'
import { Device } from './types'

const ROOT_URL = 'https://cyber-api.alu.dog'

export async function getHosts(): Promise<Device[]> {
  const response = await fetch(ROOT_URL + '/api/hosts')
  const hosts: Device[] = await response.json()
  return hosts
}

export function hostUpdateHook() {
  let socketUrl = ROOT_URL.replace('https://', 'wss://').replace('http://', 'ws://')
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl + '/api/ws')
  if (lastMessage) {
    const device: Device = JSON.parse(lastMessage.data)
    return device
  }

  return null
}
