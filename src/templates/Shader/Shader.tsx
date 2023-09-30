// @ts-nocheck
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

const textureLoader = new THREE.TextureLoader()
const squareTexture = textureLoader.load('/square2.png')

squareTexture.wrapS = THREE.RepeatWrapping
squareTexture.wrapT = THREE.RepeatWrapping

const FloorShader = shaderMaterial(
  {
    time: 1,
    color: new THREE.Color(0.05, 0.0, 1),
    uTexture: squareTexture,
    uRepeat: 32,
  },
  vertex,
  fragment,
)

FloorShader.key = THREE.MathUtils.generateUUID

extend({ FloorShader })
// eslint-disable-next-line react/display-name
const Shader = forwardRef(({ children, ...props }, ref) => {
  const localRef = useRef()

  useImperativeHandle(ref, () => localRef.current)

  useFrame((_, delta) => (localRef.current.time += delta))

  return <floorShader ref={localRef} glsl={THREE.GLSL3} key={FloorShader.key} {...props} attach='material' />
})

export default Shader
