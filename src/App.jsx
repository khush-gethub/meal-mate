import React from 'react'
import { AuthProvider } from './context/AuthContext'
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
import AdminDashboard from './Pages/AdminDashboard'
import AdminRoute from './components/AdminRoute'
import UserManagement from './components/UserManagement'
import RecipeManagement from './components/RecipeManagement'
import RecipeDetailsPage from './Pages/RecipeDetailsPage'
import AddRecipePage from './Pages/AddRecipePage'
import ProfilePage from './Pages/ProfilePage'
import SearchResultsPage from './Pages/SearchResultsPage'
import MealPlanner from './Pages/MealPlanner'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <AuthProvider>
        <LikeProvider>
          <HashRouter>
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/menu/:category" element={<DisplayData />} />
              <Route path='/search' element={<SearchResultsPage />} />
              <Route path='/meal-planner' element={<MealPlanner />} />
              <Route path='/recipe' element={<Recipe />} />
              <Route path='/add-recipe' element={<AddRecipePage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/recipeimage' element={<Recipeimage />} />
              <Route path="/recipe/:id" element={<Recipeimage />} />
              <Route path="/recipe/:id/:type" element={<Recipedata />} />
              <Route path='/favorite' element={<FavoriteRecipePage />} />
              <Route
                path="/admin/*"
                element={<AdminRoute><AdminDashboard /></AdminRoute>}
              >
                <Route path="users" element={<UserManagement />} />
                <Route path="recipes" element={<RecipeManagement />} />
                <Route path="recipes/:type/:id" element={<RecipeDetailsPage />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </HashRouter>
        </LikeProvider>
      </AuthProvider>
    </>
  )
}

export default App