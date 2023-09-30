import React from 'react'
import { Device } from './types'

const ROOT_URL = 'https://cyber-api.alu.dog'

export async function getHosts(): Promise<Device[]> {
  const response = await fetch(ROOT_URL + '/api/hosts')
  const hosts: Device[] = await response.json()
  return hosts
}

export function hostUpdateHook(callback: (d: Device) => void) {
  const [ws, setWs] = React.useState<WebSocket | null>(null)
  React.useEffect(() => {
    let wsHost = ROOT_URL.replace('https://', 'wss://').replace('http://', 'ws://')
    const ws = new WebSocket(wsHost + '/api/ws')
    setWs(ws)
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      callback(data)
    }
    return () => {
      ws.close()
    }
  }, [])
}
