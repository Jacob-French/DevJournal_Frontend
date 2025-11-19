import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApiProvider } from './context/ApiContext.jsx'
import { BrowserRouter } from "react-router";
import { ScreenSizeProvider } from './context/ScreenSizeContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ApiProvider>
      <ScreenSizeProvider>
        <App />
      </ScreenSizeProvider>
    </ApiProvider>
  </BrowserRouter>
)
