import { cameraDefault } from '@/utils/global'
import React, { createContext, useReducer, useContext, ReactNode } from 'react'

const SET_PREVIEW_CONTROLS = 'SET_PREVIEW_CONTROLS'
const SET_IS_PREVIEW = 'SET_IS_PREVIEW'

type StateProps = {
  previewControls: 'phone' | 'desktop' | 'laptop' | 'phonePreview' | 'desktopPreview' | 'laptopPreview' | null
  isPreview: boolean
}

const initialState: StateProps = {
  previewControls: null,
  isPreview: false,
}

function reducer(state: StateProps, action: { type: string; payload: any }) {
  switch (action.type) {
    case SET_PREVIEW_CONTROLS:
      return { ...state, previewControls: action.payload }
    case SET_IS_PREVIEW:
      return { ...state, isPreview: action.payload }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const PreviewControlsStateContext = createContext<StateProps>({ ...initialState })
export const PreviewControlsActionContext = createContext<{
  setPreviewControls: (
    value: 'phone' | 'desktop' | 'laptop' | 'phonePreview' | 'desktopPreview' | 'laptopPreview' | null,
  ) => void
  setIsPreview: (value: boolean) => void
} | null>(null)

interface PreviewControlsProviderProps {
  children: ReactNode
}

export function PreviewControlsProvider({ children }: PreviewControlsProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setPreviewControls = (
    value: 'phone' | 'desktop' | 'laptop' | 'phonePreview' | 'desktopPreview' | 'laptopPreview' | null,
  ) => dispatch({ type: SET_PREVIEW_CONTROLS, payload: value })

  const setIsPreview = (value: boolean) => dispatch({ type: SET_IS_PREVIEW, payload: value })

  return (
    <PreviewControlsStateContext.Provider value={state}>
      <PreviewControlsActionContext.Provider value={{ setPreviewControls, setIsPreview }}>
        {children}
      </PreviewControlsActionContext.Provider>
    </PreviewControlsStateContext.Provider>
  )
}
