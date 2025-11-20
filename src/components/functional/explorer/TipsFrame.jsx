import { useState } from "react"

export default function TipsFrame({ tips, displayTip }){

  const [activeTip, setActiveTip] = useState(null)

  function handleTip(tip, id){
    const tipEnvolope = {
      tip: tip,
      close: closeTip
    }
    
    setActiveTip(id)
    displayTip(tipEnvolope)
  }

  function closeTip(){
    setActiveTip(null)
  }

  return (
    <div className="p-3">
      {tips && tips.map((tip, id) => (
        <button onClick={() => {handleTip(tip, id)}} key={id} className={`
          font-[Poppins] text-sm text-space-700 ${id === activeTip && "text-space-800"} cursor-pointer mb-[var(--sd-gap-small)]
          bg-transparent hover:bg-space-300 border-1 border-transparent
          hover:border-space-400 rounded-lg px-2 py-1 w-full text-left
        `}>
          {tip.title}
        </button>
      ))}
    </div>
  )
}