export default function Footer() {
  return (
    <footer className='absolute bottom-0 right-0'>
      <div className='h-16 pl-12 rounded-tl-full grid place-items-center bg-contrast from-black to-purple-primary bg-gradient-to-l w-[24rem]'>
        <div className='flex items-center justify-between w-full pt-2 pb-1 pr-24 gap-2'>
          <h1 className='text-lg text-background '>Jakub Kowieski ©</h1>
          <div className='h-8 pt-[0.1rem]'>
            <div className='h-full bg-black border-l-[1px] opacity-30 border-flashy-primary'></div>
          </div>
          <a href='https://www.linkedin.com/in/jakubkowieski/' target='_blank'>
            <LinkedinIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}

const LinkedinIcon = () => {
  return (
    <svg fill='url(#grad1)' viewBox='0 0 1024 1024' className='w-8 h-8' xmlns='http://www.w3.org/2000/svg'>
      <linearGradient id='grad1' x1='0%' x2='100%' y1='0%' y2='0%'>
        <stop offset='0%' stopColor='#7F5AF0'></stop>
        <stop offset='100%' stopColor='#647DEE'></stop>
      </linearGradient>
      <path d='M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1 1 68.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z'></path>
    </svg>
  )
}
