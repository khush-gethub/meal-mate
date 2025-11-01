import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    ingredients: '',
    steps: '',
    type: '', // Added type for new recipe creation
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
      setFormData({
        title: '',
        image: '',
        description: '',
        ingredients: '',
        steps: '',
        type: '',
      });
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
      type: recipe.type, // Ensure type is set for editing
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
        type: currentRecipe.type, // Add the type here
      };
      await axios.put(`http://localhost:8000/admin/recipes/${currentRecipe._id}`, updatedRecipe);
      setShowAddForm(false);
      setCurrentRecipe(null);
      setFormData({
        title: '',
        image: '',
        description: '',
        ingredients: '',
        steps: '',
        type: '',
      });
      fetchRecipes();
    } catch (err) {
      setError('Failed to update recipe.');
      console.error('Error updating recipe:', err);
    }
  };

  const handleDeleteRecipe = async (recipeId, recipeType) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
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
    navigate(`/admin/recipes/${recipeType}/${recipeId}`);
  };

  return (
    <div className="p-8 bg-[#F5F5F5] min-h-screen">
      {loading ? (
        <div className="text-center text-[#4E342E]">Loading recipes...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-[#4E342E] mb-6">Recipe Management</h1>
          <button
            onClick={() => { setShowAddForm(!showAddForm); setCurrentRecipe(null); setFormData({ title: '', image: '', description: '', ingredients: '', steps: '', type: '' }); }}
            className="bg-[#FFA94D] text-[#4E342E] px-4 py-2 rounded-lg shadow-md hover:bg-[#FFE082] transition-colors duration-300 mb-6"
          >
            {showAddForm ? 'Cancel' : 'Add New Recipe'}
          </button>

          {showAddForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold text-[#4E342E] mb-4">{currentRecipe ? 'Edit Recipe' : 'Add New Recipe'}</h2>
              <form onSubmit={currentRecipe ? handleUpdateRecipe : handleAddRecipe} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF3C4]"
                  required
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF3C4]"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF3C4]"
                  rows="3"
                  required
                ></textarea>
                <input
                  type="text"
                  name="ingredients"
                  placeholder="Ingredients (comma-separated)"
                  value={formData.ingredients}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF3C4]"
                  required
                />
                <input
                  type="text"
                  name="steps"
                  placeholder="Steps (comma-separated)"
                  value={formData.steps}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF3C4]"
                  required
                />
                {/* Add a select for recipe type when adding a new recipe */}
                {!currentRecipe && (
                  <select
                    name="type"
                    value={formData.type || ''}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF3C4]"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="seafood">Seafood</option>
                    <option value="dessert">Dessert</option>
                    <option value="chicken">Chicken</option>
                    <option value="general">General</option>
                  </select>
                )}
                <button
                  type="submit"
                  className="bg-[#FFF3C4] text-[#4E342E] px-4 py-2 rounded-lg shadow-md hover:bg-[#FFE082] transition-colors duration-300"
                >
                  {currentRecipe ? 'Update Recipe' : 'Add Recipe'}
                </button>
              </form>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#FFF3C4]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recipes.map((recipe) => (
                  <tr key={recipe._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{recipe.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recipe.description.substring(0, 50)}...</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recipe.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewClick(recipe._id, recipe.type)}
                        className="text-blue-600 hover:text-blue-900 ml-4"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditClick(recipe)}
                        className="text-[#FFA94D] hover:text-[#FFE082] ml-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRecipe(recipe._id, recipe.type)}
                        className="text-red-600 hover:text-red-900 ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeManagement;