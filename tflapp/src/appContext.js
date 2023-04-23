
import React, { useContext, useEffect, createContext } from "react"
import { useState } from "react"

const appContext = createContext()

export function useTheme() {
  return useContext(appContext)
}

export function Themeprovider({ children }) {
  const [theme, setTheme] = useState("light")
  useEffect(() => {
  const today = new Date()
  const hours = today.getHours()
  console.log(hours)
  if(hours > 19 || hours < 6 || hours === 0 ) {
    setTheme("dark")
  } else {
    setTheme("light")
  }
}, [])
  return (
    <appContext.Provider value={theme}>
      {children}
    </appContext.Provider>
  )
}