import { createContext, useContext, useState } from "react";
import useAxios from "../hooks/useAxios";

const apiContext = createContext()

const LOCAL_API_URL = 'http://localhost:1337'
const CLOUD_API_URL = 'https://useful-champion-009fa3a4da.strapiapp.com'

export function ApiProvider({children}){

  const [cloudApi, setCloudApi] = useState(false)
  let apiUrl = null
  apiUrl = cloudApi ? CLOUD_API_URL : LOCAL_API_URL

  //routes
  const PAGES = `${apiUrl}/api/pages`
  const TOPICS = `${apiUrl}/api/topics?sort[0]=title:asc&populate[0]=icon`
  const CONTENT = `${apiUrl}/api/contents`

  const { request: requestPages, loading: loadingPages, error: pagesError, cancel: cancelPages } = useAxios()
  const { request: requestTopics, loading: loadingTopics, error: topicsError, cancel: cancelTopics } = useAxios()
  const { request: requestHeadings, loading: loadingHeadings, error: headingsError, cancel: cancelHeadings } = useAxios()
  const { request: requestContent, loading: loadingContent, error: contentError, cancel: cancelContent } = useAxios()
  const { request: requestTips, loading: loadingTips, error: tipsError, cancel: cancelTips } = useAxios()
  
  const api = {
    url: apiUrl,
    getPages: async function(){
      const response = await requestPages(PAGES, {method: 'GET'})
      console.log("API request: pages")
      if(response){
        return response.data
      }
      else{
        return null
      }
    },
    getTopics: async function(){
      const response = await requestTopics(TOPICS, {method: 'GET'})
      console.log("API request: topics")
      if(response){
        return response.data
      }
      else{
        return null
      }
    },
    //PARAMETERS: ("topic name") RETURNS: list of headings
    getHeadingsByTopic: async function(topic){
      const headings = `${apiUrl}/api/headings?sort[0]=family_order:asc, order:asc, title:asc&filters[route][$startsWith]=/${topic}/`
      const response = await requestHeadings(headings, {method: 'GET'})
      console.log("API request: headings")
      if(response){
        return response.data
      }
      else{
        return null
      }
    },
    //PARAMETERS: ("route") RETURNS: Content object with a given route
    getContent: async function(route){
      const query = `${apiUrl}/api/contents?filters[route][$eq]=${route}&populate=*`
      const query2 = `${apiUrl}/api/contents?filters[route][$eq]=${route}&populate[content_zone][populate]=*`
      const response = await requestContent(query2, {method: 'GET'})
      console.log("API request: content")
      if(response){
        console.log("content data: ", response.data[0])
        return response.data[0]
      }
      else{
        return null
      }
    },
    getTips: async function(topic){
      const query = `${apiUrl}/api/tips?filters[topic][$eq]=${topic}&populate=*`
      const response = await requestTips(query, {method: 'GET'})
      console.log("API request: tips")
      if(response){
        return response.data
      }
      else{
        return null
      }
    },
    formatMediaUrl: function(url){
      if(cloudApi){
        return url
      }
      else{
        return `${LOCAL_API_URL}${url}`
      }
    }
  }

  return(
    <apiContext.Provider value={api}>
      {children}
    </apiContext.Provider>
  )
}

export function useApi(){
  const context = useContext(apiContext)

  if(!context){
    throw new Error("useApi must be used with in the ApiProvider")
  }

  return context
}