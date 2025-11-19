import React, { useState } from "react"
import { NavLink } from "react-router"
import { Circle, Line, MinimizeIcon, MoreIcon } from "../../items/Icons"

export default function ItemNavMobile({ items, title, children }){
  const [hidden, setHidden] = useState(false)

  const hiddenPanelClass = 
  `
    nav-grid absolute left-0 box-border border-r border-space-300 bg-space-200 
    grid grid-cols-[calc(0.25rem_*_40)_calc(0.25rem_*_10)]
    transition-transform duration-500
    p-0 h-full content-start

    -translate-x-40
  `

  const visiblePanelClass = 
  `
    nav-grid absolute left-0 box-border border-r border-space-300 bg-space-200 
    grid grid-cols-[calc(0.25rem_*_40)_calc(0.25rem_*_10)]
    transition-transform duration-500
    p-0 h-full content-start
  `

  function toggleHidden(){
    setHidden(prev => !prev)
  }
  
  return(
    <div className="item-nav-mobile relative box-border w-15 h-full z-100">
      <div className={hidden ? hiddenPanelClass : visiblePanelClass}>
        <button 
          className={
            `w-10 h-10 cursor-pointer font-bold absolute top-0 right-0
            flex flex-col justify-center items-center
          `} 
          onClick={toggleHidden}>
          {hidden && <MoreIcon />}
          {!hidden && <MinimizeIcon />}
        </button>
        <div className="">
          <h1 className={`
            font-league-spartan uppercase text-md text-[var(--color-theme-100)] mb-[var(--sd-gap-mid)]
            px-2 pt-3
          `}>{title}</h1>
        </div>
        <div className="border-l border-l-space-500"></div>
        {
          items && items.map((heading, id) => (
          <React.Fragment key={id}>
            {
              id !== 0 && heading.type === 'family' ? 
              <>
                <div key={id + "a"} className="h-[var(--sd-gap-mid)] flex flex-col justify-center my-4">
                  <hr className="text-space-600 m-2" />
                </div> 
                <div key={id + "b"} className="border-l border-l-space-500"></div>
              </>
              : null
            }
            {heading.type === 'family' ?
              <>
                <h2 key={id + "c"} className="font-league-spartan uppercase text-xs text-space-600 px-2">{heading.content}</h2> 
                <div key={id + "d"} className="border-l border-l-space-500"></div>
              </>
              : 
              <>
                <NavLink key={id + "e"} className={({isActive}) => isActive ? "group active z-100" : "group z-100"} to={`/journal${heading.content.route}`}>
                  <div className="flex flex-row justify-start items-center">
                    <h3 
                      className={`
                      font-[Poppins] text-space-800 text-sm w-full
                      border border-transparent px-4 py-1 my-1 mx-2 rounded-xl box-content cursor-pointer
                      hover:border hover:border-space-400 hover:bg-space-300 hover:shadow-md group-[.active]:text-space-900
                      `}>{heading.content.title}
                    </h3>
                  </div>
                </NavLink>
                <div key={id + "f"} className="relative">
                  <div className="h-full flex flex-col justify-center items-center border-l border-l-space-500">
                    <NavLink 
                      to={`/journal${heading.content.route}`} 
                      className={({ isActive }) => isActive ? 
                      "group active z-100 w-5 h-5 flex flex-col justify-center items-center" : 
                      "group z-100 w-5 h-5 flex flex-col justify-center items-center"}>
                      <Circle className="w-2 h-2 z-100 group-[.active]:w-4 group-[.active]:h-4" />
                    </NavLink>
                  </div>
                  {
                    items[id + 1] && items[id + 1].type !== 'family' ?
                    <>
                      <div className="flex flex-col justify-center items-center">
                        <Line className="w-[186px] h-10 absolute text-space-700 z-50" />
                      </div>
                    </> : null
                  }
                </div>
              </>
            }
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}