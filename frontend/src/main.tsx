import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from './pages/home'
import { SignUp } from './pages/sign-up'
import { SignIn } from './pages/sign-in'
import { Profile } from './pages/profile'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/sign-up' element={ <SignUp/> }/>
        <Route path='/sign-in' element={ <SignIn/> }/>
        <Route path='/profile' element={ <Profile/> }/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
