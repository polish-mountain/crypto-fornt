import { PreviewControlsStateContext } from '@/contexts/previewControlls'
import { Device } from '@/utils/types'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext, useState } from 'react'
import RemediationModal from './RemediationModal'

export default function Vulnerabilities() {
  const { preview } = useContext(PreviewControlsStateContext)

  let isGood = !preview?.open_services || preview?.open_services.length === 0
  const [remediation, setRemediation] = useState<boolean>(false)
  return (
    <AnimatePresence>
      {!!preview?.open_services && (
        <motion.div
          initial={{ x: -800 }}
          animate={{ x: 0, transition: { duration: 0.5 } }}
          className={
            (isGood ? 'bg-[#2ecc7166]' : 'bg-[#f9111466]') +
            ' fixed  text-gray-300 flex flex-col py-4 px-2 w-[400px] h-[512px] justify-between left-[10vw] gap-8 top-0 bottom-0 my-auto border-[#ff8888] border-[2px] rounded-xl backdrop-blur'
          }>
          {isGood && (
            <h3 className='text-center font-bold text-2xl font-mono text-yellow-500 mt-12 tracking-widest drop-shadow-[0_3.5px_2.5px_rgba(0,0,0,0.8)]'>
              NO PROBLEMS FOUND
            </h3>
          )}

          {preview.open_services.map((service, index) => (
            <div key={index} className='flex flex-col gap-4'>
              <h3 className='text-center font-bold text-2xl font-mono text-purple-primary tracking-widest drop-shadow-[0_3.5px_2.5px_rgba(0,0,0,0.8)]'>
                CYBERSECURITY THREAT
              </h3>
              {/* <p className='font-bold'>{index + 1}.</p> */}
              <h2 className='drop-shadow-[0_3.5px_2.5px_rgba(0,0,0,0.8)] text- font-bold text-2xl'>
                Port: <span className='font-normal '>{service.port}</span>
              </h2>

              <h2 className='drop-shadow-[0_3.5px_2.5px_rgba(0,0,0,0.8)] text- font-bold text-2xl'>
                Service: <span className='font-normal '>{service.proto}</span>
              </h2>

              <h2 className='drop-shadow-[0_3.5px_2.5px_rgba(0,0,0,0.8)] text- font-bold text-2xl'>
                Title: <span className='font-normal'>{service.title || '--blank--'}</span>
              </h2>
            </div>
          ))}

          {preview.screenshots.map((url) => (
            <img src={url} className='drop-shadow-[0_3.5px_2.5px_rgba(0,0,0,0.8)]' />
          ))}
          {preview.screenshots.length > 0 && (
            <button
              className='bg-[#2ecc7166] p-4  rounded-xl backdrop-blur'
              onClick={() => {
                setRemediation(true)
              }}>
              Remediation instructions
            </button>
          )}
          <div className='h-64' />

          {remediation && <RemediationModal onClick={
            () => {
              setRemediation(false)
            }
          } />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
