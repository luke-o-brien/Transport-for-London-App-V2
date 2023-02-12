
import React, { useContext, useEffect } from "react"
import { useState } from "react"

const appContext = React.createContext()

export function useTheme() {
  return useContext(appContext)
}

export function Themeprovider({ children }) {
  const [theme, setTheme] = useState(false)
  useEffect(() => {
  const today = new Date()
  const hours = today.getHours()
  console.log(hours)
  if(hours > 19 || hours > 6 || hours === 0 ) {
    setTheme(true)
  } else {
    setTheme(false)
  }
}, [])
  return (
    <appContext.Provider value={theme}>
      {children}
    </appContext.Provider>
  )
}