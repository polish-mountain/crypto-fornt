// contact component

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Message } from '@/utils/types'
import { postMessageDB } from '@/utils/firebase'

export default function Contact() {
  const [buttonHover, setButtonHover] = useState(false)
  const arrow = useRef<HTMLButtonElement>(null)
  const formSection = useRef<HTMLDivElement>(null)

  const { register, handleSubmit } = useForm<Message>()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const height = useRef(0)
  const onSubmit: SubmitHandler<Message> = async (data) => {
    const arrowRect = arrow.current?.getBoundingClientRect()
    const formRect = formSection.current?.getBoundingClientRect()
    const distance = arrowRect.y - formRect.y

    height.current = arrowRect.y - 96
    const result = await postMessageDB(data)
    if (result.code == 200) {
      setSubmitted(true)
    } else {
      setError(true)
    }
    const form = document.getElementById('messageForm') as HTMLFormElement
    form.reset()
  }

  /* useEffect(() => {
    setSubmitted(false)
  }) */

  return (
    <section ref={formSection} id='contact' className='relative flex flex-col py-14 min-h-[100vh] px-28'>
      <div className='flex justify-between w-full'>
        <h1 className='text-5xl text-headline'>
          Contact <span className='textGradient bg-gradient-to-t'>me</span>
        </h1>
        <ContactIcon />
      </div>
      <section className='flex flex-1 pt-8 pb-12 w-[64rem]'>
        <form
          id='messageForm'
          onSubmit={handleSubmit(onSubmit)}
          className='p-8 bg-gray-800 border-2 shadow-2xl border-flashy-primary shadow-purple-primary place-items-center rounded-3xl gap-16 grid grid-cols-2 grid-rows-[1fr_1fr_1fr_2fr_1fr] lg:grid-rows-[3fr_3fr_8fr] '>
          <div className='flex flex-col w-full h-24 gap-2 col-span-2 lg:col-span-1'>
            <label className='text-xl text-headline'>Full name</label>
            <input
              required
              className='flex-1 w-full px-2 text-lg bg-gray-900 border-b-4 border-[1px] text-headline rounded-tr-xl rounded-bl-xl rounded-md border-flashy-secondary'
              {...register('fullName')}
            />
          </div>
          <div className='flex flex-col w-full h-24 gap-2 col-span-2 lg:col-span-1'>
            <label className='text-xl text-headline'>Last name</label>
            <input
              required
              className='flex-1 w-full px-2 text-lg bg-gray-900 border-b-4 border-[1px] text-headline rounded-tr-xl rounded-bl-xl rounded-md border-flashy-secondary'
              {...register('lastName')}
            />
          </div>

          <div className='flex flex-col w-full h-24 gap-2 col-span-2 lg:col-span-1'>
            <label className='text-xl text-headline'>Email</label>
            <input
              required
              type='email'
              className='flex-1 w-full px-2 text-lg bg-gray-900 border-b-4  invalid:border-red-100 border-[1px] text-headline rounded-tr-xl rounded-bl-xl rounded-md border-flashy-secondary'
              {...register('email')}
            />
          </div>
          <motion.button
            onHoverStart={() => setButtonHover(true)}
            onHoverEnd={() => setButtonHover(false)}
            animate={{ x: submitted ? '100vw' : 0, transition: { duration: 3, ease: 'easeInOut' } }}
            ref={arrow}
            type='submit'
            className='relative self-end order-last w-16 h-16 col-span-2 lg:col-span-1 lg:mr-16 justify-self-end group lg:order-none'>
            <span className='sr-only'></span>
            <span className='absolute bottom-0 left-0 right-0 mx-auto opacity-0 group-hover:opacity-[1] transition-opacity translate-y-full textGradient bg-gradient-to-t'>
              Send
            </span>
            <motion.span className='absolute bottom-0 left-0 inline-block' animate={{ x: buttonHover ? 10 : 0 }}>
              <SendIcon />
            </motion.span>
          </motion.button>

          <div className='flex flex-col w-full h-full col-span-2 gap-2'>
            <label className='text-xl text-headline'>Message</label>
            <textarea
              required
              className='flex-1 w-full px-2 text-lg bg-gray-900 resize-none border-[2px] text-headline rounded-md border-purple-secondary'
              {...register('message')}
            />
          </div>
        </form>
      </section>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          style={{ top: height.current }}
          className={`absolute right-0 h-64 w-64 bg-contrast rounded-l-full`}>
          <div className='flex flex-col justify-around h-full pt-12 pb-16 pl-12'>
            <h1 className='text-xl text-headline'>Message sent!</h1>
            <p className='text-lg text-bacground'>I will get back to you as soon as possible.</p>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{ top: height.current }}
          className={`absolute right-0 h-64 w-64 bg-[#ed4337] rounded-l-full`}>
          <div className='flex flex-col justify-around h-full pt-12 pb-16 pl-14'>
            <h1 className='text-xl text-headline'>Message lost!</h1>
            <p className='text-md text-bacground'>
              For some reason message <br />
              didn&apos;t came through. <br /> <span className='relative top-4'>Try again later</span>
            </p>
          </div>
        </motion.div>
      )}
    </section>
  )
}

