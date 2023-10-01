import { PreviewControlsStateContext } from '@/contexts/previewControlls'
import { Device } from '@/utils/types'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react'

export default function Vulnerabilities() {
  const { preview } = useContext(PreviewControlsStateContext)

  return (
    <AnimatePresence>
      {!!preview?.open_services && (
        <motion.div
          initial={{ x: -800 }}
          animate={{ x: 0, transition: { duration: 0.5 } }}
          className='fixed bg-[#f9111444] text-gray-300 flex flex-col py-4 px-2 w-[400px] h-[512px] justify-between left-[10vw] gap-8 top-0 bottom-0 my-auto border-black border-2 rounded-xl backdrop-blur'>
          {preview.open_services.map((service, index) => (
            <div key={index} className='flex flex-col gap-4'>
              <h3 className="text-center font-bold text-2xl font-mono text-purple-primary tracking-widest drop-shadow-[0_3.5px_2.5px_rgba(0,0,0,0.8)]">CYBERSECUIRITY THREAT</h3>
              {/* <p className='font-bold'>{index + 1}.</p> */}
              <h2 className='text- font-bold text-2xl'>
                Port: <span className='font-normal '>{service.port}</span>
              </h2>

              <h2 className='text- font-bold text-2xl'>
                Service: <span className='font-normal '>{service.proto}</span>
              </h2>

              <h2 className='text- font-bold text-2xl'>
                Title: <span className='font-normal'>{service.title || '--blank--'}</span>
              </h2>
            </div>
          ))}
          
          {preview.screenshots.map(url => <img src={url} />)}
          <div className='h-32' />
          
        </motion.div>
      )}
    </AnimatePresence>
  )
}
