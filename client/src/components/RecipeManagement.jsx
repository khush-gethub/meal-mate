import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    ingredients: '',
    steps: '',
    type: '',
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/recipes');
      setRecipes(response.data);
    } catch (err) {
      setError('Failed to fetch recipes.');
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      const newRecipe = {
        ...formData,
        ingredients: formData.ingredients.split(',').map(item => item.trim()),
        steps: formData.steps.split(',').map(item => item.trim()),
      };
      await axios.post('http://localhost:8000/admin/recipes', newRecipe);
      setFormData({ title: '', image: '', description: '', ingredients: '', steps: '', type: '' });
      setShowAddForm(false);
      fetchRecipes();
    } catch (err) {
      setError('Failed to add recipe.');
      console.error('Error adding recipe:', err);
    }
  };

  const handleEditClick = (recipe) => {
    setCurrentRecipe(recipe);
    setFormData({
      title: recipe.title,
      image: recipe.image,
      description: recipe.description,
      ingredients: recipe.ingredients.join(', '),
      steps: recipe.steps.join(', '),
      type: recipe.type,
    });
    setShowAddForm(true);
  };

  const handleUpdateRecipe = async (e) => {
    e.preventDefault();
    try {
      const updatedRecipe = {
        ...formData,
        ingredients: formData.ingredients.split(',').map(item => item.trim()),
        steps: formData.steps.split(',').map(item => item.trim()),
        type: currentRecipe.type,
      };
      await axios.put(`http://localhost:8000/admin/recipes/${currentRecipe._id}`, updatedRecipe);
      setShowAddForm(false);
      setCurrentRecipe(null);
      setFormData({ title: '', image: '', description: '', ingredients: '', steps: '', type: '' });
      fetchRecipes();
    } catch (err) {
      setError('Failed to update recipe.');
      console.error('Error updating recipe:', err);
    }
  };

  const handleDeleteRecipe = async (recipeId, recipeType) => {
    if (window.confirm('Are you sure you want to delete this culinary masterpiece?')) {
      try {
        await axios.delete(`http://localhost:8000/admin/recipes/${recipeId}`, { data: { type: recipeType } });
        setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
      } catch (err) {
        setError('Failed to delete recipe.');
        console.error('Error deleting recipe:', err);
      }
    }
  };

  const handleViewClick = (recipeId, recipeType) => {
    navigate(`/recipe/${recipeId}/${recipeType}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-[#FFA94D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#4E342E] mb-2">Recipe Management</h1>
          <p className="text-[#4E342E]/60 font-medium italic">Curate and refine your global recipe collection.</p>
        </div>
        <button
          onClick={() => { setShowAddForm(!showAddForm); setCurrentRecipe(null); }}
          className="premium-gradient text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-[#FFA94D]/30 hover:scale-105 transition-all"
        >
          {showAddForm ? 'Close Editor' : 'Create New Recipe'}
        </button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#FFF6F0] p-10 rounded-[3rem] mb-12 border border-[#4E342E]/5">
              <h2 className="text-2xl font-black text-[#4E342E] mb-8">{currentRecipe ? 'Edit Recipe Details' : 'Design New Recipe'}</h2>
              <form onSubmit={currentRecipe ? handleUpdateRecipe : handleAddRecipe} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/40 mb-3 ml-1">Recipe Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-white border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all font-bold" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/40 mb-3 ml-1">Image URL</label>
                    <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full bg-white border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all font-bold" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/40 mb-3 ml-1">Recipe Category</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-white border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all font-bold" disabled={!!currentRecipe}>
                      <option value="">Select Category</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="seafood">Seafood</option>
                      <option value="dessert">Dessert</option>
                      <option value="chicken">Chicken</option>
                      <option value="general">General</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/40 mb-3 ml-1">Quick Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-white border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all font-bold" rows="1" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/40 mb-3 ml-1">Ingredients (Comma separated)</label>
                    <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} className="w-full bg-white border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all" rows="2" placeholder="Flour, Sugar, Eggs..." required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/40 mb-3 ml-1">Steps (Comma separated)</label>
                    <textarea name="steps" value={formData.steps} onChange={handleChange} className="w-full bg-white border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all" rows="2" placeholder="Mix, Bake, Serve..." required />
                  </div>
                </div>
                <div className="md:col-span-2 pt-4">
                  <button type="submit" className="w-full bg-[#4E342E] text-white font-black py-4 rounded-2xl shadow-xl hover:bg-black transition-all">
                    {currentRecipe ? 'Confirm Update' : 'Publish Recipe'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-4 mb-8">
        {['all', 'vegetarian', 'seafood', 'dessert', 'chicken', 'general'].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${activeCategory === category
              ? 'bg-[#FFA94D] text-white shadow-lg shadow-[#FFA94D]/30'
              : 'bg-white text-[#4E342E]/60 hover:bg-[#FFA94D]/10 hover:text-[#FFA94D]'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {['vegetarian', 'seafood', 'dessert', 'chicken', 'general'].map((category) => {
          if (activeCategory !== 'all' && activeCategory !== category) return null;

          const categoryRecipes = recipes.filter(r => r.type === category);

          if (categoryRecipes.length === 0) return null;

          return (
            <div key={category} className="bg-white rounded-[2.5rem] premium-shadow border border-[#4E342E]/5 overflow-hidden">
              <div className="px-8 py-6 bg-[#FFF6F0] border-b border-[#4E342E]/5 flex justify-between items-center">
                <h2 className="text-xl font-black text-[#4E342E] capitalize flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#FFA94D]" />
                  {category} Recipes
                </h2>
                <span className="px-3 py-1 bg-[#4E342E]/5 rounded-full text-xs font-bold text-[#4E342E]/60">
                  {categoryRecipes.length} Items
                </span>
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#FFF6F0]/50">
                    <th className="px-8 py-4 text-left text-xs font-bold text-[#4E342E]/40 uppercase tracking-[0.2em]">Recipe</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-[#4E342E]/40 uppercase tracking-[0.2em]">Category</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-[#4E342E]/40 uppercase tracking-[0.2em]">Preview</th>
                    <th className="px-8 py-4 text-right text-xs font-bold text-[#4E342E]/40 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4E342E]/5">
                  {categoryRecipes.map((recipe) => (
                    <tr key={recipe._id} className="hover:bg-[#FFF6F0]/30 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img src={recipe.image} className="w-12 h-12 rounded-xl object-cover shadow-sm" alt="" />
                          <span className="font-bold text-[#4E342E]">{recipe.title}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] bg-[#4E342E]/5 text-[#4E342E]">
                          {recipe.type}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-[#4E342E]/60 font-medium text-sm line-clamp-1 truncate max-w-[200px]">
                        {recipe.description}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3">
                          <button onClick={() => handleViewClick(recipe._id, recipe.type)} className="w-10 h-10 rounded-xl bg-[#FFA94D]/10 text-[#FFA94D] flex items-center justify-center hover:bg-[#FFA94D] hover:text-white transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                          <button onClick={() => handleEditClick(recipe)} className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button onClick={() => handleDeleteRecipe(recipe._id, recipe.type)} className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RecipeManagement;