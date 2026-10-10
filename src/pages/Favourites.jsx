import RecipeCard from "../components/RecipeCard.jsx";
import { useFavourites } from "../context/FavouritesContext.jsx";

function Favourites() {
  const { favourites } = useFavourites();

  return (
    <section>
      <h1 className="page-title">Favourites</h1>
      {favourites.length === 0 ? (
        <p className="message">No favourite recipes yet.</p>
      ) : (
        <div className="grid">
          {favourites.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} showMeta={false} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Favourites;
