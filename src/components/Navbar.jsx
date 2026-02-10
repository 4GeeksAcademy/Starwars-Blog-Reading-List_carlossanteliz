import React from "react";
import { Link, useLocation } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const location = useLocation(); 

  const removeFavorite = (i) =>
    dispatch({ type: "remove_favorite", payload: { index: i } });

  return (
    <nav className="navbar bg-dark fixed-top px-3">
      <Link to="/" className="navbar-brand">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9FvROGg0gz5Z2BAX7FPxABCfqJncz7L0ew&s"
          alt="Starwars Logo"
          style={{ height: "20px" }}
        />
      </Link>

      
      {location.pathname !== "/" && (
        <Link to="/" className="btn btn-light text-dark fw-bold ms-2">
          Home
        </Link>
      )}

      <div className="dropdown ms-auto">
        <button
          className="btn btn-warning dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
        >
          Favorites ({store.favorites.length})
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          {store.favorites.map((fav, i) => (
            <li key={i} className="dropdown-item d-flex justify-content-between">
              <Link to={`/${fav.type}/${fav.uid}`}>{fav.name}</Link>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => removeFavorite(i)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;