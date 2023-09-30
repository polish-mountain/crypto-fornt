import { useSkinnedMeshClone } from '@/hooks/useSkinnedMeshClone'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame, useLoader } from '@react-three/fiber'
import { useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion-3d'
import * as THREE from 'three'
import { PreviewControlsStateContext } from '@/contexts/previewControlls'
import { cameraDefault } from '@/utils/global'

type Props = {
  animate: { position: [number, number, number] }
  variant: 'desktop' | 'laptop' | 'phone'
}

export function DeviceModel({ animate, variant }: Props) {
  const gltf = useSkinnedMeshClone('/models/desktop.glb')
  const [isCameraAnimating, setIsCameraAnimating] = useState(false)
  const { previewControls } = useContext(PreviewControlsStateContext)
  const isOpened = previewControls === variant
  const isPreview = previewControls === variant + 'Preview'

  const ref = useRef<any>()
  const {
    position: [x, y, z],
  } = animate

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

  useFrame(({ camera }) => {
    if (isCameraAnimating) {
      if (isPreview) {
        const targetPosition = new THREE.Vector3(x, y, z)
        camera.position.lerp(targetPosition, 0.05)
        camera.lookAt(x, y, z)

        if (camera.position.distanceTo(targetPosition) < 0.1) {
          setIsCameraAnimating(false)
        }
      } else {
        const targetPosition = new THREE.Vector3(...cameraDefault)
        camera.position.lerp(targetPosition, 0.05)
        camera.lookAt(0, 0, 0)

        if (camera.position.distanceTo(targetPosition) < 0.1) {
          setIsCameraAnimating(false)
        }
      }
    }
  })

  const handleGroupClick = () => {
    setIsCameraAnimating(true)
  }

  const variants = {
    opened: {
      scale: 0.2,
      x,
      y,
      z,
      transition: { duration: 2 },
    },
    closed: {
      scale: 0.1,
      x,
      y,
      z,
      transition: { duration: 2 },
    },
  }

  const hoverVariants = {
    scale: isOpened ? 0.3 : 0.1,
    z: isOpened ? 0.4 : animate.position[2],
  }

  return (
    <motion.group
      initial='closed'
      animate={isOpened ? 'opened' : 'closed'}
      whileHover={hoverVariants}
      variants={variants}>
      <motion.primitive ref={ref} object={gltf.scene} />
    </motion.group>
  )
}
