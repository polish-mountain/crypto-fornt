import { motion } from 'framer-motion'

// simple curtain component which takes whole side of the screen and disappear after second
export default function Curtain() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 3 }}
      className='fixed z-10 bg-black w-[100vw] h-[100vh]'></motion.div>
  )
}
