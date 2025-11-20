import { createContext, useContext, useEffect, useState } from "react"

const screenSizeContext = createContext()

export function ScreenSizeProvider({ children }){
  
  const [mobileScreen, setMobileScreen] = useState(null)

  useEffect(() => {
    
    function handleResize(){
      const screen = window.matchMedia('(min-width: 1024px)')
      setMobileScreen(! screen.matches)
    }

    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => {window.removeEventListener('resize', handleResize)}
  }, [mobileScreen])

  return (
    <screenSizeContext.Provider value={mobileScreen}>
      {children}
    </screenSizeContext.Provider>
  )
}

export function useCheckMobileScreen(){
  const context = useContext(screenSizeContext)

  if(context === undefined){
    throw new Error('useCheckMobileScreen must be used within the screenSizeContext Provider')
  }

  return context
}