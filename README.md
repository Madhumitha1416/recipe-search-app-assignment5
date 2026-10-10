# Recipe Search App

A React recipe search app built with Vite, React Router DOM and Axios, using the free [TheMealDB](https://www.themealdb.com/api.php) API.

## Features
- Home, Recipes, Recipe Detail and Favourites pages (React Router)
- Active-link highlighting in the Navbar (`NavLink`)
- Custom hook `useRecipes(query)` returning `{ data, loading, error }`
- Recipe details with ingredients, measurements, instructions and YouTube link
- Favourites via React Context, saved to `localStorage`

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Build
```bash
npm run build
```

## Project structure
```text
src/
├── components/   Navbar.jsx, RecipeCard.jsx
├── pages/        Home.jsx, Recipes.jsx, RecipeDetail.jsx, Favourites.jsx
├── hooks/        useRecipes.js
├── context/      FavouritesContext.jsx
├── App.jsx
├── main.jsx
└── index.css
```
