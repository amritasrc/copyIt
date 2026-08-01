import React from 'react'
import Navbar from './comps/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Footer from './comps/Footer'
import { Provider } from 'react-redux'
import store from './store/store'
import CreateSnippet from './pages/CreateSnippet'

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <main className='flex-1'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/create' element={<CreateSnippet />} />
          </Routes>
        </main>
        <Footer />
      </Provider>
    </BrowserRouter>
  )
}

export default App