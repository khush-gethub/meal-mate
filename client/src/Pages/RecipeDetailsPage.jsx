import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const RecipeDetailsPage = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/recipes');
        const foundRecipe = response.data.find(rec => rec._id === id); // Use _id for MongoDB
        if (foundRecipe) {
          setRecipe(foundRecipe);
        } else {
          setError('Recipe not found.');
        }
      } catch (err) {
        setError('Failed to fetch recipe details.');
        console.error('Error fetching recipe details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-[#FFA94D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="p-12 bg-white rounded-[3rem] text-center">
        <h2 className="text-2xl font-black text-[#4E342E] mb-4">{error || 'Recipe not found'}</h2>
        <button onClick={() => navigate(-1)} className="text-[#FFA94D] font-bold">Return to Management</button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#4E342E]/60 font-bold hover:text-[#4E342E] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to List
        </button>
        <span className="px-6 py-2 bg-[#FFA94D]/10 rounded-full text-[#FFA94D] text-xs font-black uppercase tracking-widest border border-[#FFA94D]/20">
          {recipe.type} Category
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <img src={recipe.image} alt={recipe.title} className="w-full h-[400px] object-cover rounded-[2.5rem] shadow-xl" />
          <div className="bg-[#FFF6F0] p-10 rounded-[2.5rem] border border-[#4E342E]/5">
            <h3 className="text-xs font-black text-[#4E342E]/40 uppercase tracking-[0.2em] mb-4">Recipe Summary</h3>
            <p className="text-lg text-[#4E342E] font-medium leading-relaxed italic">"{recipe.description}"</p>
          </div>
        </div>

        <div className="space-y-12">
          <div>
            <h1 className="text-4xl font-poppins font-black text-[#4E342E] mb-2">{recipe.title}</h1>
            <p className="text-[#4E342E]/40 text-xs font-bold uppercase tracking-widest">Recipe ID: {recipe._id}</p>
          </div>

          <section>
            <h2 className="text-xl font-black text-[#4E342E] mb-6 flex items-center gap-3">
              <span className="w-6 h-1 bg-[#FFA94D] rounded-full" />
              Ingredients
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recipe.ingredients.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white border border-[#4E342E]/5 rounded-2xl shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-[#FFA94D]" />
                  <span className="font-bold text-[#4E342E]/80">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#4E342E] mb-6 flex items-center gap-3">
              <span className="w-6 h-1 bg-[#FFA94D] rounded-full" />
              Preparation Steps
            </h2>
            <div className="space-y-4">
              {recipe.steps.map((step, i) => (
                <div key={i} className="flex gap-4 p-5 bg-[#FFF6F0]/50 rounded-2xl border border-[#4E342E]/5">
                  <span className="font-black text-[#FFA94D] text-lg">{i + 1}.</span>
                  <p className="font-medium text-[#4E342E]/70 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeDetailsPage;