import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'
import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import { useGraph } from '@react-three/fiber'

export function useSkinnedMeshClone(path) {
  // @ts-ignore
  const { scene, materials, animations } = useGLTF(path)
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clonedScene)

  return { scene: clonedScene, materials, animations, nodes }
}
