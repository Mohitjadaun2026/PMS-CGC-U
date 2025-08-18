import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 
import App from './App.jsx'
import Usercontext from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Usercontext>
      <App />
    </Usercontext>
  </StrictMode>,
)
