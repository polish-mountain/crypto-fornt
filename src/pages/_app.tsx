import { Suspense, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/config'
import Layout from '@/components/dom/Layout'
import '@/styles/index.css'
import { RouterLoading } from '@/components/dom/RouterLoading'
import { useRouter } from 'next/router'
import FirstLoading from '@/components/dom/FirstLoading'
import { PreviewControlsProvider } from '@/contexts/previewControlls'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)

  const setLoaded = () => setIsLoading(false)

  return (
    <>
      <Header title={pageProps.title} />
      <PreviewControlsProvider>
        <Layout ref={ref}>
          {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
           * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
           * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
          {Component?.canvas && (
            <Scene className='pointer-events-none' eventSource={ref} eventPrefix='client'>
              {Component.canvas({ ...pageProps, setLoaded })}
            </Scene>
          )}
        </Layout>
        {isLoading ? <FirstLoading /> : <Component {...pageProps} />}
      </PreviewControlsProvider>
      <RouterLoading />
    </>
  )
}
