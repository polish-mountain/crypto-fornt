import { PreviewControlsAction } from '@/contexts/previewControlls'
import { useContext } from 'react'

export function Back() {
  const setPreviewControls = useContext(PreviewControlsAction)
  return (
    <button
      onClick={setPreviewControls((prev) => !prev)}
      className='fixed left-0 w-32 h-16 border top-4 bg-gradient-to-r bg-purple-primary'>
      Back
    </button>
  )
}
