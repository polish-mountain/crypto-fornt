import { createContext, useState } from 'react'

type StateProps = {
  previewControls: 'phone' | 'desktop' | 'laptop' | null
}

type ActionProps = {
  setPreviewControls: (value: 'phone' | 'desktop' | 'laptop' | null) => void
}

export const PreviewControlsState = createContext(null)
export const PreviewControlsAction = createContext(null)

export function PreviewControls({ children }) {
  const [previewControls, setPreviewControls] = useState<boolean>(false)

  return (
    <PreviewControlsAction.Provider value={setPreviewControls}>
      <PreviewControlsState.Provider value={previewControls}>{children}</PreviewControlsState.Provider>
    </PreviewControlsAction.Provider>
  )
}
