import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { ToastProvider } from './contexts/ToastContext'
import { EmergencyProvider } from './contexts/EmergencyContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <EmergencyProvider>
          <App />
        </EmergencyProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
