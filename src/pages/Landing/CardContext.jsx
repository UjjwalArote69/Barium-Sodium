/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from 'react'

const CardContext = createContext(null)

export function CardProvider({ children }) {
  const [payload, setPayload] = useState(null)

  const open = useCallback((next) => setPayload(next), [])
  const close = useCallback(() => setPayload(null), [])

  return (
    <CardContext.Provider value={{ payload, open, close }}>
      {children}
    </CardContext.Provider>
  )
}

export function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error('useCard must be used inside <CardProvider>')
  return ctx
}
