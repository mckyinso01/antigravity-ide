import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { ToastProvider } from './contexts/ToastContext'
import { EmergencyProvider } from './contexts/EmergencyContext'
import { AccessibilityProvider } from './contexts/AccessibilityContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AccessibilityProvider>
        <ToastProvider>
          <EmergencyProvider>
            <App />
          </EmergencyProvider>
        </ToastProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  </StrictMode>,
)
