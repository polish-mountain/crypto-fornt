import { PreviewControlsStateContext } from '@/contexts/previewControlls'
import { Device } from '@/utils/types'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react'

export default function Preview() {
  const { preview } = useContext(PreviewControlsStateContext)

  return (
    <AnimatePresence>
      {!!preview && (
        <motion.div
          initial={{ x: 800 }}
          animate={{ x: 0, transition: { duration: 0.5 } }}
          className='fixed gradient bg-gradient-to-r gradient flex flex-col py-4 px-2 w-[400px] h-[512px] justify-between right-[10vw] gap-4 top-0 bottom-0 my-auto border-purple-primary border rounded-xl'>
          <div>
            <h2 className='text-contrast font-bold text-xl'>IP</h2>
            {preview.ip}
          </div>
          <div>
            <h2 className='text-contrast font-bold text-xl'>Host</h2>
            {preview.host || '-- blank --'}
          </div>
          <div>
            <h2 className='text-contrast font-bold text-xl'>Device Name</h2>
            {preview.device_name || '-- blank --'}
          </div>
          <div>
            <h2 className='text-contrast font-bold text-xl'>OS</h2>
            {preview.device_type || '-- blank --'}
          </div>
          <div className='h-32' />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
