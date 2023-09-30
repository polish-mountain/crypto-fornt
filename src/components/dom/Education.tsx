// make compopnent about my education
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import EducationSvg from '../../../public/img/education.svg'
import Next from './Next'

export default function Education() {
  const [wasInView, setWasInView] = useState(false)

  const [onTree, setOnTree] = useState(false)
  const [onAi, setOnAI] = useState(false)
  const [onSystems, setOnSystems] = useState(false)

  const ref = useRef(null)
  const inView = useInView(ref)

  if (inView && !wasInView) {
    setWasInView(true)
  }

  const variantRight = {
    hidden: { opacity: 0, x: 0, y: 0, rotateZ: 4 },
    visible: { opacity: 1, x: 30, y: -50, rotateZ: 12 },
  }

  const variantLeft = {
    hidden: { opacity: 0, x: 0, y: 0, rotateZ: -4 },
    visible: { opacity: 1, x: -30, y: -50, rotateZ: -12 },
  }

  const variantBottom = {
    hidden: { opacity: 0, x: 0, y: 0, rotateZ: 4 },
    visible: { opacity: 1, x: 30, y: 50, rotateZ: 12 },
  }

  return (
    <section id='education' className='relative flex flex-col py-14 h-[100vh] px-28'>
      <Image
        priority
        src='/img/pigeon.gif'
        alt='Pigeon'
        className='absolute left-16 bottom-[29rem]'
        width={90}
        height={90}
      />
      <Image
        src='/img/education.png'
        className='absolute bottom-0 left-0 '
        alt='Education'
        ref={ref}
        width={600}
        height={600}
        loading='eager'
        priority
      />

      <div className='flex justify-between w-full'>
        <h1 className='text-5xl text-headline'>
          Educati<span className='textGradient bg-gradient-to-t'>on</span>
        </h1>
        <motion.span whileHover={{ x: [0, -10, 10, 0] }} transition={{ duration: 1 }}>
          <Hat />
        </motion.span>
      </div>

      <div className='flex justify-between h-full'>
        <div className='flex-1 px-16 py-8'></div>
        <div className='flex flex-col flex-none py-8 pb-32 w-[45rem] gap-16'>
          <h2 className='text-5xl text-contrast'>Warsaw University of Technology</h2>
          <div className='flex gap-32'>
            <p className='text-xl min-content flex-grow-1 text-paragraph'>Computer Science, BE</p>
            <div className='relative flex-1 w-full flex-grow-4'>
              {wasInView && <AnimatedSVG />}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='absolute left-[6%] top-[-100%] text-purple-primary'>
                2020
              </motion.p>
              {!!wasInView && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 1, delay: 3.5 } }}
                  className='absolute right-[6%] top-[-100%] text-purple-secondary'>
                  now
                </motion.p>
              )}
            </div>
          </div>
          <article className=' flex-1'>
            <h2 className='text-lg text-headline'>
              I have completed a diverse range of university courses, including topics such as :
            </h2>
            <ul className='flex flex-col items-center justify-around w-full h-full py-12'>
              <li
                className='relative group w-fit'
                onMouseEnter={() => setOnTree(true)}
                onMouseLeave={() => setOnTree(false)}>
                <motion.span
                  variants={variantRight}
                  animate={onTree ? 'visible' : 'hidden'}
                  transition={{ x: { duration: 1 }, y: { duration: 1 }, opacity: { duration: 0.5 } }}
                  className='absolute top-0 right-0 group-hover'>
                  <TreeIcon />
                </motion.span>
                <p className='relative p-2 text-xl font-bold text-purple-primary rounded-xl group-hover:text-headline group-hover:bg-purple-primary'>
                  Algorithms and Data Structures
                </p>
              </li>
              <li
                className='relative group w-fit'
                onMouseEnter={() => setOnTree(true)}
                onMouseLeave={() => setOnTree(false)}>
                <motion.span
                  variants={variantLeft}
                  animate={onTree ? 'visible' : 'hidden'}
                  transition={{ x: { duration: 1 }, y: { duration: 1 }, opacity: { duration: 0.5 } }}
                  className='absolute top-0 left-0 group-hover'>
                  <RobotIcon />
                </motion.span>
                <p className='relative p-2 text-xl font-bold text-purple-secondary rounded-xl group-hover:text-headline group-hover:bg-purple-secondary'>
                  Artificial Intelligence
                </p>
              </li>
              <li
                className='relative group w-fit'
                onMouseEnter={() => setOnTree(true)}
                onMouseLeave={() => setOnTree(false)}>
                <motion.span
                  variants={variantBottom}
                  animate={onTree ? 'visible' : 'hidden'}
                  transition={{ x: { duration: 1 }, y: { duration: 1 }, opacity: { duration: 0.5 } }}
                  className='absolute bottom-0 right-0 group-hover'>
                  <LinuxIcon />
                </motion.span>
                <p className='relative p-2 text-xl font-bold text-flashy-primary rounded-xl group-hover:text-headline group-hover:bg-flashy-primary'>
                  Operating Systems
                </p>
              </li>
              {/* <li className='p-2 text-xl hover:rounded-xl text-purple-secondary w-fit'>Artificial Intelligence</li>
              <li className='p-2 text-xl hover:rounded-xl text-flashy-primary text- w-fit'>Operating Systems </li> */}
            </ul>
          </article>
        </div>
      </div>
      <h3 className='absolute text-2xl right-[5%] text-paragraph bottom-[10%]'>
        Always have been eager to learn, especially about computers
      </h3>
      <Next goTo='#skills'>what can I do ?</Next>
    </section>
  )
}

