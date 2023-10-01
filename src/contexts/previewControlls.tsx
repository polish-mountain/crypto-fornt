import { Device, DeviceType } from '@/utils/types'
import React, { createContext, useReducer, useContext, ReactNode } from 'react'

const SET_PREVIEW_CONTROLS = 'SET_PREVIEW_CONTROLS'
const SET_IS_PREVIEW = 'SET_IS_PREVIEW'

type StateProps = {
  previewControls: DeviceType | null
  preview: Device | null
}

const initialState: StateProps = {
  previewControls: null,
  preview: null,
}

function reducer(state: StateProps, action: { type: string; payload: any }) {
  switch (action.type) {
    case SET_PREVIEW_CONTROLS:
      return { ...state, previewControls: action.payload }
    case SET_IS_PREVIEW:
      return { ...state, preview: action.payload }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const PreviewControlsStateContext = createContext<StateProps>({ ...initialState })
export const PreviewControlsActionContext = createContext<{
  setPreviewControls: (
    value: DeviceType | null,
  ) => void
  setPreview: (value: Device) => void
} | null>(null)

interface PreviewControlsProviderProps {
  children: ReactNode
}

export function PreviewControlsProvider({ children }: PreviewControlsProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setPreviewControls = (
    value: DeviceType | null,
  ) => dispatch({ type: SET_PREVIEW_CONTROLS, payload: value })

  const setPreview = (value: Device) => dispatch({ type: SET_IS_PREVIEW, payload: value })

  return (
    <PreviewControlsStateContext.Provider value={state}>
      <PreviewControlsActionContext.Provider value={{ setPreviewControls, setPreview }}>
        {children}
      </PreviewControlsActionContext.Provider>
    </PreviewControlsStateContext.Provider>
  )
}
