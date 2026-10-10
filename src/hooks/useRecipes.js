import { useEffect, useState } from "react";
import axios from "axios";

const SEARCH_URL = "https://www.themealdb.com/api/json/v1/1/search.php";

function useRecipes(query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRecipes() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(SEARCH_URL, { params: { s: query } });
        if (!cancelled) {
          // TheMealDB returns { meals: null } when nothing is found
          setData(response.data.meals || []);
        }
      } catch (err) {
        if (!cancelled) {
          setData([]);
          setError("Could not load recipes. Please try again later.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRecipes();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return { data, loading, error };
}

export default useRecipes;
