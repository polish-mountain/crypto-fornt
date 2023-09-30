import { useSkinnedMeshClone } from '@/hooks/useSkinnedMeshClone'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion-3d'
import * as THREE from 'three'
import { Duplex } from 'stream'

type Props = {
  animate: { position: [number, number, number] }
  isOpened: boolean
  onClick?: () => void
}
export function Desktop({ isOpened, animate }: Props) {
  const gltf = useSkinnedMeshClone('/models/desktop.glb')
  const ref = useRef<any>()

  useEffect(() => {
    if (ref.current) {
      ref.current.traverse((child) => {
        if (child.isMesh) {
          switch (child.material.name) {
            case 'Main_MAt':
              child.material = new THREE.MeshNormalMaterial({ color: '#7F5AF0' })
              break

            case 'Display':
              child.material = new THREE.MeshBasicMaterial({ color: '#86efac' })
              break
          }
        }
      })
    }
  }, [gltf])

  return (
    <motion.group
      animate={{
        x: animate.position[0],
        y: animate.position[1],
        z: animate.position[2],
        scale: isOpened ? 0.2 : 0.1,
        transition: { duration: 2 },
      }}
      initial={{ scale: isOpened ? 0.2 : 0.1 }}
      whileHover={{ scale: isOpened ? 0.4 : 0.1 }}>
      <motion.primitive ref={ref} object={gltf.scene} />
    </motion.group>
  )
}
