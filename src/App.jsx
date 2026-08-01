import React from 'react'
import Navbar from './comps/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Footer from './comps/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className='flex-1'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App