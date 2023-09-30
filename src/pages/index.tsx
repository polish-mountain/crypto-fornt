import { Michroma } from 'next/font/google'
import Scroll from '@/templates/Scroll'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

const Stage = dynamic(() => import('@/components/canvas/stages/MainStage'), { ssr: false })

const michroma = Michroma({ subsets: ['latin'], weight: '400' })

export default function Page(props) {
  const [isShowing, setIsShowing] = useState(true)

  useEffect(() => {
    const close = setTimeout(() => {
      setIsShowing(false)
    }, 6000)

    return () => clearTimeout(close)
  }, [])

  return <></>
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <Stage {...props} />

export async function getStaticProps() {
  return { props: { title: 'Home' } }
}
