import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if (!window.__AUTH_OK) {
  document.title = '404 Not Found'
  createRoot(document.getElementById('root')).render(
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      background: '#f9fafb',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <div>
        <p style={{ fontSize: '6rem', fontWeight: 800, color: '#e5e7eb', lineHeight: 1 }}>404</p>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>Page not found</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>The page you're looking for doesn't exist.</p>
      </div>
    </div>
  )
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
