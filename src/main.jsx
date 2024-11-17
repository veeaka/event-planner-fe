import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from "./store/store"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App store={store} />
  </StrictMode>,
)
