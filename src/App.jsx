import React from 'react'
import Navbar from './comps/Navbar'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <div className='min-h-screen w-full bg-zinc-950 text-zinc-100'>
        <Navbar />
      </div>
    </BrowserRouter>
  )
}

export default App