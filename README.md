# MealMate - Recipe Sharing Platform

![MealMate Logo](/public/mealmate-logo.png)

## 📋 Project Description

MealMate is a comprehensive React-based recipe sharing platform designed to help users discover, browse, and save their favorite recipes. The application provides an intuitive interface for exploring various food categories including chicken, seafood, vegetarian dishes, and desserts. 

As a portfolio project, MealMate demonstrates frontend development skills using modern React practices, showcasing proficiency in component architecture, state management, responsive design, and user experience principles. The project implements a clean, visually appealing interface that prioritizes usability and accessibility.

### Purpose and Goals

- **Showcase Frontend Skills**: Demonstrate proficiency with React and modern frontend technologies
- **Practice UI/UX Design**: Implement responsive, accessible, and intuitive user interfaces
- **Portfolio Enhancement**: Serve as a tangible example of development capabilities for potential employers
- **Learning Platform**: Explore and implement best practices in React development

### Target Audience

- **Home Cooks**: Users looking for recipe inspiration and cooking instructions
- **Food Enthusiasts**: People interested in exploring different cuisines and dishes
- **Busy Individuals**: Users seeking quick and easy meal ideas with clear instructions
- **Health-Conscious Users**: People looking for specific dietary options (vegetarian, etc.)

## ✨ Key Features

### Core Functionality

- **Recipe Browsing**: Explore recipes across multiple categories with intuitive navigation
- **Favorites System**: Save and manage favorite recipes using local storage for persistence
- **Responsive Design**: Fully responsive UI that works seamlessly on mobile, tablet, and desktop devices
- **Recipe Details**: View comprehensive recipe information including ingredients, instructions, prep time, and serving size
- **Category Filtering**: Browse recipes by category (Chicken, Seafood, Vegetarian, Dessert) with dedicated views

### User Experience

- **Clean UI/UX**: Intuitive user interface with smooth animations and transitions for enhanced engagement
- **Authentication UI**: Fully designed login and signup interfaces (frontend implementation only)
- **Error Handling**: Custom error pages and graceful fallbacks for improved user experience
- **Animated Transitions**: Smooth page transitions and component animations using Framer Motion
- **Accessibility Features**: Semantic HTML, keyboard navigation support, and screen reader compatibility

### Visual Design

- **Modern Aesthetic**: Clean, contemporary design with consistent visual language
- **Responsive Layouts**: Adaptive layouts that optimize content presentation across devices
- **Typography Hierarchy**: Clear typographic hierarchy for improved readability
- **Color Theory**: Thoughtful color palette that enhances usability and brand identity
- **Visual Feedback**: Interactive elements provide appropriate visual feedback

## 🛠 Technology Stack

### Core Technologies

- **React 19**: Frontend library for building the user interface with the latest features and improvements
- **React Router 7**: For handling navigation and routing with the latest routing capabilities
- **Context API**: For state management (likes/favorites functionality) with a clean, hook-based approach
- **Framer Motion**: For sophisticated animations and transitions that enhance user experience
- **Tailwind CSS 4**: For styling with a utility-first approach that enables rapid UI development

### Development Tools

- **Vite 6**: For fast development and optimized builds with hot module replacement
- **ESLint 9**: For code quality and consistency enforcement
- **localStorage API**: For persisting user favorites and preferences between sessions
- **npm**: Package management and script running

### UI Components and Assets

- **Headless UI**: For accessible, unstyled UI components that integrate seamlessly with Tailwind
- **Heroicons**: For consistent, high-quality SVG iconography throughout the application
- **Custom SVG Assets**: Including the MealMate logo and various UI elements
- **JSON Data Storage**: Structured recipe data stored in JSON format for easy management

## 📁 Detailed Folder Structure

