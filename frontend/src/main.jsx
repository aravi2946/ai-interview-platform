import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import AIContextProvider from './Context/AI-Context.jsx'

createRoot(document.getElementById('root')).render(
  <AIContextProvider>
    <BrowserRouter>

      <App />
    </BrowserRouter>
  </AIContextProvider>

)
