import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './styles.css'

function App(){
  return (
    <BrowserRouter>
      <header className="topbar">
        <div className="brand">Capital CRM</div>
        <div>
          <Link to="/" className="link">Dashboard</Link>
          <Link to="/login" className="link">Login</Link>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App/>)
