import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  //Strict-mode behøver ikke at være her, den kan gøre sådan, at den double-renderer, så man kan godt slukke for den, når man er i development
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
