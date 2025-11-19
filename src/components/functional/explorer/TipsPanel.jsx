import { TipsIcon } from "../../items/Icons";
import TipsFrame from "./TipsFrame";

export default function TipsPanel({ tips }){
  

  return(
    <div className={`
      w-full h-full
      bg-space-200 border-1 border-space-300 rounded-md
    `}>
    
    <div className="border-b-1 border-space-300 h-10 flex flex-row justify-start items-center">
      <div className="w-10 flex flex-col justify-center items-center">
        <TipsIcon className="text-space-700" />
      </div>
      <span className="block font-league-spartan uppercase text-md text-space-700">tips</span>
    </div>
    
    <TipsFrame tips={tips} />

    </div>
  )
}