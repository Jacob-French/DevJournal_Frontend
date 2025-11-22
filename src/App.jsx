import { useEffect, useState } from 'react'
import axios from 'axios';

import './App.css'
import useAxios from './hooks/useAxios';
import { useApi } from './context/ApiContext';
import Headbar from './components/layout/Headbar';
import TailwindPlanner from './components/TailwindPlanner';
import { Route, Routes } from 'react-router';
import TopicManager from './components/layout/TopicManager';
import TopicExplorer from './components/layout/TopicExplorer';

function App() {

  const api = useApi()

  const [pages, setPages] = useState([])
  const [topics, setTopics] = useState(null)

  useEffect(() => {
    api.getPages().then((response) => {
      setPages(response)
    })
    api.getTopics().then(response => {
      setTopics(response)
    })
  }, [])

  return (
    <div className="h-screen bg-pink-400">
      <div className="bg-space-100 border-amber-300 h-screen flex flex-col">
        {pages && <Headbar pages={pages} />}

        <div className="border-pink-400 flex-1 min-h-0">
          <Routes>
            <Route path="/journal" element={<TopicManager topics={topics}/>} />
            <Route path="/journal/:topic/*" element={<TopicExplorer />} /> 
            <Route path="/design-planner" element={<TailwindPlanner />} />
          </Routes>
        </div>
        
      </div>
    </div>
  )
}

export default App
