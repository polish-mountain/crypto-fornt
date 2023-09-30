import localFont from 'next/font/local'
import { useEffect, useRef, useState } from 'react'

const retro = localFont({ src: '../../fonts/speedy_retro.otf', preload: true })

export default function FirstLoading() {
  const dots = useRef<HTMLSpanElement>(null)

  const [dotDisappear, setDotDisappeared] = useState(0)

  useEffect(() => {
    /* const interval = setInterval(() => {
      setDotDisappeared((prev) => {
        const newValue = (prev + 1) % 4
        dots.current.children[newValue].classList.add('opacity-0')
        dots.current.children[prev].classList.remove('opacity-0')
        return (prev + 1) % 4
      })
    }, 500)
    return () => clearInterval(interval) */
  })
  return (
    <div className='fixed bg-black z-99999 w-[100vw] h-[100vh] grid place-items-center'>
      <section
        className={`text-6xl p-8 textGradient bg-gradient-to-b animate-[glowingText_2s_ease-in-out_infinite_alternate] ${retro.className}`}>
        <span>
          Loading
          <span ref={dots}>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </span>
      </section>
    </div>
  )
}
