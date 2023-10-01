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
          className='fixed bg-[#f91114] flex flex-col py-4 px-2 w-[400px] h-[512px] justify-between left-[10vw] gap-8 top-0 bottom-0 my-auto border-black border-2 rounded-xl'>
          {preview.open_services.map((service, index) => (
            <div key={index} className='flex flex-col gap-4'>
              <p className='font-bold'>{index + 1}.</p>
              <h2 className='text- font-bold text-2xl'>
                Port: <span className='font-normal text-black'>{service.port}</span>
              </h2>

              <h2 className='text- font-bold text-2xl'>
                Service: <span className='font-normal text-black'>{service.proto}</span>
              </h2>

              <h2 className='text- font-bold text-2xl'>
                Title: <span className='font-normal text-black'>{service.title || '--blank--'}</span>
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
