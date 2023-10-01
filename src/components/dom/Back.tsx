import { PreviewControlsActionContext, PreviewControlsStateContext } from '@/contexts/previewControlls'
import { useContext, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'

export function Back() {
  const { previewControls, preview } = useContext(PreviewControlsStateContext)
  const { setPreviewControls, setPreview } = useContext(PreviewControlsActionContext)

  return (
    <>
      {!!previewControls && (
        <button
          onClick={() => {
            if (preview) {
              setPreview(null)
            } else {
              setPreviewControls(null)
            }
          }}
          className='fixed left-0 flex items-center justify-around w-48 h-12 px-8 border-0 rounded-r-2xl top-4 bg-gradient-to-r gradient'>
          <ArrowLeft color='black' size={32} />
          Back
        </button>
      )}
    </>
  )
}
