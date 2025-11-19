import { useLocation } from "react-router"
import { useApi } from "../../../context/ApiContext"
import { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown'
import { ContentCode, ContentText, ContentTitle } from "./DynamicContent"
import TipsPanel from "./TipsPanel"

export default function ContentPanel({ title, tips }){

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
      relative w-full h-full
      border-sky-600 flex flex-row justify-start overflow-y-auto scrollbar-dark
    `}>
      <div className="pl-20 pr-10 md:pl-10 xl:pr-5">
        {content && content.map((item, id) => (
          <div key={id}>
            {item}
          </div>
        ))}
        <div className="h-10"></div>
      </div>
      <div className="w-90 shrink-0 h-full hidden relative xl:block"></div>
      <div className="w-90 bottom-0 top-18 right-3 fixed p-5 hidden xl:block">
        <TipsPanel tips={tips} />
      </div>
    </div>
  )
}