const ContactIcon = () => {
  const [isHover, setIsHover] = useState(false)
  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      fill='url(#grad1)'
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      className='w-12 h-12'
      viewBox='0 0 25 27'>
      <linearGradient id='grad1' x1='0%' x2='100%' y1='0%' y2='0%'>
        <stop offset='0%' stopColor='#7F5AF0'></stop>
        <stop offset='100%' stopColor='#647DEE'></stop>
      </linearGradient>
      <linearGradient id='grad2' x1='0%' x2='100%' y1='0%' y2='0%'>
        <stop offset='0%' stopColor='#647DEE'></stop>
        <stop offset='100%' stopColor='#FC2977'></stop>
      </linearGradient>
      <g>
        <g>
          <path d='M12.5 0L25 11v14.006A2 2 0 0122.996 27H2.004A1.994 1.994 0 010 25.006V11L12.5 0z'></path>
          <path fill='#16161a' d='M12.5 1.3L1.547 10.991v11.2h21.895v-11.2L14.428 3 12.5 1.3z'></path>
        </g>
        <motion.g animate={{ y: isHover ? 3 : 10, x: 3, transition: { duration: 1 } }}>
          <path d='M17.003 0C18.109 0 19 .895 19 2v14H0V2C0 .887.894 0 1.997 0h15.006z'></path>
          <path d='M18 2.009C18 1.452 17.545 1 17 1H2c-.552 0-1 .444-1 1.002v14.03h17V2.008z'></path>
          <path fill='#2cb67d' d='M3 4v1h13V4H3zM3 7v1h13V7H3zM3 13v1h13v-1H3zM3 10v1h13v-1H3z'></path>
        </motion.g>
        <g transform='translate(0 11)'>
          <path
            fill='url(#grad2)'
            d='M1.484 0l9.079 8h3.874L22.715.604 23.39 0H25v14.006A2 2 0 0122.996 16H2.004A1.994 1.994 0 010 14.006V0h1.484z'></path>
          <path
            fill='#16161a'
            d='M9.5 9l-7 6h20l-7-6h-6zM23.685 14.725L16 8.017 24 1v13a.998.998 0 01-.315.725zM9 8.017L1 1v13c0 .283.121.542.315.725L9 8.017z'></path>
        </g>
      </g>
    </motion.svg>
  )
}

const SendIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='url(#grad1)' className='w-16 h-16' viewBox='0 0 24 24'>
      <linearGradient id='grad1' x1='0%' x2='100%' y1='0%' y2='0%'>
        <stop offset='0%' stopColor='#7F5AF0'></stop>
        <stop offset='100%' stopColor='#647DEE'></stop>
      </linearGradient>
      <path d='M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z' />
    </svg>
  )
}
