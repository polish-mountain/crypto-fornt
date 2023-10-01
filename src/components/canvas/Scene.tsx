import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import * as THREE from 'three'
import { cameraDefault } from '@/utils/global'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { LayoutCamera } from 'framer-motion-3d'

// add drei axis

export default function Scene({ children, ...props }) {
  return (
    <Canvas camera={{ fov: 100, near: 0.1, far: 1000, position: cameraDefault }} {...props}>
      <color args={['#111827']} attach='background' />
      {/*
      @ts-ignore */}
      <directionalLight intensity={0.1} position={[0, 1, 0]} />
      {/*
      @ts-ignore */}
      <ambientLight intensity={0.3} />
      {children}
      {/*
      add drei axis helper */}
      <Preload all />
    </Canvas>
  )
}
