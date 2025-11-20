import { useState } from "react";
import { NavLink } from "react-router";

export default function ItemNav({ items, title }){
  
  return (
    <nav className="w-50 h-full bg-space-200 border-r border-space-300 p-[var(--sd-gap-mid)]">
      <h1 className="font-league-spartan uppercase text-md text-[var(--color-theme-100)] mb-[var(--sd-gap-mid)]">{title}</h1>
      
      {items && items.map((heading, id) => (
        <div key={id}>
          {id !== 0 && heading.type === 'family' ? 
            <div className="h-[var(--sd-gap-mid)] flex flex-col justify-center my-4 mb-6">
              <hr className="text-space-600" />
            </div> : null}
          {heading.type === 'family' ?
            <span className="font-league-spartan uppercase text-xs text-space-600">{heading.content}</span> : 
            <NavLink className={({isActive}) => isActive ? "group active" : "group"} to={`/journal${heading.content.route}`}>
              <div className="flex flex-row justify-start items-center">
                <span 
                  className={`
                  font-[Poppins] text-space-800 text-sm
                  border border-transparent px-2 py-1 my-1 w-full rounded-xl box-content cursor-pointer
                  hover:border hover:border-space-400 hover:bg-space-300 hover:shadow-md group-[.active]:text-space-900
                  `}>{heading.content.title}
                </span>
                <span className={`
                  font-[Poppins] text-md text-[var(--color-theme-100)] ml-auto hidden group-[.active]:inline
                `}>&gt;</span>
              </div>
            </NavLink>
          }
        </div>
      ))}
    </nav>
  )
}