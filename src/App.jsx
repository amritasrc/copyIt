import React, { useEffect } from 'react'
import Navbar from './comps/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ViewSnippet from './pages/ViewSnippet'
import { useDispatch } from 'react-redux'
import authService from './lib/auth'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Footer from './comps/Footer'
import { Provider } from 'react-redux'
import store from './store/store'
import CreateSnippet from './pages/CreateSnippet'
import { login, logout } from './store/authSlice'

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        }
        else {
          dispatch(logout())
        }
      })
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <main className='flex-1'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/create' element={<CreateSnippet />} />
          <Route path="/snippet/:id" element={<ViewSnippet />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App