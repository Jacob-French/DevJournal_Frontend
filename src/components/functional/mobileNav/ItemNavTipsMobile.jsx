import React, { useState } from "react";
import { Circle, Line, MinimizeIcon, MoreIcon, TipsIcon } from "../../items/Icons";
import { NavLink } from "react-router";
import FlexRow, { FlexRowSmall, TipsBar } from "./MobileNavComponents";

export default function ItemNavTipsMobile({ items, title, tips }){

  const [showNav, setShowNav] = useState(true)
  const [showTips, setShowTips] = useState(false)
  
  const tipsButtonActiveClass = ""

  function toggleNav(){
    if(showNav){
      setShowTips(false)
    }
    setShowNav(prev => !prev)
  }

  function toggleTips(){
    setShowTips(prev => !prev)
  }

  return (
    <div className={`
      fixed bottom-0 top-14 left-0 w-60 z-200
      flex flex-col justify-start
      bg-space-200 shadow-sm shadow-gray-950
      transition-transform duration-500
      ${!showNav && "-translate-x-50"}
    `}>
      {/* Head Bar Container */}
      <div className="w-full flex flex-row justify-start bg-space-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.3)] z-300">
        <div className="px-3 flex-1 flex flex-col relative justify-start">
          <FlexRow className="flex flex-row justify-start">
            <button className={`
              font-league-spartan uppercase text-md text-[var(--color-theme-100)] mr-auto
            `}>{title}</button>
            <button className="" onClick={toggleTips}>
              <TipsIcon className={`
                w-7 h-7 p-1 cursor-pointer
                hover:border hover:rounded-md hover:bg-space-300 hover:border-space-400
                ${showTips ? "border rounded-md bg-space-300 border-space-400 text-space-800" : ""}
              `} />
            </button>
          </FlexRow>
        </div>
        <div className="w-10 flex flex-col justify-start">
          <FlexRow className="flex flex-row justify-center">
            <button onClick={toggleNav} className="cursor-pointer">
              {showNav && <MinimizeIcon />}
              {!showNav && <MoreIcon />}
            </button>
          </FlexRow>
        </div>
      </div>

      <div className="w-full flex-1 relative">

        <TipsBar tips={tips} showTips={showTips} />
      
        <div className="absolute left-0 right-0 top-0 bottom-0 flex flex-row justify-start">
          <div className="px-3 flex-1 flex flex-col relative justify-start">
            {items && items.map((item, id) => (
              <React.Fragment key={id}>
                {
                  id !== 0 && item.type === 'family' ? 
                  <FlexRow className="flex flex-col justify-center">
                    <hr className="text-space-600 m-2 -translate-y-[0.2rem]" />
                  </FlexRow>
                  : null
                }
                {
                  item.type === 'family' ? 
                  <FlexRowSmall>
                    <span className="font-league-spartan uppercase text-xs text-space-600 px-2">{item.content}</span>
                  </FlexRowSmall>
                  : 
                  <FlexRow>
                    <NavLink 
                      key={id + "e"} 
                      className={({isActive}) => isActive ? "group active z-100" : "group z-100"} to={`/journal${item.content.route}`} onClick={toggleNav}>
                      
                      <div className="flex flex-row justify-start items-center">
                        <h3 
                          className={`
                          font-[Poppins] text-space-800 text-sm w-full
                          border border-transparent px-4 py-1 my-1 mx-2 rounded-xl box-content cursor-pointer
                          hover:border hover:border-space-400 hover:bg-space-300 hover:shadow-md group-[.active]:text-space-900
                          `}>{item.content.title}
                        </h3>
                      </div>
                    </NavLink>
                  </FlexRow>
                }
              </React.Fragment>
            ))}
          </div>
          <div className="border-l-1 border-space-300 w-10 flex flex-col justify-start">

            {items && items.map((item, id) => (
              <React.Fragment key={id}>
                {
                  id !== 0 && item.type === 'family' ? 
                  <FlexRow />
                  : null
                }
                {
                  item.type === 'family' ? 
                  <FlexRowSmall>
                    
                  </FlexRowSmall>
                  : 
                  <FlexRow className="flex flex-col justify-center items-center">
                    <NavLink 
                      to={`/journal${item.content.route}`} 
                      className={({ isActive }) => isActive ? 
                      "group active z-100 w-5 h-5 flex flex-col justify-center items-center" : 
                      "group z-100 w-5 h-5 flex flex-col justify-center items-center"}>
                      <Circle className={`
                        w-2 h-2 z-100 text-space-700 group-[.active]:w-4 group-[.active]:h-4 group-[.active]:text-theme-100
                      `} />
                    </NavLink>
                  </FlexRow>
                }
                {
                  item.type !== 'family' && items[id + 1] && items[id + 1].type !== 'family' ?
                  <>
                    <div className="flex flex-col justify-center items-center h-0">
                      <Line className="w-[186px] h-10 absolute text-space-700 z-50" />
                    </div>
                  </> : null
                }
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}