/*
  About Me component which has text animated images changing on hover
*/
import Image from 'next/image'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Suspense, useEffect, useRef, useState } from 'react'
import TypingText from './TypingText'
import { type } from 'os'
import { scrollToSection } from '@/utils/functions'

type HoveredItems = 'computer' | 'tech' | 'team' | 'challenge'

export default function AboutMe() {
  const [wasInView, setWasInView] = useState(false)
  const [hoveredName, setHoveredName] = useState<HoveredItems>('computer')

  const [backgroundDivPosition, setBackgroundDivPosition] = useState({ width: 0, y: 0 })

  const handleHoverChange = (name: HoveredItems) => {
    const parentRect = document.getElementById('Description').getBoundingClientRect()
    const descriptionElement = document.getElementById(name).getBoundingClientRect()

    const width = descriptionElement.width
    const y = descriptionElement.top - parentRect.top

    setBackgroundDivPosition({
      width,
      y,
    })
    setHoveredName(name)
  }

  const ref = useRef(null)
  const inView = useInView(ref)

  if (inView && !wasInView) {
    setWasInView(true)
  }

  return (
    <section id='about-me' className='flex flex-col py-14 h-[100vh] px-28'>
      <div className='flex justify-between w-full'>
        <h1 className='text-5xl text-headline'>
          About <span className='textGradient bg-gradient-to-t'>me</span>
        </h1>
        <motion.span
          whileHover={{ rotate: [0, -20, 20, 0] }}
          onAnimationComplete={(e) => {
            rotate: 0
          }}
          transition={{ duration: 1 }}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            stroke='url(#grad1)'
            strokeWidth='1.5'
            className='w-12 h-12'
            viewBox='0 0 24 24'>
            <linearGradient id='grad1' x1='0%' x2='100%' y1='0%' y2='0%'>
              <stop offset='0%' stopColor='#647DEE'></stop>
              <stop offset='100%' stopColor='#FC2977'></stop>
            </linearGradient>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'></path>
          </svg>
        </motion.span>
      </div>

      <div className='flex justify-between h-full mx-16'>
        <div id='Description' className='relative flex flex-col mt-16 text-3xl text-gray-300 gap-8 h-fit'>
          <motion.div
            className='absolute w-full h-16 rounded-xl gradient bg-gradient-to-r'
            animate={{
              y: backgroundDivPosition.y,
              width: backgroundDivPosition.width,
              transition: { duration: 0.3, type: 'spring', stiffness: 100 },
            }}></motion.div>
          <a
            onMouseEnter={() => {
              handleHoverChange('computer')
            }}
            id='computer'
            onClick={() => {
              scrollToSection('#education')
            }}
            className='relative px-2 cursor-pointer w-fit'>
            <span className='text-5xl text-contrast'>I</span>{' '}
            {wasInView && <TypingText>am a computer science student</TypingText>}
          </a>
          <a
            onMouseEnter={() => {
              handleHoverChange('tech')
            }}
            id='tech'
            onClick={() => {
              scrollToSection('#skills')
            }}
            className='relative px-2 cursor-pointer w-fit'>
            <span className='text-5xl text-contrast'>I</span>{' '}
            {wasInView && <TypingText>love exploring cutting-edge tech!</TypingText>}
          </a>
          <a
            onMouseEnter={() => {
              handleHoverChange('team')
            }}
            onClick={() => {
              scrollToSection('#projects')
            }}
            className='relative px-2 cursor-pointer w-fit'
            id='team'>
            <span className='text-5xl text-contrast'>I</span>{' '}
            {wasInView && <TypingText>honed my skills through many projects</TypingText>}
          </a>
          <a
            onMouseEnter={() => {
              handleHoverChange('challenge')
            }}
            id='challenge'
            onClick={() => {
              scrollToSection('#contact')
            }}
            className='relative px-2 cursor-pointer w-fit'>
            <span className='text-5xl text-contrast'>I</span>{' '}
            {wasInView && <TypingText>am fully prepared and equipped to take on any challenge</TypingText>}
          </a>
        </div>

        <div ref={ref} className='relative flex-1 h-full grid place-items-center'>
          <AnimatePresence>
            <motion.img
              className='absolute top-0 bottom-0 left-0 right-0 m-auto w-[400px] h-[400px]'
              key={`/img/${hoveredName}.png`}
              src={`/img/${hoveredName}.png`}
              alt='Image'
              initial={{ opacity: 0 }}
              animate={{ x: 30, opacity: 1 }}
              exit={{ x: -30, opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
