import { PreviewControlsActionContext, PreviewControlsStateContext } from '@/contexts/previewControlls'
import useMouse from '@/hooks/useMouse'
import { cameraDefault } from '@/utils/global'
import { Device, DeviceObj, DeviceType } from '@/utils/types'
import { useFrame, useLoader } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { DeviceModel } from '../DeviceModel'

import { getHosts, hostUpdateHook } from '@/utils/api'
import { CENTER_MAP, LayoutFuncsProps, generateDeviceOnSphere, transformPositionsToGrid } from '@/utils/layoutFuncs'
import { Text, useScroll } from '@react-three/drei'
import { groupBy } from '@/utils/functions'
import { AnimatePresence } from 'framer-motion'

const DESKTOP_MATERIALS = [
  {
    name: 'Main_MAt',
    material: new THREE.MeshNormalMaterial({ color: '#7F5AF0' }),
  },
  {
    name: 'Display',
    material: new THREE.MeshBasicMaterial({ color: '#86efac' }),
  },
  {
    name: 'Material',
    material: new THREE.MeshBasicMaterial({ color: '#ff0000' }),
  },
  {
    name: 'image-screen',
    material: new THREE.MeshBasicMaterial({ color: '#000000' }),
  },
  // {
  //   name: 'Router',
  //   material: new THREE.MeshBasicMaterial({ color: '#44444' }),
  // }
]

const CAMERA_SPEED = 0.08

type Props = {
  title: string
  setLoaded: () => void
}

export default function MainStage({ title, setLoaded }: Props) {
  let { mouseX, mouseY } = useMouse()

  const [hosts, setHosts] = useState<Device[]>([])
  const { previewControls, preview, yScrollOffset } = useContext(PreviewControlsStateContext)
  const { setPreviewControls, setYScrollOffset } = useContext(PreviewControlsActionContext)
  const isInGridMode = previewControls !== null

  const layoutFunc = isInGridMode ? transformPositionsToGrid : generateDeviceOnSphere
  const layoutFuncProps: LayoutFuncsProps = { deviceType: previewControls }

  
  const [gridTexture] = useLoader(THREE.TextureLoader, ['/img/grid_texture.png'])
  
  // scroll
  useEffect(() => {
    function scrollListener(ev: WheelEvent) {
      if (isInGridMode && preview == null) setYScrollOffset(yScrollOffset + ev.deltaY * 0.004)
    }
    document.body.addEventListener('wheel', scrollListener)
    return () => document.body.removeEventListener('wheel', scrollListener)
  }, [yScrollOffset, isInGridMode])

  // reset scroll when grid mode is toggled
  useEffect(() => {
    setYScrollOffset(0)
  }, [isInGridMode])

  useEffect(() => {
    setLoaded()
    getHosts().then((newHosts) => {
      setHosts([...hosts, ...newHosts])
    })
  }, [])

  const d = hostUpdateHook()
  useEffect(() => {
    if (!d) return
    let didExist = false
    let newDesktops = hosts.map((desktop) => {
      if (desktop.ip === d.ip) {
        didExist = true
        return { ...desktop, device: d }
      }
      return desktop
    })
    if (!didExist) {
      setHosts([...hosts, d])
    } else {
      setHosts(newDesktops)
    }
  }, [d])

  const positions = useMemo(
    () => Object.fromEntries(layoutFunc(hosts, layoutFuncProps).map((position, i) => [hosts[i].ip, position])),
    [hosts, layoutFunc],
  )

  const cameraCenter = useRef<{ y: number; z: number }>({ y: cameraDefault[1], z: cameraDefault[2] })

  useFrame(({ camera }) => {
    const tempX = camera.position.x
    const tempY = camera.position.y
    const [defaultX] = cameraDefault

    camera.position.x += (defaultX + -mouseX * 0.4 - tempX) * CAMERA_SPEED
    camera.position.y += (cameraCenter.current.y - -(mouseY * 0.45) - tempY) * CAMERA_SPEED

    camera.lookAt(0, 0, 0)
  })

  const grouppedHosts = groupBy(hosts, (host) => host.device_type)
  return (
    <motion.group animate={{ y: yScrollOffset }} transition={{ duration: 0.5 }}>
      {Object.keys(grouppedHosts).map((device_type: DeviceType) => {
        const devices = grouppedHosts[device_type]
        const center = CENTER_MAP[device_type]
        const warnings = devices.filter((device) => (device.open_services || []).length > 0).length
        return (<>
          {!isInGridMode && <Text
              scale={0.7}
              position={[center[0], center[1] + 1.7, 0]}
              color="white" // default
              anchorX="center" // default
              anchorY="middle" // default
              lookAt={undefined} material={undefined} clear={undefined} geometry={undefined} raycast={undefined} add={undefined} copy={undefined} visible={undefined} id={undefined} name={undefined} type={undefined} translateX={undefined} translateY={undefined} translateZ={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined} clone={undefined} uuid={undefined} parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined} matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined} castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined} renderOrder={undefined} animations={undefined} userData={undefined} customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined} onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined} applyQuaternion={undefined} setRotationFromAxisAngle={undefined} setRotationFromEuler={undefined} setRotationFromMatrix={undefined} setRotationFromQuaternion={undefined} rotateOnAxis={undefined} rotateOnWorldAxis={undefined} translateOnAxis={undefined} localToWorld={undefined} worldToLocal={undefined} remove={undefined} removeFromParent={undefined} getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined} getObjectsByProperty={undefined} getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined} getWorldDirection={undefined} traverse={undefined} traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined} updateMatrixWorld={undefined} updateWorldMatrix={undefined} toJSON={undefined} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} morphTargetInfluences={undefined} morphTargetDictionary={undefined} isMesh={undefined} updateMorphTargets={undefined} getVertexPosition={undefined}          >
              {devices.length} {warnings > 0 ? `(!${warnings})` : ""}
            </Text>}
          <motion.group
            key={device_type}
            whileHover={{ scale: isInGridMode ? 1 : 1.1 }}
            onClick={(e) => {
              e.stopPropagation()
              setPreviewControls(device_type)
            }}>
            {devices.map((device) => {
              return (
                <DeviceModel
                  variant={device.device_type || 'desktop'}
                  key={device.ip}
                  device={device}
                  animate={{ position: positions[device.ip] }}
                  materials={DESKTOP_MATERIALS}
                  isWarning={(device.open_services || []).length > 0}
                />
              )
            })}
          </motion.group>
        </>
        )
      })}
       <mesh scale={[150, 150, 3]} rotation={[Math.PI*0.75, Math.PI, 0]} position={[0, -4, 0]} >
        <planeGeometry  />
        
        <meshBasicMaterial attach="material" map={gridTexture}  transparent  />
        
      </mesh>
    </motion.group>
  )
}
