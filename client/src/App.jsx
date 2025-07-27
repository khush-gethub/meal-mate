import React from 'react'
import Home from './Pages/Home'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Recipe from './Pages/Recipe'
import About from './Pages/About'
import DisplayData from './components/DisplayData'
import Login from './components/Login'
import Signup from './components/Signup'
import Recipeimage from './components/Recipeimage'
import ErrorPage from './Pages/ErrorPage'
import Recipedata from './components/Recipedata'
import { LikeProvider } from './context/LikeContext'
import FavoriteRecipePage from './Pages/FavoriteRecipePage'

const App = () => {
  return (
    <>
      <LikeProvider>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/menu/:category" element={<DisplayData />} />
            <Route path='/recipe' element={<Recipe />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/recipeimage' element={<Recipeimage />} />
            <Route path="/recipe/:id" element={<Recipeimage />} />
            <Route path="/recipe/:id/:type" element={<Recipedata />} />
            <Route path='/favorite' element={<FavoriteRecipePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </HashRouter>
      </LikeProvider>
    </>
  )
}

export default App