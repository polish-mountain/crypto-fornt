import { useSkinnedMeshClone } from '@/hooks/useSkinnedMeshClone'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame, useLoader } from '@react-three/fiber'
import { useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion-3d'
import * as THREE from 'three'
import { PreviewControlsActionContext, PreviewControlsStateContext } from '@/contexts/previewControlls'
import { cameraDefault } from '@/utils/global'
import { Device, DeviceType, MaterialInput } from '@/utils/types'
import { applyMaterials } from '@/utils/functions'

type Props = {
  animate: { position: [number, number, number] }
  variant: DeviceType
  materials: MaterialInput[]
  device: Device
  isWarning: boolean
}

const Z_OFFSET_MAP = {
  laptop: 0.1,
  desktop: 1.0,
  phone: 0.2,
  tablet: 0.2
}
const ROTATION_MAP = {
  laptop: [0, 0, 0],
  desktop: [0, 0, 0],
  phone: [0.8, 0, 0],
  tablet: [1.6, 0, 0],
}
const MODEL_SCALES = {
  laptop: 0.18,
  desktop: 1,
  phone: 6,
  tablet: 0.2
}

export function DeviceModel({ animate, variant, materials, device, isWarning }: Props) {
  const objectGltf = useSkinnedMeshClone(`/models/${variant}.glb`)
  const [isCameraAnimating, setIsCameraAnimating] = useState(false)
  const { previewControls, preview, yScrollOffset } = useContext(PreviewControlsStateContext)
  const { setPreviewControls, setPreview } = useContext(PreviewControlsActionContext)
  const isOpened = previewControls === variant
  const { ip } = device
  const isPreview = preview?.ip === ip

  const objectRef = useRef<any>()
  const { position: [x, y, z] } = animate

  useEffect(() => { applyMaterials(objectRef, materials) }, [objectGltf])

  useFrame(({ camera }) => {
    if (isCameraAnimating) {
      if (preview) {
        camera.position.set(x, y + 0.3 + yScrollOffset, z + 1)
        camera.lookAt(x, y + 0.5 + yScrollOffset, z)
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
      setPreview(device)
      e.stopPropagation()
    }
  }

  const zOffset = Z_OFFSET_MAP[variant]

  const variants = {
    opened: {
      scale: isPreview ? 0.3 : 0.2,
      x,
      y,
      z: isPreview ? zOffset : z,
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
    z: isOpened ? zOffset : animate.position[2],
  }

  const exclamationMarkGltf = useSkinnedMeshClone("/models/exclamation_mark.glb")
  const exclamationMarkRef = useRef<any>()
  useEffect(() => applyMaterials(exclamationMarkRef, materials), [exclamationMarkGltf])

  return (
    <motion.group
      initial='closed'
      animate={isOpened ? 'opened' : 'closed'}
      whileHover={hoverVariants}
      onClick={handleGroupClick}
      variants={variants}>
      <motion.group scale={MODEL_SCALES[variant]} rotation={ROTATION_MAP[variant]}>
        <motion.primitive ref={objectRef} object={objectGltf.scene} />
      </motion.group>
      {
        !isWarning ? null : <motion.group position={[-1, 2, 0.3]} scale={[0.8, 0.8, 0.1]}>
          <motion.primitive ref={exclamationMarkRef} object={exclamationMarkGltf.scene} />
        </motion.group>
      }
    </motion.group>
  )
}
