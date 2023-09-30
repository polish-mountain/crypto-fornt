// https://github.com/studio-freight/lenis
// yarn add @studio-freight/lenis
// 1 - wrap <Component {...pageProps} /> with <Scroll /> in _app.jsx
// 2 - add <ScrollTicker /> wherever in the canvas
// 3 - enjoy
import { cameraDefault, portalPosition, portalRadius } from '@/utils/global'
import { addEffect, useFrame } from '@react-three/fiber'
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'
import { useRef } from 'react'
import * as THREE from 'three'

export const state = {
  top: 0,
  progress: 0,
}

const { damp } = THREE.MathUtils

export default function Scroll({ children }) {
  const content = useRef(null)
  const wrapper = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      wrapper: wrapper.current,
      content: content.current,
      duration: 14,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'both',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenis.on('scroll', ({ scroll, progress }) => {
      state.top = scroll
      state.progress = progress
    })
    const effectSub = addEffect((time) => lenis.raf(time))
    return () => {
      effectSub()
      lenis.destroy()
    }
  }, [])

  return (
    <div
      ref={wrapper}
      style={{
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        top: 0,
      }}>
      <div
        ref={content}
        style={{
          position: 'relative',
          minHeight: '200vh',
        }}>
        {children}
      </div>
    </div>
  )
}

export const ScrollTicker = ({ cameraCenter, smooth = 2 }) => {
  const divide = 0.8
  useFrame(({ viewport, camera }, delta) => {
    let progress
    if (state.progress < divide) {
      progress = (1 / 0.8) * state.progress
      let distanceCamToPortal = portalPosition[2] - cameraDefault[2] - portalRadius + 1
      let roadY = Math.sin((Math.PI / 2) * progress) * 3
      let changePositionY = damp(camera.position.y, roadY, smooth, delta)

      cameraCenter.current.y = cameraDefault[1] + changePositionY
      camera.position.y = changePositionY

      let changePositionZ = damp(camera.position.z, progress * distanceCamToPortal + cameraDefault[2], smooth, delta)
      camera.position.z = changePositionZ
    } else {
      progress = state.progress - 1 / (1 - divide)
      let roadY = progress * 0.01
      let changePositionY = damp(camera.position.y, roadY, smooth, delta)

      cameraCenter.current.y = cameraDefault[1] + changePositionY
      camera.position.y = changePositionY
    }
  })

  return null
}
