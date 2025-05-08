import React from 'react'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Recipe from './Pages/Recipe'
import About from './Pages/About'
import DisplayData from './components/DisplayData'
import Login from './components/Login'
import Signup from './components/Signup'
import Recipeimage from './components/Recipeimage'



const App = () => {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/menu/:category" element={<DisplayData />} />
            <Route path='/Recipe' element={<Recipe/>}/>
            <Route path='/About' element={<About/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Signup' element={<Signup/>}/>
            <Route path='/Recipeimage' element={<Recipeimage/>}/>
            <Route path="/recipe/:id" element={<Recipeimage />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App