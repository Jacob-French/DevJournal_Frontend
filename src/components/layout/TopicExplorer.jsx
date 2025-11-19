//Once the user selects a topic, the TopicExplorer navigates that topic

import { useParams } from "react-router"
import TopicNav from "../functional/explorer/ItemNav"
import { useApi } from "../../context/ApiContext"
import { useEffect, useMemo, useState } from "react"
import { useCheckMobileScreen } from "../../context/ScreenSizeContext"
import TopicNavMobile from "../functional/explorer/ItemNavMobile"
import Explorer from "../functional/explorer/Explorer"

export default function TopicExplorer(){
  
  const screen = useCheckMobileScreen()

  const api = useApi()
  const { topic } = useParams()

  const [headings, setHeadings] = useState(null)
  const headingsAndFamilies = useMemo(() => {
    return getHeadingsAndFamilies(headings)
  }, [headings])

  function getHeadingsAndFamilies(headings){
    if(headings){
      let lastFamily = null
      let headingsAndFamilies = []
      headings.forEach(heading => {
        if(heading.family !== lastFamily){
          lastFamily = heading.family
          headingsAndFamilies.push({type: 'family', content: heading.family})
        }
        headingsAndFamilies.push({type: 'heading', content: heading})
      })
      return headingsAndFamilies
    }
    else{
      return null
    }
  }

  useEffect(() => {
    api.getHeadingsByTopic(topic).then(response => {
      setHeadings(response)
    })
  }, [topic])
  
  return (
    <div className="text-space-600 border-emerald-400 h-full">
      {/*  ! screen &&  <TopicNav headings={headingsAndFamilies} /> */}
      {/* screen && <TopicNavMobile /> */}

      <Explorer items={headingsAndFamilies} isMobile={screen}>
        <p>
          This is a paragraph to test how the layout of content in this section will work. The purpose of this paragraph is to take up space in the main content section of the mobile topic explorer so that when I add the mobile menu in I can see how its presence affects the rest of the content such as this content right here.
        </p>
      </Explorer>
    </div>
  )
}