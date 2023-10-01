import { PreviewControlsStateContext } from '@/contexts/previewControlls'
import { Device } from '@/utils/types'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react'

export default function RemediationModal({ onClick }: { onClick: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        onClick={onClick}
        initial={{ y: -800 }}
        animate={{ y: 0, transition: { duration: 0.5 } }}
        className={
          'bg-[#2ecc7166] fixed  text-gray-300 flex flex-col py-4 px-2 w-[800px] h-[512px] justify-between left-[25vw] gap-8 top-0 bottom-0 my-auto border-[#ff8888] border-[2px] rounded-xl backdrop-blur overflow-y-scroll'
        }>
        <h3 className='text-center font-bold text-2xl font-mono text-yellow-500 mt-2 tracking-widest drop-shadow-[0_3.5px_2.5px_rgba(0,0,0,0.8)]'>
          REMEDIATION INSTRUCTIONS
        </h3>
        <div className='text-xl drop-shadow-[0_3.5px_2.5px_rgba(0,0,0,0.8)]'>
          <p>Go to the devices IP address in your browser.</p>
          <p>
            <a href='http://10.250.194.95' className='text-blue-200 font-bold'>
              http://10.250.194.95
            </a>
          </p>
          <p>
            Go to the <b>Device passwords</b> section of the settings.
          </p>
          <img src='/img/r1.png' className='mt-1 mb-1' />
          <p>
            Select each user and click <b>[Change]</b> to set their password.
          </p>
          <img src='/img/r2.png' />
          <p>Enter the desired password once and twice again to confirm. Remeber to set up a complex password!</p>
          <p>
            Click <b>[Save]</b> to save the password.
          </p>
          <img src='/img/r3.png' className='mt-1 mb-1' />
        </div>
        <div className='h-32' />
      </motion.div>
    </AnimatePresence>
  )
}
