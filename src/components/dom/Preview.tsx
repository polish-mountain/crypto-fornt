import { Device } from '@/utils/types'
import { AnimatePresence, motion } from 'framer-motion'

export default function Preview({ ip, host }: Device) {
  return (
    <AnimatePresence>
      <motion.div className='fixed right-0'></motion.div>
    </AnimatePresence>
  )
}
