// section for my group projects and personal projects
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Lato, Source_Code_Pro } from 'next/font/google'
import localFont from 'next/font/local'
import Link from 'next/link'
import Image from 'next/image'
import Next from './Next'
/* import '@fontsource/source-code-pro' */

const lato = Lato({ weight: '400', subsets: ['latin'] })
const lato_bold = Lato({ weight: '700', subsets: ['latin'] })
const source_code = Source_Code_Pro({ weight: '400', subsets: ['latin'] })
const soundboard = localFont({ src: '../../fonts/soundboard.otf', preload: true })

// make a map with all the projects and their hover state

const PROJECTS = {
  pasty: false,
  soundboard: false,
  portfolio: false,
}

export default function Projects() {
  const [projectsHover, setProjectsHover] = useState(PROJECTS)
  const [wasInView, setWasInView] = useState(false)

  const ref = useRef(null)
  const inView = useInView(ref)

  if (inView && !wasInView) {
    setWasInView(true)
  }

  return (
    <section id='projects' className='relative flex flex-col py-14 min-h-[100vh] px-28 '>
      <div className='flex justify-between w-full'>
        <h1 className='text-5xl text-headline'>
          Projec<span className='textGradient bg-gradient-to-t'>ts</span>
        </h1>
        <ProjectIcon />
      </div>

      <div className='flex flex-col items-center justify-between flex-1 w-full h-full gap-16'>
        <div className=''>
          <h3 className='flex-none p-4 text-2xl text-center text-gray-300 w-[70ch] leading-[3rem] word-spacing'>
            <motion.span
              animate={{ y: projectsHover.pasty ? '-15px' : '0', rotate: projectsHover.pasty ? [0, -10, 10, 0] : 0 }}
              transition={{ y: { duration: 1 }, rotate: { repeat: Infinity, duration: 1, delay: 1, repeatDelay: 2 } }}
              className={`text-pasty relative inline-block ${lato.className}`}>
              Pasty
            </motion.span>{' '}
            which is a social media platform where you can share and copy stories, then{' '}
            <motion.span
              animate={{
                y: projectsHover.soundboard ? '-15px' : '0',
                rotate: projectsHover.soundboard ? [0, -10, 10, 0] : 0,
              }}
              transition={{ y: { duration: 1 }, rotate: { repeat: Infinity, duration: 1, delay: 1, repeatDelay: 2 } }}
              className={`text-sb inline-block ${soundboard.className}`}>
              Soundboard
            </motion.span>{' '}
            which is a simple app that lets you create your own custom Android soundboard with you&apos;re favorite
            sounds. Alternatively{' '}
            <motion.span
              animate={{
                y: projectsHover.portfolio ? '-15px' : '0',
                rotate: projectsHover.portfolio ? [0, -10, 10, 0] : 0,
              }}
              transition={{ y: { duration: 1 }, rotate: { repeat: Infinity, duration: 1, delay: 1, repeatDelay: 2 } }}
              className={`textGradient bg-gradient-to-t inline-block`}>
              Pack<span className={`text-purple-primary ${source_code.className}`}>IT</span>
            </motion.span>
            , a project I&nbsp;developed with my college peers during a hackathon.
          </h3>
          <a
            href='https://github.com/jkowiesk'
            className='flex items-center justify-center mx-auto text-center underline w-fit group gap-4'>
            <p className='text-xl group-hover:underline text-contrast'>and many more on my </p>
            <GithubIcon />
          </a>
        </div>

        <div className='flex-1 w-full grid grid-cols-3 gap-16 grid-rows-[26rem]'>
          <a href='https://github.com/jkowiesk/Pasty' target='_blank' className='px-8 '>
            <motion.article
              onHoverStart={() => setProjectsHover((prev) => ({ ...prev, pasty: true }))}
              onHoverEnd={() => setProjectsHover((prev) => ({ ...prev, pasty: false }))}
              animate={{ background: projectsHover.pasty ? '#f7bf4f4c' : '#00000000' }}
              className='flex flex-col items-center w-full h-full border-4 border-b-8 border-solid shadow-2xl min-w-[23rem] border-pasty rounded-2xl'>
              <h2 className={`p-4 text-yellow-600 text-2xl flex-none w-full h-16 text-center ${lato_bold.className}`}>
                P A S T Y
              </h2>
              <span className=' flex-1 w-full overflow-hidden rounded-lg border-pasty border-y-2 grid place-items-center'>
                <motion.img
                  animate={{ scale: projectsHover.pasty ? 1.2 : 1, transition: { duration: 2 } }}
                  src='/screenShots/pasty.png'
                  className='object-cover w-full'
                  alt='pasty'
                />
              </span>
              <div className='flex-none w-full bg-pasty/30  '>
                <p className='p-4 mx-auto w-fit text-pasty'>
                  <span className='font-bold text-contrast'>Cool</span> stories{' '}
                </p>
              </div>
            </motion.article>
          </a>
          <a href='https://github.com/jkowiesk/SoundboardGenerator' target='_blank' className='px-8'>
            <motion.article
              onHoverStart={() => setProjectsHover((prev) => ({ ...prev, soundboard: true }))}
              onHoverEnd={() => setProjectsHover((prev) => ({ ...prev, soundboard: false }))}
              animate={{ background: projectsHover.soundboard ? '#dd4c354c' : '#00000000' }}
              className='flex flex-col items-center w-full h-full border-4 border-b-8 border-solid shadow-2xl min-w-[23rem] border-sb rounded-2xl'>
              <h2 className={`p-4 text-red-600 text-2xl flex-none w-full h-16 text-center ${soundboard.className}`}>
                Soundboard
              </h2>
              <span className='flex-1 w-full overflow-hidden rounded-lg border-sb border-y-2 grid place-items-center'>
                <motion.img
                  animate={{ scale: projectsHover.soundboard ? 1.2 : 1.02, transition: { duration: 2 } }}
                  src='/screenShots/soundboard.png'
                  className='object-cover w-full'
                  alt='soundboard'
                />
              </span>
              <div className='flex-none w-full bg-sb/30  '>
                <p className='p-4 mx-auto w-fit text-sb'>
                  <span className='font-bold text-contrast'>Cool</span> sounds{' '}
                </p>
              </div>
            </motion.article>
          </a>
          <a href='https://github.com/jkowiesk/pack-it' target='_blank' className='px-8'>
            <motion.article
              onHoverStart={() => setProjectsHover((prev) => ({ ...prev, portfolio: true }))}
              onHoverEnd={() => setProjectsHover((prev) => ({ ...prev, portfolio: false }))}
              animate={{ background: projectsHover.portfolio ? '#ad54b44c' : '#00000000' }}
              className='flex flex-col items-center w-full h-full border-4 border-b-8 border-solid shadow-2xl min-w-[23rem] border-purple-primary rounded-2xl'>
              <h2 className={`p-4 text-purple-secondary text-2xl flex-none w-full h-16 text-center `}>
                Pack<span className={`text-purple-primary ${source_code.className}`}>IT</span>
              </h2>
              <span className='relative flex-1 w-full h-full overflow-hidden rounded-lg border-purple-primary border-y-2 grid place-items-center'>
                <motion.img
                  animate={{ scale: projectsHover.portfolio ? 1.2 : 1, transition: { duration: 2 } }}
                  src='/screenShots/pack-it.png'
                  className='absolute object-cover w-full top-[-30px]'
                  alt='pasty'
                />
              </span>
              <div className='flex-none w-full bg-purple-primary/30 '>
                <p className='p-4 mx-auto w-fit text-purple-secondary'>
                  <span className='font-bold text-contrast'>Cool</span> packages{' '}
                </p>
              </div>
            </motion.article>
          </a>
        </div>
      </div>
      <Next goTo='#contact'>want to contact me ?</Next>
    </section>
  )
}

