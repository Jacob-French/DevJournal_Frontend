import { useLocation } from "react-router"
import { useApi } from "../../../context/ApiContext"
import { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown'
import { ContentCode, ContentCodeLines, ContentImage, ContentImageText, ContentLine, ContentText, ContentTitle } from "./DynamicContent"
import TipsPanel from "./TipsPanel"
import TipsDisplay from "./TipsDisplay"

export default function ContentPanel({ title, tips, displayTip }){

  const api = useApi()
  const location = useLocation()
  const [content, setContent] = useState(null)

  const test = <ContentText />

  function getContentRoute(){
    const path = location.pathname
    const term = "journal"
    const index = path.indexOf(term)
    const contentRoute = path.slice(index + term.length)
    return contentRoute
  }

  function buildContentComponents(content_zone){
    const contentArray = []

    content_zone.forEach(item => {
      switch (item.__component){
        case "content-blocks.title":
          contentArray.push(<ContentTitle content={item} />)
          break
        case "content-blocks.text":
          contentArray.push(<ContentText content={item} />)
          break
        case "content-blocks.code":
          contentArray.push(<ContentCode content={item} />)
          break
        case "content-blocks.image":
          contentArray.push(<ContentImage content={item} />)
          break
        case "content-blocks.image-and-text":
          contentArray.push(<ContentImageText content={item} />)
          break
        case "content-blocks.code-lines":
          contentArray.push(<ContentCodeLines content={item} />)
          break
        case "content-blocks.line":
           contentArray.push(<ContentLine />)
        default: 
        console.log("content: ", item.__component)
      }
    })

    return contentArray
  }

  useEffect(() => {
    const route = getContentRoute()
    
    api.getContent(route).then(response => {
      if(response && 'content_zone' in response){
        setContent(buildContentComponents(response.content_zone))
      }
      else{
        setContent([])
      }
    })
  }, [location])

  return (
    <div className={`
      relative w-full h-full bg-space-100
      border-sky-600 flex flex-row justify-start overflow-y-auto scrollbar-dark
    `}>
      <div className="pl-20 pr-10 lg:pl-10 lg:pr-5 min-w-0 border-pink-200">
        {content && content.map((item, id) => (
          <div key={id}>
            {item}
          </div>
        ))}
        <div className="h-10"></div>
      </div>
      <div className="w-60 xl:w-90 shrink-0 h-full hidden relative lg:block"></div>
      <div className="w-60 xl:w-90 bottom-0 top-18 right-3 fixed p-5 hidden lg:block z-300">
        <TipsPanel tips={tips} displayTip={displayTip} />
      </div>
    </div>
  )
}