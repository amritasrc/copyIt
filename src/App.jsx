import React from 'react'
import supabase from './lib/supabase'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/create" element={<CreateSnippet />} />
      <Route path="/snippet/:id" element={<ViewSnippet />} />
      <Route path='/edit' element={<EditSnippet />} /> */}
    </Routes>
  )
}

export default App