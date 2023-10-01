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

const CAM_POS_OFFSET_MAP = {
  laptop: [0, 0.45, 1.5],
  desktop: [0, 0.3, 1],
  phone: [0, 0.3, 1],
  tablet: [0, 0, 1.2],
  router: [0, 0.3, 1.3],
}
const CAM_LOOK_AT_OFFSET_MAP = {
  laptop: [0, 0.4, 0],
  desktop: [0, 0.5, 0],
  phone: [0, 0.5, 0],
  tablet: [0, 0, 0],
  router: [0, 0.3, 0],
}
const Z_OFFSET_MAP = {
  laptop: 0.02,
  desktop: 1.0,
  phone: 0.2,
  tablet: 0.2,
  router: 0.1,
}
const ROTATION_MAP = {
  laptop: [0, 0, 0],
  desktop: [0, 0, 0],
  phone: [0.8, 0, 0],
  tablet: [1.6, 0, 0],
  router: [0, -1.6, 0],
}
const POSITION_MAP = {
  laptop: [0, 0, 0],
  desktop: [0, 0, 0],
  phone: [0, 0, 0],
  tablet: [0, 0, 0],
  router: [0, -2.9, 0],
}
const MODEL_SCALES = {
  laptop: 0.18,
  desktop: 1,
  phone: 6,
  tablet: 0.2,
  router: 1.4,
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
  const {
    position: [x, y, z],
  } = animate

  useEffect(() => {
    applyMaterials(objectRef, materials)
  }, [objectGltf])

  useFrame(({ camera }) => {
    if (isCameraAnimating) {
      if (preview) {
        const camPosOffset = CAM_POS_OFFSET_MAP[variant]
        const camPos = [x + camPosOffset[0], y + camPosOffset[1] + yScrollOffset, z + camPosOffset[2]]
        camera.position.set(...camPos)
        const camLookAtOffset = CAM_LOOK_AT_OFFSET_MAP[variant]
        const camLookAt = [x + camLookAtOffset[0], y + camLookAtOffset[1] + yScrollOffset, z + camLookAtOffset[2]]
        camera.lookAt(...camLookAt)
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

  const exclamationMarkGltf = useSkinnedMeshClone('/models/exclamation_mark.glb')
  const exclamationMarkRef = useRef<any>()
  useEffect(() => applyMaterials(exclamationMarkRef, materials), [exclamationMarkGltf])
  const [exclamationMarkRotation, setExclamationMarkRotation] = useState(0)

  useEffect(() => {
    if (device.open_services.length > 0 && device.open_services[0].title.includes('24G Switch')) {
      const int = setInterval(() => {
        setExclamationMarkRotation(exclamationMarkRotation + 0.1)
      }, 20)
      return () => {
        clearInterval(int)
      }
    }
    return () => {}
  }, [exclamationMarkRotation])

  const dSize = 1 - Math.cos(exclamationMarkRotation) * 0.2

  return (
    <motion.group
      initial='closed'
      animate={isOpened ? 'opened' : 'closed'}
      whileHover={hoverVariants}
      onClick={handleGroupClick}
      variants={variants}
    >
      <motion.group
        scale={MODEL_SCALES[variant]}
        rotation={ROTATION_MAP[variant]}
        position={POSITION_MAP[variant]}
        transition={{ duration: 0.5 }}
      >
        <motion.primitive ref={objectRef} object={objectGltf.scene} />
      </motion.group>
      {!isWarning ? null : (
        <motion.group
          position={[-1, 2, 0.3]}
          scale={[0.8 * dSize, 0.8 * dSize, 0.1 * dSize]}
          rotation={[0, exclamationMarkRotation, 0]}
        >
          <motion.primitive ref={exclamationMarkRef} object={exclamationMarkGltf.scene} />
        </motion.group>
      )}
    </motion.group>
  )
}
