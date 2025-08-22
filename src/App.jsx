import React from 'react'
import About from './components/About'
import Nav from './components/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Upload from './components/Upload'
import Result from './components/Result'
import Test from './components/Test'
import Signup from './components/Signup'


const App = () => {
  return (
    <div className='flex'>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload" element={<Upload/>} />
        <Route path="/result" element={<Result/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="/signup" element={<Signup/>} />
        
      </Routes>
    </div>
  )
}

export default App