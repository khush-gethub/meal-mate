import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import LikeContext from '../context/LikeContext'
import chicken from '../Data/chickenRecipes.json'
import seafood from '../Data/seafood-recipes.json'
import veg from '../Data/vegetarian-recipes.json'
import dessert from '../Data/dessert-recipes.json'
import rdata from '../Data/recipe-data.json'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const allData = [...chicken, ...seafood, ...veg, ...dessert, ...rdata]

const FavoriteRecipePage = () => {
  const { likedCards, removeLike } = useContext(LikeContext)

  const favoriteRecipes = allData.filter((recipe) => likedCards.includes(recipe.id))

  return (
    <>
      <Navbar />
      <div className="p-4 md:px-42 bg-[#FFF6F0] text-[#4E342E] min-h-screen mt-14 mb-16">
        <h1 className="text-4xl md:text-6xl font-semibold mb-8 font-poppins text-center md:text-left">
          Favorite Recipes
        </h1>

        {favoriteRecipes.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl mb-4">You haven't added any favorites yet!</h2>
            <p className="mb-6">Explore our recipes and click the heart icon to add them to your favorites.</p>
            <Link
              to="/Recipe"
              className="bg-[#FFA94D] hover:bg-[#FF9000] text-white px-6 py-3 rounded-lg transition"
            >
              Browse Recipes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 recipe-card"
              >
                <div className="select-none">
                  <div className="recipe-image">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">
                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="hover:text-orange-600 transition-colors"
                      >
                        {recipe.title}
                      </Link>
                    </h2>
                    <p className="text-gray-700">{recipe.description}</p>
                    <div className="flex justify-end">
                      <button
                        className="cursor-pointer relative"
                        onClick={() => removeLike(recipe.id)}
                      >
                        <svg
                          className="w-6 h-6 fill-[#FFA94D] stroke-[#FFA94D] transition duration-200"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 21C12 21 4 13.5455 4 8.72727C4 6.10048 6.01472 4 8.5 4C10.0706 4 11.5 5.09091 12 6.18182C12.5 5.09091 13.9294 4 15.5 4C17.9853 4 20 6.10048 20 8.72727C20 13.5455 12 21 12 21Z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default FavoriteRecipePage