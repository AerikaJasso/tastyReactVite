# Tasty React Recipe App

A modern, responsive React application for discovering and exploring recipes. Built with React, Vite, and TypeScript, this application provides an intuitive interface for browsing recipes and cooking inspiration.

## 🚀 Live Demo

Check out the live application at: [https://AerikaJasso.github.io/tastyReactVite/](https://AerikaJasso.github.io/tastyReactVite/)

## ✨ Features

- Browse a curated collection of recipes
- Detailed recipe views with ingredients and instructions
- Responsive design for mobile and desktop
- Modern UI with smooth navigation
- Search and filter functionality
- Integration with DummyJSON Recipe API

## 🛠️ Built With

- React 18
- TypeScript
- Vite
- React Router v6
- CSS Modules
- GitHub Pages
- [DummyJSON](https://dummyjson.com/docs/recipes) for recipe data

## 📡 API Integration

This application uses the DummyJSON Recipes API to fetch recipe data. The API provides:

- A collection of sample recipes
- Recipe details including:
  - Ingredients
  - Instructions
  - Cooking time
  - Serving size
  - Categories
  - Tags

API Endpoints used:
- `GET /recipes` - Fetch all recipes
- `GET /recipes/{id}` - Fetch specific recipe details

For more information about the API, visit [DummyJSON Recipe Documentation](https://dummyjson.com/docs/recipes)

## 🏃‍♀️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/AerikaJasso/tastyReactVite.git
```

2. Install dependencies
```bash
cd tastyReactVite
npm install
```

3. Start the development server
```bash
npm run dev
```

## 🚀 Deployment

The application is deployed using GitHub Pages. To deploy your own version:

1. Update the `homepage` in `package.json`
2. Run the build command
```bash
npm run build
```