import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetailsPage = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Fetch all recipes and then filter by id and type
        const response = await axios.get('http://localhost:8000/admin/recipes');
        const foundRecipe = response.data.find(rec => rec.id === id && rec.type === type);
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
  }, [id, type]);

  if (loading) {
    return <div className="text-center text-[#4E342E]">Loading recipe details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!recipe) {
    return <div className="text-center text-[#4E342E]">Recipe not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">
      <button
        onClick={() => navigate(-1)}
        className="bg-[#FFA94D] text-[#4E342E] px-4 py-2 rounded-lg shadow-md hover:bg-[#FFE082] transition-colors duration-300 mb-6"
      >
        ← Back to Recipe Management
      </button>
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-[#4E342E] mb-4">{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-6" />
        <p className="text-gray-700 mb-4"><strong>Type:</strong> {recipe.type}</p>
        <p className="text-gray-700 mb-6">{recipe.description}</p>

        <h2 className="text-2xl font-semibold text-[#4E342E] mb-3">Ingredients:</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold text-[#4E342E] mb-3">Steps:</h2>
        <ol className="list-decimal list-inside text-gray-700">
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;