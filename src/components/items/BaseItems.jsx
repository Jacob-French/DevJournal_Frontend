import { NavLink } from "react-router"

const STRAPI_URL = 'http://localhost:1337'
const JOURNAL_ROUTE = '/journal'

export function JaLink({ children, to }){
  return (
    <div className="hover:-translate-y-1 transition-transform ease-in duration-300">
      <NavLink className={({isActive}) => isActive ? 
        "font-[Poppins] text-md text-[var(--color-theme-100)] font-light cursor-pointer" : 
        "font-[Poppins] text-md text-gray-100 font-light cursor-pointer"
      } to={to}>
        {children}
      </NavLink>
    </div>
  )
}

export function JaLogo(){
  return (
    <NavLink to='/journal'>
      <h1>
        <span className={`
          font-[Audiowide] text-xl font-normal text-gray-100
        `}><span className="font-semibold text-pink-400"> &lt; &gt; </span> Dev Journal</span>
      </h1>
    </NavLink>
  )
}

export function Topic({ topic }){
  return (
    <NavLink to={`${JOURNAL_ROUTE}${topic.route}`}>
      <div className={`
        w-30 h-30 flex flex-col items-center justify-center
        border border-space-400 bg-space-200 rounded-lg p-5 shadow-md
      `}>
        <div className="flex flex-col items-center gap-1">
          <img className="w-15 h-15" src={`${STRAPI_URL}${topic.icon.url}`} />
          <h2 className="font-[Poppins] text-md text-space-700">{topic.title}</h2>
        </div>
      </div>
    </NavLink>
  )
}