const TreeIcon = () => {
  return (
    <svg
      fill='currentColor'
      stroke='currentColor'
      strokeWidth='1'
      className='w-12 h-12 text-purple-primary'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'>
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M6 20a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z'></path>
      <path d='M16 4a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z'></path>
      <path d='M16 20a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z'></path>
      <path d='M11 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z'></path>
      <path d='M21 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z'></path>
      <path d='M5.058 18.306l2.88 -4.606'></path>
      <path d='M10.061 10.303l2.877 -4.604'></path>
      <path d='M10.065 13.705l2.876 4.6'></path>
      <path d='M15.063 5.7l2.881 4.61'></path>
    </svg>
  )
}

const RobotIcon = () => {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      stroke-width='0'
      viewBox='0 0 640 512'
      className='w-12 h-12 text-purple-secondary'
      xmlns='http://www.w3.org/2000/svg'>
      <path d='M32,224H64V416H32A31.96166,31.96166,0,0,1,0,384V256A31.96166,31.96166,0,0,1,32,224Zm512-48V448a64.06328,64.06328,0,0,1-64,64H160a64.06328,64.06328,0,0,1-64-64V176a79.974,79.974,0,0,1,80-80H288V32a32,32,0,0,1,64,0V96H464A79.974,79.974,0,0,1,544,176ZM264,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,264,256Zm-8,128H192v32h64Zm96,0H288v32h64ZM456,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,456,256Zm-8,128H384v32h64ZM640,256V384a31.96166,31.96166,0,0,1-32,32H576V224h32A31.96166,31.96166,0,0,1,640,256Z'></path>
    </svg>
  )
}

const LinuxIcon = () => {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      stroke-width='0'
      viewBox='0 0 24 24'
      className='w-12 h-12 text-flashy-primary'
      xmlns='http://www.w3.org/2000/svg'>
      <path d='M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z'></path>
    </svg>
  )
}

const Hat = () => (
  <svg fill='none' stroke='url(#grad1)' strokeWidth='1.5' className='w-16 h-16' viewBox='0 0 24 24'>
    <linearGradient id='grad1' x1='0%' x2='100%' y1='0%' y2='0%'>
      <stop offset='0%' stopColor='#647DEE'></stop>
      <stop offset='100%' stopColor='#FC2977'></stop>
    </linearGradient>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5'
    />
  </svg>
)

const AnimatedSVG = () => {
  const rectVariants = {
    initial: {
      width: '0%',
    },
    animate: {
      width: '80%',
      transition: {
        duration: 2,
        delay: 1,
        type: 'linear',
        // Add a delay to the rect animation to make it start after the SVG moves into view
      },
    },
  }

  return (
    <motion.svg className='absolute inset-0 w-full h-full'>
      <motion.rect
        variants={rectVariants}
        initial='initial'
        animate='animate'
        className='text-gray-400 fill-current'
        x='10%'
        y='45%'
        height='15%'
      />
      <motion.circle className='fill-current text-headline' cx='10%' cy='50%' r='10' />
      <motion.circle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2.5, duration: 0.5 } }}
        className='fill-current text-headline'
        cx='90%'
        cy='50%'
        r='10'
      />
    </motion.svg>
  )
}
