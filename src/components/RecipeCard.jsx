import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext.jsx";

function RecipeCard({ recipe, showMeta = true }) {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  const saved = isFavourite(recipe.idMeal);

  const meta = [recipe.strCategory, recipe.strArea].filter(Boolean).join(" • ");

  return (
    <article className="card">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="card-image"
        loading="lazy"
      />
      <div className="card-body">
        <h3 className="card-title">{recipe.strMeal}</h3>
        {showMeta && meta && <p className="card-meta">{meta}</p>}
        <div className="card-actions">
          <Link to={`/recipes/${recipe.idMeal}`} className="btn btn-primary">
            View Details
          </Link>
          {saved ? (
            <button
              className="btn btn-danger"
              onClick={() => removeFavourite(recipe.idMeal)}
            >
              Remove from Favourites
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => addFavourite(recipe)}
            >
              Save to Favourites
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
