import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <h1>Recipe Search App</h1>
      <p>
        Search thousands of delicious recipes, view ingredients and cooking
        instructions, and save your favourites for later.
      </p>
      <Link to="/recipes" className="btn btn-primary btn-large">
        Explore Recipes
      </Link>
    </section>
  );
}

export default Home;
