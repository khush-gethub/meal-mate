import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LikeContext from '../context/LikeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const FavoriteRecipePage = ({ type }) => {
  const { likedCards, removeLike } = useContext(LikeContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const [generalRes, chickenRes, vegRes, seafoodRes, dessertRes] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/general`),
          axios.get(`http://127.0.0.1:8000/chicken`),
          axios.get(`http://127.0.0.1:8000/vegetarian`),
          axios.get(`http://127.0.0.1:8000/seafood`),
          axios.get(`http://127.0.0.1:8000/dessert`),
        ]);

        const allData = [
          ...(chickenRes.data.map(item => ({ ...item, type: 'chicken' })) || []),
          ...(seafoodRes.data.map(item => ({ ...item, type: 'seafood' })) || []),
          ...(vegRes.data.map(item => ({ ...item, type: 'vegetarian' })) || []),
          ...(dessertRes.data.map(item => ({ ...item, type: 'dessert' })) || []),
          ...(generalRes.data.map(item => ({ ...item, type: 'general' })) || []),
        ];

        const favoriteItems = allData.filter((recipe) =>
          likedCards.includes(recipe.id)
        );
        setFavoriteRecipes(favoriteItems);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      }
    };

    if (likedCards.length > 0) {
      fetchFavoriteRecipes();
    } else {
      setFavoriteRecipes([]);
    }
  }, [likedCards]);

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
                  <Link to={`/recipe/${recipe._id}/${recipe.type}`} key={recipe._id}
                    className="hover:text-orange-600 transition-colors">
                    <div className="recipe-image">

                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>

                  </Link>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">

                      {recipe.title}
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