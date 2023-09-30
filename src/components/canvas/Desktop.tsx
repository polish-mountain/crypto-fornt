import { useSkinnedMeshClone } from '@/hooks/useSkinnedMeshClone'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion-3d'
import * as THREE from 'three'

type Props = {
  position: [number, number, number]
}

export function Desktop({ position }: Props) {
  const gltf = useSkinnedMeshClone('/models/desktop.glb')
  const ref = useRef<any>()

  useEffect(() => {
    if (ref.current) {
      ref.current.traverse((child) => {
        if (child.isMesh) {
          switch (child.material.name) {
            case 'Main_MAt':
              child.material = new THREE.MeshStandardMaterial({ color: '#7F5AF0' })
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
    <motion.group position={position} initial={{ scale: 0.5 }} whileHover={{ scale: 2 }}>
      <motion.primitive ref={ref} object={gltf.scene} scale={0.15} />
    </motion.group>
  )
}
