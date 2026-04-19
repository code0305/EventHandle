import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserProvider from './provider/UserProvider.jsx'
import EventProvider from './provider/EventProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EventProvider>
    <UserProvider>
      <App />
    </UserProvider>
    </EventProvider>
  </StrictMode>,
)
