import { Device } from '@/utils/types'
import React, { createContext, useReducer, useContext, ReactNode } from 'react'

const SET_PREVIEW_CONTROLS = 'SET_PREVIEW_CONTROLS'
const SET_IS_PREVIEW = 'SET_IS_PREVIEW'
const SET_Y_SCROLL_OFFSET = 'SET_Y_SCROLL_OFFSET'

type StateProps = {
  previewControls: 'phone' | 'desktop' | 'laptop' | 'phonePreview' | 'desktopPreview' | 'laptopPreview' | null
  preview: Device | null
  yScrollOffset: number
}

const initialState: StateProps = {
  previewControls: null,
  preview: null,
  yScrollOffset: 0,
}

function reducer(state: StateProps, action: { type: string; payload: any }) {
  switch (action.type) {
    case SET_PREVIEW_CONTROLS:
      return { ...state, previewControls: action.payload }
    case SET_IS_PREVIEW:
      return { ...state, preview: action.payload }
    case SET_Y_SCROLL_OFFSET:
      return { ...state, yScrollOffset: action.payload }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const PreviewControlsStateContext = createContext<StateProps>({ ...initialState })
export const PreviewControlsActionContext = createContext<{
  setPreviewControls: (
    value: 'phone' | 'desktop' | 'laptop' | 'phonePreview' | 'desktopPreview' | 'laptopPreview' | null,
  ) => void
  setPreview: (value: Device) => void
  setYScrollOffset: (value: number) => void
} | null>(null)

interface PreviewControlsProviderProps {
  children: ReactNode
}

export function PreviewControlsProvider({ children }: PreviewControlsProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setPreviewControls = (
    value: 'phone' | 'desktop' | 'laptop' | 'phonePreview' | 'desktopPreview' | 'laptopPreview' | null,
  ) => dispatch({ type: SET_PREVIEW_CONTROLS, payload: value })

  const setPreview = (value: Device) => dispatch({ type: SET_IS_PREVIEW, payload: value })

  const setYScrollOffset = (value: number) => dispatch({ type: SET_Y_SCROLL_OFFSET, payload: value })

  return (
    <PreviewControlsStateContext.Provider value={state}>
      <PreviewControlsActionContext.Provider value={{ setPreviewControls, setPreview, setYScrollOffset }}>
        {children}
      </PreviewControlsActionContext.Provider>
    </PreviewControlsStateContext.Provider>
  )
}