const ProjectIcon = () => {
  const [isHover, setIsHover] = useState(false)

  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      fill='url(#grad1)'
      className='z-50 w-16 h-16'
      viewBox='0 0 1024 1024'
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}>
      <linearGradient id='grad1' x1='0%' x2='100%' y1='0%' y2='0%'>
        <stop offset='0%' stopColor='#647DEE'></stop>
        <stop offset='100%' stopColor='#FC2977'></stop>
      </linearGradient>
      <motion.path
        animate={{ opacity: isHover ? 1 : 0 }}
        d='M312.1 591.5c3.1 3.1 8.2 3.1 11.3 0l101.8-101.8 86.1 86.2c3.1 3.1 8.2 3.1 11.3 0l226.3-226.5c3.1-3.1 3.1-8.2 0-11.3l-36.8-36.8c-3.1-3.1-8.2-3.1-11.3 0L517 485.3l-86.1-86.2c-3.1-3.1-8.2-3.1-11.3 0L275.3 543.4c-3.1 3.1-3.1 8.2 0 11.3l36.8 36.8z'></motion.path>
      <path d='M904 160H548V96c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H120c-17.7 0-32 14.3-32 32v520c0 17.7 14.3 32 32 32h356.4v32L311.6 884.1c-3.7 2.4-4.7 7.3-2.3 11l30.3 47.2v.1c2.4 3.7 7.4 4.7 11.1 2.3L512 838.9l161.3 105.8c3.7 2.4 8.7 1.4 11.1-2.3v-.1l30.3-47.2c2.4-3.7 1.3-8.6-2.3-11L548 776.3V744h356c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 512H160V232h704v440z'></path>
    </motion.svg>
  )
}

const GithubIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='url(#grad1)' className='w-6 h-6' viewBox='0 0 16 16'>
      <linearGradient id='grad1' x1='0%' x2='100%' y1='0%' y2='0%'>
        <stop offset='0%' stopColor='#7F5AF0'></stop>
        <stop offset='100%' stopColor='#647DEE'></stop>
      </linearGradient>
      <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0016 8c0-4.42-3.58-8-8-8z'></path>
    </svg>
  )
}
