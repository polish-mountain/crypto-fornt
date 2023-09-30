import { cameraDefault } from '@/utils/global'
import React, { createContext, useReducer, useContext, ReactNode } from 'react'

const SET_PREVIEW_CONTROLS = 'SET_PREVIEW_CONTROLS'
const SET_CAMERA_POSITION = 'SET_CAMERA_POSITION'

type StateProps = {
  previewControls: 'phone' | 'desktop' | 'laptop' | 'phonePreview' | 'desktopPreview' | 'laptopPreview' | null
  cameraPosition: [number, number, number]
}

const initialState: StateProps = {
  previewControls: null,
  cameraPosition: cameraDefault,
}

function reducer(state: StateProps, action: { type: string; payload: any }) {
  switch (action.type) {
    case SET_PREVIEW_CONTROLS:
      return { ...state, previewControls: action.payload }
    case SET_CAMERA_POSITION:
      return { ...state, cameraPosition: action.payload }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const PreviewControlsStateContext = createContext<StateProps>({ ...initialState })
export const PreviewControlsActionContext = createContext<{
  setPreviewControls: (
    value: 'phone' | 'desktop' | 'laptop' | 'phonePreview' | 'desktopPreview' | 'laptopPreview' | null,
  ) => void
  setCameraPosition: (value: [number, number, number]) => void
} | null>(null)

interface PreviewControlsProviderProps {
  children: ReactNode
}

export function PreviewControlsProvider({ children }: PreviewControlsProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setPreviewControls = (
    value: 'phone' | 'desktop' | 'laptop' | 'phonePreview' | 'desktopPreview' | 'laptopPreview' | null,
  ) => dispatch({ type: SET_PREVIEW_CONTROLS, payload: value })

  const setCameraPosition = (value: [number, number, number]) => dispatch({ type: SET_CAMERA_POSITION, payload: value })

  return (
    <PreviewControlsStateContext.Provider value={state}>
      <PreviewControlsActionContext.Provider value={{ setPreviewControls, setCameraPosition }}>
        {children}
      </PreviewControlsActionContext.Provider>
    </PreviewControlsStateContext.Provider>
  )
}
