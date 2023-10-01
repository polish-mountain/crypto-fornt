import { PreviewControlsStateContext } from '@/contexts/previewControlls'
import { Device } from '@/utils/types'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react'

export default function Vulnerabilities() {
  const { preview } = useContext(PreviewControlsStateContext)

  return (
    <AnimatePresence>
      {!!preview.open_services && (
        <motion.div
          initial={{ x: -800 }}
          animate={{ x: 0, transition: { duration: 0.5 } }}
          className='fixed gradient bg-gradient-to-r gradient flex flex-col py-4 px-2 w-[400px] h-[512px] justify-between left-[10vw] gap-4 top-0 bottom-0 my-auto border-red-400 border rounded-xl'>
          {preview.open_services.map((service, index) => (
            <div key={index}>
              <p className='font-bold'>{index}.</p>
              <h2 className='text-contrast font-bold text-xl'>Port: </h2>
              {service.port}
              <h2 className='text-contrast font-bold text-xl'>Service: </h2>
              {service.proto}
              <h2 className='text-contrast font-bold text-xl'>Title: </h2>
              {service.title}
            </div>
          ))}
          <div className='h-32' />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
