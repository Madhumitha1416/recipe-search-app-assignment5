import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const LOOKUP_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php";

function getIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      list.push({ ingredient: ingredient.trim(), measure: (measure || "").trim() });
    }
  }
  return list;
}

function RecipeDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMeal() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(LOOKUP_URL, { params: { i: id } });
        if (!cancelled) {
          const found = response.data.meals ? response.data.meals[0] : null;
          setMeal(found);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Could not load this recipe. Please try again later.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchMeal();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const backButton = (
    <Link to="/recipes" className="btn btn-secondary">
      ← Back to Recipes
    </Link>
  );

  if (loading) {
    return (
      <div className="message">
        <div className="spinner"></div>
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="message error">{error}</p>
        {backButton}
      </div>
    );
  }

  if (!meal) {
    return (
      <div>
        <p className="message">Recipe not found.</p>
        {backButton}
      </div>
    );
  }

  const ingredients = getIngredients(meal);

  return (
    <article className="detail">
      {backButton}
      <div className="detail-header">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="detail-image" />
        <div>
          <h1>{meal.strMeal}</h1>
          <p>
            <strong>Category:</strong> {meal.strCategory}
          </p>
          <p>
            <strong>Area:</strong> {meal.strArea}
          </p>
          {meal.strYoutube && (
            <p>
              <a href={meal.strYoutube} target="_blank" rel="noreferrer">
                ▶ Watch on YouTube
              </a>
            </p>
          )}
        </div>
      </div>

      <h2>Ingredients</h2>
      <ul className="ingredients">
        {ingredients.map((item, index) => (
          <li key={index}>
            <span>{item.ingredient}</span>
            <span className="measure">{item.measure}</span>
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p className="instructions">{meal.strInstructions}</p>
    </article>
  );
}

export default RecipeDetail;
