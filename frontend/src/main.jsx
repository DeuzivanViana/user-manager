import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignIn } from './pages/sign-in'
import { Home } from './pages/home'
import { Dashboard } from './pages/dashboard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/sign-in' element={ <SignIn/> }/>
          <Route path='/dashboard' element={ <Dashboard/> }/>
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
