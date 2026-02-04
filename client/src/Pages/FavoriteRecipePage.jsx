import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LikeContext from '../context/LikeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const FavoriteRecipePage = () => {
  const { likedCards, removeLike } = useContext(LikeContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    if (likedCards.length > 0) {
      fetchFavoriteRecipes();
    } else {
      setFavoriteRecipes([]);
      setLoading(false);
    }
  }, [likedCards]);

  const handleCardClick = (id, type) => {
    if (user) {
      navigate(`/recipe/${id}/${type}`);
    } else {
      toast.error('Please login to view recipe details.');
      navigate('/login');
    }
  };

  return (
    <div className="bg-[#FFF6F0] min-h-screen">
      <Navbar />

      {/* Header Section */}
      <div className="pt-32 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#FFA94D] font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            My Collection
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-poppins font-black text-[#4E342E]">
            Favorite <span className="text-gradient">Recipes</span>
          </h1>
        </div>
      </div>

      <div className="pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#FFA94D] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : favoriteRecipes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 glass-effect rounded-[3rem] premium-shadow border-white/20"
            >
              <div className="text-8xl mb-6">❤️</div>
              <h2 className="text-3xl font-black text-[#4E342E] mb-4">No Favorites Yet</h2>
              <p className="text-[#4E342E]/60 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                Explore our world-class recipes and save your favorites to access them anytime.
              </p>
              <Link
                to="/recipe"
                className="inline-block premium-gradient text-white px-10 py-4 rounded-2xl font-black text-lg shadow-lg shadow-[#FFA94D]/30 hover:scale-105 transition-all"
              >
                Start Exploring
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence>
                {favoriteRecipes.map((recipe, index) => (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-[2.5rem] overflow-hidden premium-shadow hover:shadow-2xl transition-all duration-500 border border-[#4E342E]/5"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#4E342E]/60 to-transparent" />

                      {/* Unlike Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeLike(recipe.id);
                        }}
                        className="absolute top-6 right-6 w-12 h-12 glass-effect rounded-2xl flex items-center justify-center text-[#FFA94D] hover:bg-white transition-all shadow-lg"
                      >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                          <path d="M12 21C12 21 4 13.5455 4 8.72727C4 6.10048 6.01472 4 8.5 4C10.0706 4 11.5 5.09091 12 6.18182C12.5 5.09091 13.9294 4 15.5 4C17.9853 4 20 6.10048 20 8.72727C20 13.5455 12 21 12 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      <div className="absolute bottom-6 left-6">
                        <span className="glass-effect text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">
                          {recipe.type}
                        </span>
                      </div>
                    </div>

                    <div className="p-10">
                      <h2 className="text-2xl font-black text-[#4E342E] mb-4 group-hover:text-[#FFA94D] transition-colors">
                        {recipe.title}
                      </h2>
                      <p className="text-[#4E342E]/60 leading-relaxed line-clamp-2 mb-8 font-medium">
                        {recipe.description}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-[#4E342E]/5">
                        <button
                          onClick={() => handleCardClick(recipe.id, recipe.type)}
                          className="text-[#4E342E] font-black uppercase text-xs tracking-[0.2em] flex items-center gap-2 group-hover:text-[#FFA94D] transition-colors"
                        >
                          View Recipe <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavoriteRecipePage;