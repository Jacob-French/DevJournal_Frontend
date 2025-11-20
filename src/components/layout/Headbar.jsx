import { useEffect, useState } from "react";
import { JaLink, JaLogo } from "../items/BaseItems";
import { MenuIcon } from "../items/Icons";
import { useLocation } from "react-router";


export default function Headbar({ pages }){

  const location = useLocation()
  const [mobileMenu, setMobileMenu] = useState(false)

  //fires whenever the route cahnges
  useEffect(() => {
    //hide mobile menu
    setMobileMenu(false)
  }, [location])

  function toggleMobileMenu(){
    setMobileMenu(prev => !prev)
  }

  return (
    <div className="z-500">
      <div className={`
        flex flex-row justify-start px-10 border-b border-space-300 py-[var(--sd-gap-small)] lg:py-[var(--sd-gap-mid)]
      `}>
        <div className="w-50 flex flex-col justify-center">
          <JaLogo />
        </div>
        <nav className="grow-1 flex-row justify-evenly items-center hidden lg:flex">
          {pages.map(page => (
            <div key={page.id}>
              <JaLink to={page.route}>{page.title}</JaLink>
            </div>
          ))}
        </nav>
        <button onClick={toggleMobileMenu} className="h-full ml-auto cursor-pointer lg:hidden">
          <MenuIcon className={mobileMenu ? "w-10 h-10 text-space-500" : "w-10 h-10 text-space-400"}/>
        </button>
      </div>
      {
        mobileMenu && <nav className={`
          flex flex-col items-end justify-start p-7 gap-[var(--sd-gap-small)] z-1000
          border border-space-300 rounded-md fixed right-[var(--sd-gap-mid)] mt-[var(--sd-gap-mid)] bg-space-200
          md:hidden  
        `}>
          {pages.map(page => (
            <div key={page.id}>
              <JaLink to={page.route}>{page.title}</JaLink>
            </div>
          ))}
        </nav>
      }
    </div>
  )
}