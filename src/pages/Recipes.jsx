import { useState } from "react";
import useRecipes from "../hooks/useRecipes.js";
import RecipeCard from "../components/RecipeCard.jsx";

function Recipes() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const { data, loading, error } = useRecipes(query);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(input.trim());
  };

  return (
    <section>
      <h1 className="page-title">Recipes</h1>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search recipes (e.g. chicken, pasta)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {loading && (
        <div className="message">
          <div className="spinner"></div>
          <p>Loading recipes...</p>
        </div>
      )}

      {error && <p className="message error">{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p className="message">
          No recipes found{query ? ` for "${query}"` : ""}. Try another search.
        </p>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="grid">
          {data.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Recipes;
