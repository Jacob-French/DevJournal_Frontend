import { useEffect, useRef, useState } from "react"
import { TipsIcon } from "../../items/Icons"
import TipsFrame from "../explorer/TipsFrame"

export default function FlexRow({ children, className }){

  return(
    <div className={`w-full h-10 ${className}`}>
      {children}
    </div>
  )
}

export function FlexRowSmall({ children, className }){

  return(
    <div className={`w-full h-6 ${className}`}>
      {children}
    </div>
  )
}

export function TipsBar({ tips, showTips }){

  const [on, setOn] = useState(false)
  const [shift, setShift] = useState(true)
  const[hide, setHide] = useState(true)
  const[transition, setTransition] = useState(0)
  
  const stateRef = useRef();

  useEffect(() => {

    stateRef.current = { shift, hide, transition, on, showTips }

    console.log("on: ", on)
    console.log("show tips: ", showTips)
    console.log("shift: ", shift)
    console.log("hide: ", hide)
    console.log("------------------------------")
    
    if(showTips && transition === 0){
      setOn(true)
    }
    else if(!showTips && transition == 2){
      setOn(false)
    }

    if(on){
      //if away and hidden
      if(shift && hide && transition === 0){
        setTransition(1) //comming out
        setHide(false)
      }
      else if(shift && !hide && transition === 1){
        setTimeout(() => {
          const current = stateRef.current;
          if(current.shift && !current.hide && current.transition === 1){
            setShift(false)
            setTransition(2)
          }
        }, 10)
      }
    }
    else{
      if(!shift && !hide && transition === 2){
        setTransition(3)
        setShift(true)
      }
      else if(shift && !hide && transition === 3){
        setTimeout(() => {
          const current = stateRef.current;
          if(current.shift && !current.hide && current.transition === 3){
            setHide(true)
            setTransition(0)
          }
        }, 1000)
      }
    }
  }, [showTips, hide, shift, on])

  return (
    <div className={`
      absolute left-0 right-0 top-0 bottom-0 bg-space-200 z-200
      transition-transform duration-700
      ${hide && "hidden"}
      ${shift && "-translate-x-70"}
    `}>
      <div className="h-10 flex flex-row justify-start items-center">
        <span className="block font-league-spartan uppercase text-xs text-space-600 px-2">tips</span>
      </div>
      
      <TipsFrame tips={tips} />
    </div>
  )
}