```
recipe-sem-5/
├── public/                # Static assets served directly by the web server
│   ├── favicon.ico        # Site favicon
│   ├── mealmate-logo.png  # Logo for README and other documentation
│   └── ...                # Other static assets
│
├── src/                   # Source code for the application
│   ├── assets/            # Images, icons, and other static resources
│   │   ├── facebook.png   # Social media icons
│   │   ├── google.png     # Authentication provider icons
│   │   ├── mealmate.svg   # Application logo in SVG format
│   │   └── react.svg      # React logo
│   │
│   ├── components/        # Reusable UI components
│   │   ├── AboutHero.jsx          # Hero section for About page
│   │   ├── AnimatedSection.jsx    # Reusable animated section wrapper
│   │   ├── BackgroundCarousel.jsx # Background image carousel component
│   │   ├── Cards.jsx              # Recipe card component for listings
│   │   ├── Category.jsx           # Category selection and filtering
│   │   ├── CTASection.jsx         # Call-to-action section component
│   │   ├── DessertHero.jsx        # Hero section for Dessert category
│   │   ├── DisplayData.jsx        # Component for displaying recipe data
│   │   ├── Footer.jsx             # Site-wide footer component
│   │   ├── Hero.jsx               # Main hero section for homepage
│   │   ├── Higthretting.jsx       # Component for highlighting top-rated recipes
│   │   ├── History.jsx            # Component for displaying site/company history
│   │   ├── HowItWorks.jsx         # Explanatory section for site functionality
│   │   ├── Login.jsx              # User login form component
│   │   ├── Navbar.jsx             # Site-wide navigation component
│   │   ├── RecipeCategories.jsx   # Component for browsing recipe categories
│   │   ├── Recipedata.jsx         # Component for displaying detailed recipe data
│   │   ├── Recipeimage.jsx        # Component for displaying recipe images
│   │   └── Signup.jsx             # User registration form component
│   │
│   ├── context/           # React Context providers for state management
│   │   └── LikeContext.jsx # Context for managing liked/favorite recipes
│   │
│   ├── Data/              # JSON data files containing recipe information
│   │   ├── chickenRecipes.json    # Chicken recipe data
│   │   ├── dessert-recipes.json   # Dessert recipe data
│   │   ├── recipe-data.json       # General recipe data
│   │   ├── seafood-recipes.json   # Seafood recipe data
│   │   └── vegetarian-recipes.json # Vegetarian recipe data
│   │
│   ├── Pages/             # Top-level page components
│   │   ├── About.jsx              # About page with company information
│   │   ├── ErrorPage.jsx          # 404 and error handling page
│   │   ├── Favorite.jsx           # Page for displaying user favorites
│   │   ├── FavoriteRecipePage.jsx # Enhanced page for favorite recipes
│   │   ├── Home.jsx               # Homepage/landing page
│   │   └── Recipe.jsx             # Main recipe browsing page
│   │
│   ├── App.jsx            # Main application component with routing configuration
│   ├── index.css          # Global styles and Tailwind directives
│   └── main.jsx           # Application entry point that renders App component
│
├── .gitignore             # Specifies files to be ignored by Git
├── DOCUMENTATION.md       # Detailed technical documentation
├── eslint.config.js       # ESLint configuration for code quality
├── index.html             # HTML entry point for the application
├── LICENSE                # MIT License for the project
├── package-lock.json      # Locked versions of dependencies
├── package.json           # Project dependencies and scripts
├── README.md              # Project overview (this file)
└── vite.config.js         # Vite configuration for build and development
```

