import { useSkinnedMeshClone } from '@/hooks/useSkinnedMeshClone'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame, useLoader } from '@react-three/fiber'
import { useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion-3d'
import * as THREE from 'three'
import { PreviewControlsActionContext, PreviewControlsStateContext } from '@/contexts/previewControlls'
import { cameraDefault } from '@/utils/global'
import { MaterialInput } from '@/utils/types'

type Props = {
  animate: { position: [number, number, number] }
  variant: 'desktop' | 'laptop' | 'phone'
  materials: MaterialInput[]
}

export function DeviceModel({ animate, variant, materials }: Props) {
  const gltf = useSkinnedMeshClone(`/models/${variant}.glb`)
  const [isCameraAnimating, setIsCameraAnimating] = useState(false)
  const { previewControls, isPreview } = useContext(PreviewControlsStateContext)
  const { setPreviewControls, setIsPreview } = useContext(PreviewControlsActionContext)
  const isOpened = previewControls === variant

  const ref = useRef<any>()
  const {
    position: [x, y, z],
  } = animate

  useEffect(() => {
    if (ref.current) {
      ref.current.traverse((child) => {
        if (child.isMesh) {
          const material = materials.find(({ name }) => name === child.material.name)
          if (material) {
            child.material = material.material
          }
        }
      })
    }
  }, [gltf])

  useFrame(({ camera }) => {
    if (isCameraAnimating) {
      if (isPreview) {
        const targetPosition = new THREE.Vector3(x, y, z + 1)
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

  const handleGroupClick = (e) => {
    if (previewControls === variant) {
      setIsCameraAnimating(true)
      setIsPreview(true)
      e.stopPropagation()
    }
  }

  const variants = {
    opened: {
      scale: isPreview ? 0.3 : 0.2,
      x,
      y,
      z: isPreview ? 0.4 : z,
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
      variants={variants}
      onClick={handleGroupClick}>
      <motion.primitive ref={ref} object={gltf.scene} />
    </motion.group>
  )
}
