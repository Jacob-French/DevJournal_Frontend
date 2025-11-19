/*
  DESCRIPTION: 
  A navigation system for content organised into seperate headings. Headings can also be organised into families.

  DEPENDENCIES:
    (1) - React Router
      This component depends on the react router and should be inside the browser router tags. 

  PROPS: 
  (1) - items
    A list of headings or families to populate the navigation panel. It is structured as a list of objects like so: 
    {type: <heading / family>, content: <object representing heading or family>}
  (2) - route
    The route for the navigation links to use. eg, if you pass it '/react' and a heading has the route 'components' thent he link for that heading will route to /react/components
  (3) - isMobile
    Tells the component to use desktop or mobile layout.
  (4) - children
    The children of this component should be the content. This is so the content can be placed next to the nav bar for wide screens or behind the nav bar for narower mobile screens. The content will use routing to match up with the selected heading. 
*/

import { useNavigate } from "react-router";
import ContentPanel from "./ContentPanel";
import ItemNav from "./ItemNav";
import ItemNavMobile from "./ItemNavMobile";
import { useEffect, useState } from "react";
import ItemNavTipsMobile from "../mobileNav/ItemNavTipsMobile";
import { useApi } from "../../../context/ApiContext";


export default function Explorer({ items, isMobile }){

  const api = useApi()
  const navigate = useNavigate()
  const title = getTopicTitle()
  const [tips, setTips] = useState(null)

  function selectFirstHeading(){
    for(const item of items){
      if(item.type !== "family"){
        navigate(`/journal${item.content.route}`, { replace: true })
        break
      }
    }
  }

  function getTopicTitle(){
    const path = location.pathname
    const pathArray = path.split("/")
    return pathArray[2]
  }

  useEffect(() => {
    items && selectFirstHeading()
  }, [items])
    
  useEffect(() => {
    title && api.getTips(title).then(response => {
      console.log("tips: ", response)
      setTips(response)
    })
  }, [title])

  return (
    <div className="border-pink-300 w-full h-full flex flex-row justify-start relative">
      {! isMobile && Array.isArray(items) && <ItemNav items={items} title={title}></ItemNav>}
      {isMobile && Array.isArray(items) && <ItemNavTipsMobile items={items} title={title} tips={tips} ></ItemNavTipsMobile>}
      <ContentPanel title={title} tips={tips} />
    </div>
  )
}