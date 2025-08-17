import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserContext from "./context/UserContext.jsx";
 
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </StrictMode>,
)