## 🚀 Setup and Installation

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
  - [Download Node.js](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm**: Version 9.0.0 or higher (comes with Node.js)
  - Verify installation: `npm --version`

- **Git**: For version control and cloning the repository
  - [Download Git](https://git-scm.com/downloads)
  - Verify installation: `git --version`

- **Code Editor**: Visual Studio Code recommended
  - [Download VS Code](https://code.visualstudio.com/)
  - Recommended extensions:
    - ESLint
    - Prettier
    - Tailwind CSS IntelliSense
    - ES7+ React/Redux/React-Native snippets

### Detailed Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/recipe-sem-5.git
   cd recipe-sem-5
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all dependencies defined in package.json, including:
   - React and React DOM
   - React Router
   - Tailwind CSS
   - Framer Motion
   - Headless UI components
   - Development tools (ESLint, Vite)

3. **Start the development server**
   ```bash
   npm run dev
   ```
   This command starts the Vite development server with:
   - Hot Module Replacement (HMR) for instant updates
   - Error overlay for debugging
   - Source maps for easier debugging

4. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`
   - The application should load with full functionality
   - Any code changes will automatically refresh the browser

### Troubleshooting Common Installation Issues

- **Node.js version conflicts**: Use nvm (Node Version Manager) to switch between Node.js versions
- **Port conflicts**: If port 5173 is in use, Vite will attempt to use the next available port
- **Dependency issues**: Try removing node_modules and package-lock.json, then run `npm install` again
- **Build errors**: Check the console for specific error messages and ensure all dependencies are installed

## 🏗️ Build and Deployment

### Creating a Production Build

1. **Generate optimized production build**
   ```bash
   npm run build
   ```
   This command:
   - Compiles and bundles all JavaScript with optimizations
   - Processes and minifies CSS
   - Optimizes assets
   - Generates output in the `dist` directory

2. **Preview the production build locally**
   ```bash
   npm run preview
   ```
   This serves the production build locally to verify functionality before deployment.

### Detailed Deployment Options

#### Vercel Deployment

1. **Sign up for Vercel**
   - Create an account at [vercel.com](https://vercel.com)
   - Install Vercel CLI: `npm install -g vercel`

2. **Connect your repository**
   - From the Vercel dashboard, click "Import Project"
   - Select "Import Git Repository" and connect to GitHub
   - Select your recipe-sem-5 repository

3. **Configure deployment settings**
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

4. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Vercel will provide a production URL for your application

#### Netlify Deployment

1. **Sign up for Netlify**
   - Create an account at [netlify.com](https://netlify.com)

2. **Deploy via Netlify UI**
   - From the Netlify dashboard, click "New site from Git"
   - Connect to GitHub and select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Configure custom domain (optional)**
   - In site settings, go to "Domain management"
   - Add your custom domain and follow the DNS configuration instructions

#### GitHub Pages Deployment

1. **Install gh-pages package**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deployment scripts to package.json**
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Configure Vite for GitHub Pages**
   Update vite.config.js to include the correct base path:
   ```javascript
   export default defineConfig({
     base: '/recipe-sem-5/',
     // other configuration...
   });
   ```

4. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

5. **Configure GitHub repository**
   - Go to repository Settings > Pages
   - Ensure source is set to "gh-pages" branch

#### Firebase Hosting Deployment

1. **Set up Firebase**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init
   ```
   - Select "Hosting" when prompted
   - Select "dist" as your public directory
   - Configure as a single-page app: Yes
   - Set up automatic builds and deploys: Optional

2. **Deploy to Firebase**
   ```bash
   npm run build
   firebase deploy
   ```

### Post-Deployment Verification

After deploying to any platform, verify:
- All routes work correctly (test navigation)
- Images and assets load properly
- Responsive design functions on different devices
- Core functionality (favorites, filtering) works as expected

## 📝 Detailed Development Notes

### Architecture Decisions

- **Component Structure**: Components are organized by function rather than type, making it easier to locate related code
- **Context API vs Redux**: Context API was chosen for state management due to the relatively simple state requirements
- **CSS Approach**: Tailwind CSS was selected for its utility-first approach, enabling rapid UI development
- **Routing Strategy**: React Router was implemented with a flat route structure for simplicity and maintainability

### Code Style and Standards

- **ESLint Configuration**: The project uses ESLint with React-specific rules to ensure code quality
- **Component Patterns**: Functional components with hooks are used throughout for consistency
- **File Naming**: PascalCase for component files, camelCase for utility files
- **Import Order**: External dependencies first, followed by internal modules, then styles

### Performance Considerations

- **Image Optimization**: Images are optimized for web to reduce load times
- **Code Splitting**: React Router enables automatic code splitting by route
- **Memoization**: React.memo and useMemo are used where appropriate to prevent unnecessary re-renders
- **Lazy Loading**: Images and non-critical components use lazy loading techniques

### Browser Compatibility

- **Target Browsers**: The application is designed to work on modern browsers (last 2 versions)
- **Polyfills**: Vite automatically includes necessary polyfills for broader compatibility
- **CSS Prefixing**: Autoprefixer is used to ensure CSS compatibility across browsers

## 🔗 Resources and References

### Official Documentation

- [React Documentation](https://react.dev/) - Official React documentation
- [Vite Documentation](https://vitejs.dev/) - Vite build tool documentation
- [Tailwind CSS Documentation](https://tailwindcss.com/) - Utility-first CSS framework
- [React Router Documentation](https://reactrouter.com/) - Client-side routing library
- [Framer Motion Documentation](https://www.framer.com/motion/) - Animation library

### Learning Resources

- [React Hooks Guide](https://reactjs.org/docs/hooks-intro.html) - Understanding React hooks
- [Tailwind CSS Course](https://tailwindcss.com/course) - Free Tailwind CSS course
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial
- [Web.dev](https://web.dev/) - Google's web development guidance

### Design Resources

- [Tailwind UI](https://tailwindui.com/) - UI components built with Tailwind CSS
- [Heroicons](https://heroicons.com/) - SVG icons used in the project
- [Coolors](https://coolors.co/) - Color scheme generator used for the design
- [Google Fonts](https://fonts.google.com/) - Typography resources

### Development Tools

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) - Browser extension for debugging React
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance auditing tool
- [Can I Use](https://caniuse.com/) - Browser compatibility tables

## 👤 Contact and Contribution

### Developer Information

Your Name - [your.email@example.com](mailto:your.email@example.com)

Portfolio: [https://yourportfolio.com](https://yourportfolio.com)

LinkedIn: [https://linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)

GitHub: [https://github.com/yourusername](https://github.com/yourusername)

### Project Repository

Project Link: [https://github.com/yourusername/recipe-sem-5](https://github.com/yourusername/recipe-sem-5)

### Contribution Guidelines

While this is primarily a portfolio project, contributions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## 🙏 Acknowledgments and Credits

### Data Sources

- Recipe data sourced from various public recipe APIs and datasets
- Nutritional information compiled from open-source food databases
- Recipe images from royalty-free stock photo sites

### Tools and Libraries

- [React](https://reactjs.org/) - Core UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [React Router](https://reactrouter.com/) - Routing library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Headless UI](https://headlessui.dev/) - Unstyled, accessible UI components
- [Heroicons](https://heroicons.com/) - SVG icon collection

### Inspiration

- UI design inspired by modern recipe websites and food blogs
- Interaction patterns based on best practices in e-commerce and content sites
- Color scheme inspired by fresh, natural food ingredients
