import { SKILLS } from '@/utils/global'
import { createContext, useReducer, useState } from 'react'

export const LastHoveredBallContext = createContext(null)
export const SetLastHoveredBallContext = createContext(null)

export function LastHoveredBallProvider({ children }) {
  const [lastHoveredBall, setLastHoveredBall] = useState<number>(0)

  return (
    <SetLastHoveredBallContext.Provider value={setLastHoveredBall}>
      <LastHoveredBallContext.Provider value={lastHoveredBall}>{children}</LastHoveredBallContext.Provider>
    </SetLastHoveredBallContext.Provider>
  )
}
