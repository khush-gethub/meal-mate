# MealMate - Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [Component Architecture](#component-architecture)
4. [Routing Structure](#routing-structure)
5. [State Management](#state-management)
6. [Data Management](#data-management)
7. [UI/UX Design](#uiux-design)
8. [Performance Considerations](#performance-considerations)
9. [Accessibility Implementation](#accessibility-implementation)
10. [Development Workflow](#development-workflow)
11. [Testing Strategy](#testing-strategy)
12. [Build and Deployment](#build-and-deployment)
13. [Future Improvements](#future-improvements)
14. [Design Decisions](#design-decisions)
15. [Troubleshooting Guide](#troubleshooting-guide)
16. [Code Conventions](#code-conventions)
17. [References and Resources](#references-and-resources)

## Project Overview

MealMate is a comprehensive React-based recipe sharing platform built with Vite. The application allows users to browse recipes across different categories, view detailed recipe information, and save their favorite recipes. The project demonstrates modern React development practices including component composition, context API for state management, responsive design principles, and accessibility considerations.

### Project Goals

- Create a visually appealing and user-friendly recipe browsing experience
- Implement modern React patterns and best practices
- Demonstrate proficiency with frontend technologies
- Showcase responsive design and accessibility implementation
- Provide a solid foundation for potential future expansion

### Target Audience

- Home cooks looking for recipe inspiration
- Food enthusiasts exploring different cuisines
- Portfolio reviewers and potential employers
- Frontend developers interested in React implementation patterns

### Key Features Summary

- Recipe browsing by category
- Detailed recipe views with ingredients and instructions
- Favorites system with local storage persistence
- Responsive design for all device sizes
- Animated UI elements for enhanced user experience
- Authentication UI (frontend implementation only)

## Technical Architecture

### Technology Stack Overview

MealMate is built using a modern frontend technology stack:

- **Frontend Framework**: React 19
- **Build Tool**: Vite 6
- **Routing**: React Router 7
- **State Management**: React Context API
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **Data Storage**: Local JSON files, localStorage

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │    Pages    │  │  Components │  │     UI Elements     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                     Application Logic                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Routing   │  │    State    │  │   Event Handlers    │  │
│  │  (Router)   │  │  (Context)  │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                        Data Layer                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  JSON Data  │  │ LocalStorage│  │    Data Fetching    │  │
│  │   Files     │  │             │  │    (Future API)     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure

The project follows a feature-based organization pattern:

```
recipe-sem-5/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images and SVGs
│   ├── components/        # Reusable UI components
│   ├── context/           # Context providers
│   ├── Data/              # JSON data files
│   ├── Pages/             # Page components
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── .gitignore             # Git ignore file
├── DOCUMENTATION.md       # Technical documentation
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── LICENSE                # MIT License
├── package.json           # Project dependencies and scripts
├── README.md              # Project overview
└── vite.config.js         # Vite configuration
```

### Technical Dependencies

The application relies on the following key dependencies:

- **react** (v19.0.0): Core UI library
- **react-dom** (v19.0.0): React rendering for web
- **react-router-dom** (v7.5.2): Routing library
- **framer-motion** (v12.10.5): Animation library
- **@headlessui/react** (v2.2.1): Accessible UI components
- **@heroicons/react** (v2.2.0): Icon library
- **tailwindcss** (v4.1.4): Utility-first CSS framework

## Component Architecture

The application follows a component-based architecture with a focus on reusability, separation of concerns, and clear component hierarchies.

### Component Hierarchy

```
App
├── LikeProvider (Context)
├── BrowserRouter
│   └── Routes
│       ├── Home
│       │   ├── Navbar
│       │   ├── Hero
│       │   │   └── BackgroundCarousel
│       │   ├── RecipeCategories
│       │   ├── HowItWorks
│       │   ├── Higthretting
│       │   └── Footer
│       ├── DisplayData
│       │   ├── Navbar
│       │   ├── Category
│       │   │   └── Cards
│       │   └── Footer
│       ├── Recipe
│       │   ├── Navbar
│       │   ├── RecipeCategories
│       │   └── Footer
│       ├── About
│       │   ├── Navbar
│       │   ├── AboutHero
│       │   ├── History
│       │   ├── CTASection
│       │   └── Footer
│       ├── Login
│       ├── Signup
│       ├── Recipeimage
│       ├── Recipedata
│       ├── FavoriteRecipePage
│       │   ├── Navbar
│       │   ├── Cards (for favorites)
│       │   └── Footer
│       └── ErrorPage
```

### Core Components

#### Layout Components

- **Navbar** (`Navbar.jsx`): Main navigation component with responsive design
  - Implements mobile menu with Headless UI
  - Handles navigation links and authentication UI
  - Adapts layout based on screen size
  - Code snippet:
  ```jsx
  // Responsive navigation toggle
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop navigation */}
        <div className="hidden md:block">...</div>
        
        {/* Mobile navigation */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <XMarkIcon /> : <Bars3Icon />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Mobile navigation links */}
          </div>
        </div>
      )}
    </nav>
  );
  ```

- **Footer** (`Footer.jsx`): Site-wide footer with links and information
  - Responsive grid layout
  - Contains links to key site sections
  - Includes social media links and copyright information

- **Hero** (`Hero.jsx`): Landing page hero section with background carousel
  - Uses BackgroundCarousel for animated background
  - Contains main call-to-action elements
  - Implements responsive text sizing

- **AnimatedSection** (`AnimatedSection.jsx`): Reusable component for animated content sections
  - Uses Framer Motion for scroll-triggered animations
  - Accepts children components for flexible content
  - Example implementation:
  ```jsx
  import { motion } from 'framer-motion';
  
  const AnimatedSection = ({ children, delay = 0.2 }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    );
  };
  ```

#### Feature Components

- **DisplayData** (`DisplayData.jsx`): Handles the display of recipe data by category
  - Fetches and filters recipe data based on URL parameters
  - Implements grid layout for recipe cards
  - Handles loading states and empty results

- **Cards** (`Cards.jsx`): Reusable card component for displaying recipe previews
  - Consistent styling for recipe cards
  - Handles like/favorite functionality
  - Implements hover effects and transitions
  - Key implementation:
  ```jsx
  import { useLikeContext } from '../context/LikeContext';
  
  const Cards = ({ recipe }) => {
    const { likedRecipes, toggleLike } = useLikeContext();
    const isLiked = likedRecipes.some(item => item.id === recipe.id);
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{recipe.title}</h3>
          <p className="text-gray-600">{recipe.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">{recipe.prepTime} prep</span>
            <button 
              onClick={() => toggleLike(recipe)}
              className={`p-2 rounded-full ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
            >
              <HeartIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  };
  ```

- **Category** (`Category.jsx`): Component for displaying and filtering recipe categories
  - Tab-based interface for category selection
  - Handles active state for selected category
  - Communicates with parent components for filtering

- **Recipeimage** (`Recipeimage.jsx`): Displays detailed view of a recipe with image
  - Responsive layout for recipe details
  - Handles image loading and fallbacks
  - Displays recipe metadata (prep time, servings, etc.)

- **Recipedata** (`Recipedata.jsx`): Handles the display of recipe details and instructions
  - Structured layout for ingredients and instructions
  - Step-by-step instruction formatting
  - Implements print functionality

#### Authentication Components

- **Login** (`Login.jsx`): User login form with validation
  - Form validation with error handling
  - Responsive design for all screen sizes
  - Social login options (UI only)
  - Implementation details:
  ```jsx
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, this would connect to a backend
      console.log('Form submitted:', formData);
    }
  };
  ```

- **Signup** (`Signup.jsx`): User registration form with validation
  - Comprehensive form validation
  - Password strength requirements
  - Terms and conditions acceptance

#### Page Components

- **Home** (`Home.jsx`): Landing page with hero section and featured content
  - Assembles multiple components for the homepage
  - Implements page layout and component spacing
  - Simple implementation:
  ```jsx
  import React from 'react';
  import Navbar from '../components/Navbar';
  import Hero from '../components/Hero';
  import RecipeCategories from '../components/RecipeCategories';
  import HowItWorks from '../components/HowItWorks';
  import Higthretting from '../components/Higthretting';
  import Footer from '../components/Footer';

  const Home = () => {
    return (
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <RecipeCategories />
        <HowItWorks />
        <Higthretting />
        <Footer />
      </div>
    );
  };

  export default Home;
  ```

- **Recipe** (`Recipe.jsx`): Main recipe browsing page
  - Container for recipe browsing functionality
  - Implements filtering and sorting options

- **About** (`About.jsx`): About page with company information
  - Company history and mission statement
  - Team information and values
  - Contact information

- **FavoriteRecipePage** (`FavoriteRecipePage.jsx`): Displays user's saved favorite recipes
  - Retrieves favorites from context
  - Handles empty state when no favorites exist
  - Implements grid layout for favorite recipes

- **ErrorPage** (`ErrorPage.jsx`): Custom 404 page for handling navigation errors
  - User-friendly error messaging
  - Navigation options to return to valid pages
  - Animated illustrations

### Component Communication Patterns

The application uses several patterns for component communication:

1. **Props**: For parent-to-child communication
2. **Context API**: For global state management (favorites)
3. **URL Parameters**: For page-specific data (recipe IDs, categories)
4. **Custom Events**: For specific interaction patterns
5. **Composition**: For flexible component structures

### Component Lifecycle Management

React hooks are used to manage component lifecycle:

- **useState**: For local component state
- **useEffect**: For side effects and lifecycle events
- **useContext**: For accessing context values
- **useParams**: For accessing URL parameters
- **useNavigate**: For programmatic navigation
- **useMemo/useCallback**: For performance optimization

## Routing Structure

The application uses React Router v7 for navigation with a declarative routing approach.

### Route Configuration

The main routing configuration is defined in `App.jsx`:

```jsx
<Routes>
  <Route path='/' element={<Home />} />
  <Route path="/menu/:category" element={<DisplayData />} />
  <Route path='/recipe' element={<Recipe />} />
  <Route path='/about' element={<About />} />
  <Route path='/login' element={<Login />} />
  <Route path='/signup' element={<Signup />} />
  <Route path='/recipeimage' element={<Recipeimage />} />
  <Route path="/recipe/:id" element={<Recipeimage />} />
  <Route path="/recipe/:category/:id" element={<Recipedata />} />
  <Route path='/favorite' element={<FavoriteRecipePage />} />
  <Route path="*" element={<ErrorPage />} />
</Routes>
```

### Detailed Route Descriptions

- **Home Route** (`/`):
  - Landing page with featured content
  - Entry point for user journey
  - Contains hero section, category previews, and featured recipes

- **Category Menu Route** (`/menu/:category`):
  - Dynamic route that displays recipes filtered by category
  - Uses URL parameter to determine which category to display
  - Implementation:
  ```jsx
  import { useParams } from 'react-router-dom';
  
  function DisplayData() {
    const { category } = useParams();
    // Use the category parameter to filter recipes
    // ...
  }
  ```

- **Recipe Route** (`/recipe`):
  - General recipe browsing page
  - Entry point for exploring all recipes
  - Contains filtering and sorting options

- **About Route** (`/about`):
  - Static page with company information
  - Contains mission statement, history, and team information

- **Authentication Routes** (`/login`, `/signup`):
  - User authentication pages
  - Frontend implementation only (no actual authentication)
  - Form validation and UI feedback

- **Recipe Detail Routes**:
  - `/recipeimage`: General recipe image view
  - `/recipe/:id`: Detailed view of a specific recipe by ID
  - `/recipe/:category/:id`: Detailed view within a category context

- **Favorites Route** (`/favorite`):
  - Displays user's saved favorite recipes
  - Retrieves data from LikeContext
  - Handles empty state when no favorites exist

- **Error Route** (`*`):
  - Catch-all route for handling 404 errors
  - User-friendly error page with navigation options

### Navigation Implementation

Navigation is implemented using React Router's hooks and components:

- **Link Component**: For declarative navigation
  ```jsx
  <Link to="/recipe" className="nav-link">Recipes</Link>
  ```

- **useNavigate Hook**: For programmatic navigation
  ```jsx
  const navigate = useNavigate();
  
  const handleCardClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };
  ```

- **useParams Hook**: For accessing URL parameters
  ```jsx
  const { id, category } = useParams();
  ```

### Route Guards and Protection

The application implements basic route protection patterns:

- **Conditional Rendering**: Based on state or props
- **Redirect Pattern**: For unauthorized access attempts

## State Management

### Context API Implementation

The application uses React's Context API for state management, primarily for the favorites/likes functionality:

#### LikeContext Implementation

```jsx
// src/context/LikeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  // Initialize state from localStorage or empty array
  const [likedRecipes, setLikedRecipes] = useState(() => {
    const saved = localStorage.getItem('likedRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  // Update localStorage when likedRecipes changes
  useEffect(() => {
    localStorage.setItem('likedRecipes', JSON.stringify(likedRecipes));
  }, [likedRecipes]);

  // Toggle like status for a recipe
  const toggleLike = (recipe) => {
    setLikedRecipes(prev => {
      const isLiked = prev.some(item => item.id === recipe.id);
      
      if (isLiked) {
        // Remove from likes
        return prev.filter(item => item.id !== recipe.id);
      } else {
        // Add to likes
        return [...prev, recipe];
      }
    });
  };

  return (
    <LikeContext.Provider value={{ likedRecipes, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

// Custom hook for using the context
export const useLikeContext = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('useLikeContext must be used within a LikeProvider');
  }
  return context;
};
```

#### Context Usage in Components

```jsx
// In a component
import { useLikeContext } from '../context/LikeContext';

function RecipeCard({ recipe }) {
  const { likedRecipes, toggleLike } = useLikeContext();
  const isLiked = likedRecipes.some(item => item.id === recipe.id);
  
  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <button 
        onClick={() => toggleLike(recipe)}
        className={isLiked ? 'liked' : ''}
      >
        {isLiked ? 'Remove from favorites' : 'Add to favorites'}
      </button>
    </div>
  );
}
```

### Local Component State

For component-specific state, the application uses React's useState hook:

```jsx
// Form state example
const [formData, setFormData] = useState({
  email: '',
  password: '',
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};
```

### State Persistence

The application uses localStorage for persisting user preferences:

- **Favorites/Likes**: Stored in localStorage and retrieved on application load
- **Theme Preferences**: (Potential future implementation)
- **User Settings**: (Potential future implementation)

## Data Management

### Data Sources

Recipe data is stored in JSON files in the `src/Data` directory:

- `chickenRecipes.json`: Chicken recipes
- `dessert-recipes.json`: Dessert recipes
- `recipe-data.json`: General recipes
- `seafood-recipes.json`: Seafood recipes
- `vegetarian-recipes.json`: Vegetarian recipes

### Data Structure

Each recipe object follows a consistent structure:

```json
{
  "id": "recipe-001",
  "title": "Garlic Butter Chicken",
  "image": "https://example.com/images/garlic-butter-chicken.jpg",
  "description": "Juicy chicken thighs cooked in a rich garlic butter sauce.",
  "ingredients": [
    "4 chicken thighs",
    "4 tbsp butter",
    "6 cloves garlic, minced",
    "1 tsp dried thyme",
    "1 tsp dried rosemary",
    "Salt and pepper to taste",
    "2 tbsp fresh parsley, chopped"
  ],
  "instructions": [
    "Season chicken thighs with salt and pepper.",
    "Heat a large skillet over medium-high heat.",
    "Add chicken thighs skin-side down and cook until golden brown, about 5-7 minutes.",
    "Flip chicken and cook for another 5 minutes.",
    "Reduce heat to medium-low, add butter and garlic.",
    "Add herbs and cook until chicken is cooked through, about 10-12 minutes.",
    "Garnish with fresh parsley before serving."
  ],
  "prepTime": "10 minutes",
  "cookTime": "25 minutes",
  "servings": 4,
  "category": "chicken",
  "difficulty": "easy",
  "calories": 320,
  "tags": ["dinner", "high-protein", "low-carb"]
}
```

### Data Loading and Fetching

Data is imported directly in components that need it:

```jsx
import chickenRecipes from '../Data/chickenRecipes.json';
import dessertRecipes from '../Data/dessert-recipes.json';
import seafoodRecipes from '../Data/seafood-recipes.json';
import vegetarianRecipes from '../Data/vegetarian-recipes.json';

// Combine all recipes for general browsing
const allRecipes = [
  ...chickenRecipes,
  ...dessertRecipes,
  ...seafoodRecipes,
  ...vegetarianRecipes
];
```

### Data Filtering and Manipulation

The application implements several data manipulation patterns:

- **Category Filtering**: Filter recipes by category
  ```jsx
  const filteredRecipes = allRecipes.filter(recipe => recipe.category === selectedCategory);
  ```

- **Search Functionality**: Filter recipes by search term
  ```jsx
  const searchResults = allRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  ```

- **Sorting**: Sort recipes by various criteria
  ```jsx
  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'prepTime') {
      return parseInt(a.prepTime) - parseInt(b.prepTime);
    }
    // Additional sorting options
  });
  ```

## UI/UX Design

### Design System

The application implements a consistent design system using Tailwind CSS:

- **Color Palette**:
  - Primary: Shades of green (#10B981)
  - Secondary: Warm orange (#F97316)
  - Neutrals: Gray scale from #F9FAFB to #111827
  - Accents: Red (#EF4444) for favorites, Blue (#3B82F6) for links

- **Typography**:
  - Headings: Inter, sans-serif
  - Body: Inter, sans-serif
  - Font sizes: Following a modular scale (16px base)

- **Spacing**:
  - Based on a 4px grid system
  - Consistent padding and margins

- **Shadows**:
  - Card shadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
  - Elevated elements: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`

- **Border Radius**:
  - Small: 4px
  - Medium: 8px
  - Large: 12px
  - Full: 9999px (for pills and circles)

### Responsive Design Implementation

The application is fully responsive, adapting to different screen sizes:

- **Mobile First Approach**: Base styles for mobile, then enhanced for larger screens
- **Breakpoints**:
  - Small (sm): 640px
  - Medium (md): 768px
  - Large (lg): 1024px
  - Extra Large (xl): 1280px
  - 2XL: 1536px

- **Responsive Layout Techniques**:
  - Flexbox for one-dimensional layouts
  - CSS Grid for two-dimensional layouts
  - Tailwind responsive utilities

Example responsive implementation:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {recipes.map(recipe => (
    <Cards key={recipe.id} recipe={recipe} />
  ))}
</div>
```

### Animation and Transitions

The application uses Framer Motion for animations:

- **Page Transitions**: Smooth transitions between pages
- **Hover Effects**: Interactive feedback on hoverable elements
- **Scroll Animations**: Elements animate as they enter the viewport
- **Loading States**: Animated loading indicators

Example animation implementation:
```jsx
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const RecipeGrid = ({ recipes }) => {
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {recipes.map(recipe => (
        <motion.div key={recipe.id} variants={item}>
          <Cards recipe={recipe} />
        </motion.div>
      ))}
    </motion.div>
  );
};
```

### Key UI Components

- **BackgroundCarousel**: Animated background carousel for the hero section
  - Auto-advancing slides with crossfade transitions
  - Responsive image handling
  - Overlay text with consistent positioning

- **Cards**: Consistent card design for recipe previews
  - Hover effects for interactive feedback
  - Consistent spacing and typography
  - Like button integration

- **HowItWorks**: Step-by-step guide section
  - Numbered steps with icons
  - Clear visual hierarchy
  - Responsive layout adjustments

- **CTASection**: Call-to-action sections for user engagement
  - High-contrast design for attention
  - Clear action buttons
  - Responsive padding and spacing

## Performance Considerations

### Code Splitting

The application implements code splitting to reduce initial bundle size:

- **Route-based Splitting**: Each route loads only the necessary components
- **Component Lazy Loading**: Large components are loaded on demand

Example implementation:
```jsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Eagerly loaded components
import Home from './Pages/Home';
import LoadingSpinner from './components/LoadingSpinner';

// Lazily loaded components
const About = lazy(() => import('./Pages/About'));
const Recipe = lazy(() => import('./Pages/Recipe'));
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Other routes */}
      </Routes>
    </Suspense>
  );
}
```

### Memoization

React's memoization features are used to prevent unnecessary re-renders:

- **React.memo**: For component memoization
- **useMemo**: For expensive calculations
- **useCallback**: For stable callback references

Example implementation:
```jsx
import React, { useMemo, useCallback } from 'react';

const RecipeList = ({ recipes, category }) => {
  // Memoize filtered recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => recipe.category === category);
  }, [recipes, category]);
  
  // Stable callback reference
  const handleRecipeClick = useCallback((id) => {
    console.log(`Recipe clicked: ${id}`);
    // Navigation logic
  }, []);
  
  return (
    <div className="recipe-list">
      {filteredRecipes.map(recipe => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          onClick={() => handleRecipeClick(recipe.id)} 
        />
      ))}
    </div>
  );
};

// Prevent re-renders if props haven't changed
export default React.memo(RecipeList);
```

### Image Optimization

The application implements several image optimization techniques:

- **Responsive Images**: Different sizes for different viewports
- **Lazy Loading**: Images load only when they enter the viewport
- **Format Optimization**: WebP format where supported
- **Compression**: Optimized image file sizes

Example implementation:
```jsx
<img 
  src={recipe.image} 
  alt={recipe.title}
  loading="lazy"
  className="w-full h-48 object-cover"
  srcSet={`${recipe.image} 1x, ${recipe.imageHD} 2x`}
/>
```

### Performance Monitoring

The application includes performance monitoring considerations:

- **React DevTools Profiler**: For component render performance
- **Lighthouse Audits**: For overall performance metrics
- **Web Vitals Tracking**: For core web vitals monitoring

## Accessibility Implementation

### ARIA Attributes

The application implements ARIA attributes for improved accessibility:

- **aria-label**: For elements without visible text
- **aria-expanded**: For expandable UI elements
- **aria-hidden**: For decorative elements
- **aria-live**: For dynamic content updates

Example implementation:
```jsx
<button 
  aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
  onClick={toggleLike}
>
  <HeartIcon aria-hidden="true" />
</button>
```

### Keyboard Navigation

The application supports keyboard navigation:

- **Focus Management**: Visible focus indicators
- **Tab Order**: Logical tab sequence
- **Keyboard Shortcuts**: For common actions
- **Focus Trapping**: For modals and dialogs

### Screen Reader Support

The application includes screen reader considerations:

- **Semantic HTML**: Using appropriate HTML elements
- **Alt Text**: Descriptive alt text for images
- **Skip Links**: For bypassing repetitive content
- **ARIA Live Regions**: For dynamic content updates

### Color Contrast

The application maintains WCAG 2.1 AA compliant color contrast:

- **Text Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **UI Element Contrast**: Minimum 3:1 for interactive elements
- **Focus Indicators**: High-contrast focus indicators

## Development Workflow

### Development Environment Setup

1. **Prerequisites**:
   - Node.js (v18.0.0 or higher)
   - npm (v9.0.0 or higher)
   - Git

2. **Installation Steps**:
   ```bash
   git clone https://github.com/yourusername/recipe-sem-5.git
   cd recipe-sem-5
   npm install
   ```

3. **Development Server**:
   ```bash
   npm run dev
   ```

### Code Quality Tools

- **ESLint**: For JavaScript/JSX linting
  - Configuration in `eslint.config.js`
  - React-specific rules enabled

- **Prettier**: For code formatting
  - Integration with ESLint
  - Consistent code style

### Git Workflow

- **Branch Strategy**:
  - `main`: Production-ready code
  - `develop`: Integration branch
  - Feature branches: `feature/feature-name`
  - Bug fix branches: `fix/bug-name`

- **Commit Conventions**:
  - Descriptive commit messages
  - Present tense verb form
  - Reference issue numbers when applicable

### Documentation Practices

- **Code Comments**: For complex logic and non-obvious implementations
- **JSDoc**: For function and component documentation
- **README**: For project overview and setup instructions
- **DOCUMENTATION.md**: For detailed technical documentation

## Testing Strategy

### Unit Testing

The application is designed with testability in mind:

- **Component Testing**: Testing individual components in isolation
- **Hook Testing**: Testing custom hooks
- **Utility Function Testing**: Testing helper functions

Recommended testing tools:
- Jest: Test runner and assertion library
- React Testing Library: Component testing utilities
- Mock Service Worker: API mocking

Example test implementation:
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Cards from '../components/Cards';
import { LikeProvider } from '../context/LikeContext';

// Mock recipe data
const mockRecipe = {
  id: 'recipe-001',
  title: 'Test Recipe',
  image: 'test-image.jpg',
  prepTime: '10 minutes'
};

test('renders recipe card with correct information', () => {
  render(
    <LikeProvider>
      <Cards recipe={mockRecipe} />
    </LikeProvider>
  );
  
  // Check if recipe title is rendered
  expect(screen.getByText('Test Recipe')).toBeInTheDocument();
  
  // Check if prep time is rendered
  expect(screen.getByText('10 minutes')).toBeInTheDocument();
  
  // Check if image is rendered with correct alt text
  const image = screen.getByAltText('Test Recipe');
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'test-image.jpg');
});

test('toggles like status when like button is clicked', () => {
  render(
    <LikeProvider>
      <Cards recipe={mockRecipe} />
    </LikeProvider>
  );
  
  // Find like button
  const likeButton = screen.getByRole('button', { name: /add to favorites/i });
  
  // Click like button
  fireEvent.click(likeButton);
  
  // Check if button text changed
  expect(screen.getByRole('button', { name: /remove from favorites/i })).toBeInTheDocument();
  
  // Click again to unlike
  fireEvent.click(screen.getByRole('button', { name: /remove from favorites/i }));
  
  // Check if button text changed back
  expect(screen.getByRole('button', { name: /add to favorites/i })).toBeInTheDocument();
});
```

### Integration Testing

Integration tests would verify that components work together correctly:

- **Page Tests**: Testing complete page components
- **User Flow Tests**: Testing common user journeys
- **Context Integration**: Testing components with context providers

### Accessibility Testing

Accessibility testing would ensure the application is usable by everyone:

- **Automated Testing**: Using tools like axe-core
- **Keyboard Navigation Testing**: Ensuring all functionality is accessible via keyboard
- **Screen Reader Testing**: Testing with screen readers like NVDA or VoiceOver

## Build and Deployment

### Build Process

The application uses Vite for building:

```bash
# Development build with source maps
npm run build

# Preview the production build
npm run preview
```

The build process:
1. Compiles JSX to JavaScript
2. Bundles modules
3. Minifies code
4. Optimizes assets
5. Generates HTML with correct references

### Deployment Options

The application can be deployed to various platforms:

#### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy
```

#### GitHub Pages Deployment

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Environment Configuration

The application supports environment-specific configuration:

- `.env`: Default environment variables
- `.env.development`: Development-specific variables
- `.env.production`: Production-specific variables

Example `.env` file:
```
VITE_API_URL=https://api.example.com
VITE_ENABLE_ANALYTICS=false
```

Accessing environment variables:
```jsx
const apiUrl = import.meta.env.VITE_API_URL;
```

## Future Improvements

### Potential Enhancements

1. **User Authentication**:
   - Implement full user authentication with JWT
   - User profiles with customizable preferences
   - Social login options (Google, Facebook)

2. **Recipe Submission**:
   - Allow users to submit their own recipes
   - Recipe moderation system
   - Image upload functionality

3. **Search Functionality**:
   - Advanced search with filters
   - Ingredient-based search
   - Dietary restriction filters
   - Cooking time filters

4. **Social Features**:
   - Recipe comments and ratings
   - Social sharing functionality
   - Follow other users
   - Activity feed

5. **Personalization**:
   - Personalized recipe recommendations
   - Dietary preference settings
   - Cooking skill level adjustments
   - Favorite cuisines

6. **Offline Support**:
   - Service workers for offline functionality
   - Cached recipes for offline viewing
   - Offline favorites management

7. **Internationalization**:
   - Multiple language support
   - Measurement unit conversion (metric/imperial)
   - Regional recipe variations

8. **Accessibility Improvements**:
   - Enhanced keyboard navigation
   - Screen reader optimizations
   - High contrast mode
   - Font size adjustments

9. **Recipe Collections**:
   - Custom recipe collections/folders
   - Meal planning functionality
   - Grocery list generation

10. **Meal Planning**:
    - Weekly meal planner
    - Nutritional information
    - Grocery list export
    - Calendar integration

### Technical Improvements

1. **Unit Testing**:
   - Comprehensive test coverage with Jest and React Testing Library
   - Integration tests for user flows
   - Accessibility testing

2. **Performance Optimization**:
   - Advanced code splitting strategies
   - Image optimization pipeline
   - Preloading and prefetching
   - Bundle size optimization

3. **SEO Optimization**:
   - Metadata optimization
   - Structured data for recipes
   - Sitemap generation
   - Social media preview optimization

4. **PWA Features**:
   - Full Progressive Web App implementation
   - Install prompts
   - Push notifications
   - Background sync

5. **Backend Integration**:
   - Connect to a real backend API
   - User authentication
   - Data persistence
   - Real-time updates

6. **CI/CD Pipeline**:
   - Automated testing
   - Deployment automation
   - Code quality checks
   - Performance monitoring

7. **Analytics Integration**:
   - User behavior tracking
   - Performance monitoring
   - Feature usage analytics
   - A/B testing framework

8. **Advanced State Management**:
   - Consider Redux for more complex state
   - Implement Redux Toolkit
   - Add middleware for side effects

9. **Micro-Frontend Architecture**:
   - Split application into independent modules
   - Team-based development approach
   - Shared component library

10. **GraphQL Integration**:
    - Replace REST with GraphQL
    - Implement Apollo Client
    - Optimize data fetching

## Design Decisions

### Why React?

React was chosen for its component-based architecture, which allows for:
- Reusable UI elements
- Efficient rendering through the virtual DOM
- Strong ecosystem and community support
- Declarative programming model
- Excellent developer tools

The component model aligns perfectly with the UI requirements of a recipe application, where many elements (recipe cards, ingredient lists, etc.) are reused throughout the application.

### Why Tailwind CSS?

Tailwind CSS was selected for its utility-first approach, which provides:
- Rapid UI development
- Consistent design system
- Reduced CSS bundle size through purging
- Responsive design utilities
- Customization options

The utility-first approach allows for quick iterations on the UI without context switching between HTML and CSS files.

### Why Context API over Redux?

For this project's scope, Context API provides sufficient state management without the additional complexity of Redux:
- Simple global state requirements (primarily favorites)
- No complex state transformations needed
- No middleware requirements
- Reduced boilerplate code
- Native to React

If the application grows in complexity, Redux could be considered for more advanced state management needs.

### Why Vite?

Vite was chosen as the build tool for its:
- Fast development server with hot module replacement
- Optimized production builds
- ES modules native approach
- Built-in TypeScript support
- Simple configuration

Vite provides a better developer experience compared to Create React App with faster refresh times and more modern defaults.

## Troubleshooting Guide

### Common Issues and Solutions

#### Installation Issues

**Issue**: Node.js version compatibility problems
**Solution**: Use nvm to install the correct Node.js version
```bash
nvm install 18
nvm use 18
```

**Issue**: Package installation fails
**Solution**: Clear npm cache and retry
```bash
npm cache clean --force
npm install
```

#### Development Server Issues

**Issue**: Development server won't start
**Solution**: Check for port conflicts
```bash
# Try a different port
npm run dev -- --port 3000
```

**Issue**: Hot reloading not working
**Solution**: Check for syntax errors in your code or restart the dev server

#### Build Issues

**Issue**: Build fails with module resolution errors
**Solution**: Check import paths and ensure all dependencies are installed

**Issue**: CSS not applying correctly
**Solution**: Check Tailwind configuration and class names

#### Runtime Issues

**Issue**: Favorites not persisting after refresh
**Solution**: Check localStorage implementation and browser storage settings

**Issue**: Routes not working correctly
**Solution**: Verify route configuration and ensure BrowserRouter is properly set up

### Debugging Techniques

- **React DevTools**: For component inspection and state debugging
- **Console Logging**: Strategic console.log statements
- **Network Tab**: For API and resource loading issues
- **Application Tab**: For localStorage and session storage inspection
- **Error Boundaries**: For graceful error handling in components

## Code Conventions

### Naming Conventions

- **Components**: PascalCase (e.g., `RecipeCard.jsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useRecipeFilter.js`)
- **Utilities**: camelCase (e.g., `formatDate.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RECIPES_PER_PAGE`)
- **CSS Classes**: kebab-case or Tailwind utilities

### File Organization

- **Component Files**: One component per file
- **Related Components**: Grouped in directories
- **Shared Components**: In a common components directory
- **Page Components**: In a pages directory
- **Context Providers**: In a context directory
- **Utilities**: In a utils directory

### Coding Style

- **Functional Components**: Use functional components with hooks
- **Destructuring**: Use object destructuring for props and state
- **Prop Types**: Document component props with JSDoc comments
- **Default Exports**: Use default exports for components
- **Named Exports**: Use named exports for utilities and hooks

### Component Structure

```jsx
// Import statements
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Component definition
const ComponentName = ({ prop1, prop2 }) => {
  // State hooks
  const [state1, setState1] = useState(initialValue);
  
  // Other hooks
  const navigate = useNavigate();
  
  // Side effects
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup logic
    };
  }, [dependencies]);
  
  // Event handlers
  const handleEvent = () => {
    // Event handling logic
  };
  
  // Helper functions
  const helperFunction = () => {
    // Helper logic
  };
  
  // Render logic
  return (
    <div className="component-wrapper">
      {/* Component JSX */}
    </div>
  );
};

// Export statement
export default ComponentName;
```

## References and Resources

### Official Documentation

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)

### Learning Resources

- [React Hooks Guide](https://reactjs.org/docs/hooks-intro.html)
- [Tailwind CSS Course](https://tailwindcss.com/course)
- [JavaScript.info](https://javascript.info/)
- [Web.dev](https://web.dev/)

### Design Resources

- [Tailwind UI](https://tailwindui.com/)
- [Heroicons](https://heroicons.com/)
- [Coolors](https://coolors.co/)
- [Google Fonts](https://fonts.google.com/)

### Development Tools

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Can I Use](https://caniuse.com/)
- [WebPageTest](https://www.webpagetest.org/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                