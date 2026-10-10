import { NavLink, Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext.jsx";

function Navbar() {
  const { favourites } = useFavourites();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          🍲 Recipe Search
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/recipes">Recipes</NavLink>
          <NavLink to="/favourites">Favourites ({favourites.length})</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
