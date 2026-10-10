import { createContext, useContext, useEffect, useState } from "react";

const FavouritesContext = createContext(null);
const STORAGE_KEY = "recipe-favourites";

function loadFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(loadFavourites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {
      // ignore storage errors
    }
  }, [favourites]);

  const addFavourite = (recipe) => {
    setFavourites((prev) =>
      prev.some((r) => r.idMeal === recipe.idMeal) ? prev : [...prev, recipe]
    );
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((r) => r.idMeal !== id));
  };

  const isFavourite = (id) => favourites.some((r) => r.idMeal === id);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used inside FavouritesProvider");
  }
  return context;
}
