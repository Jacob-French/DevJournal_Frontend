import { useCheckMobileScreen } from "../../../context/ScreenSizeContext"
import { CloseIcon } from "../../items/Icons"
import ReactMarkdown from 'react-markdown'

export default function TipsDisplay({ tip, close }){

  const mobileScreen = useCheckMobileScreen()

  return(
    <div className={`
      absolute left-0 top-0 right-0 bottom-0 border-emerald-400 z-200 backdrop-blur-sm
    `}>
      <div className={`
        absolute top-10 bottom-30 border border-space-300 bg-space-200
        rounded-md
        ${mobileScreen ? "left-70 right-10" : "left-10 right-65 xl:right-97"}
      `}>
        <div className="h-10 p-3 border-b border-b-space-300 flex flex-row justify-start items-center">
          <h1 className="font-[Poppins] text-space-800 text-sm mr-auto">{tip.title}</h1>
          <button className="w-7 h-7 flex flex-col justify-center items-center" onClick={close}>
            <CloseIcon className="w-4 h-4 cursor-pointer" />
          </button>
        </div>
        <div className="markdown px-3">
          <ReactMarkdown>
            {tip.content}
          </ReactMarkdown>
        </div>
      </div>

    </div>
  )
}