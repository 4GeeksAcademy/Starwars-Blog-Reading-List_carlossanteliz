import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import React from "react";

const CardStarship = ({ starship }) => {
  const { store, dispatch } = useGlobalReducer();
  const favorite = store.favorites.some(f => f.uid === starship.uid);

  const switchFavorite = () => {
    if (favorite) {
      const index = store.favorites.findIndex(f => f.uid === starship.uid);
      dispatch({
        type: "remove_favorite",
        payload: { index }
      });
    } else {
      dispatch({
        type: "add_favorite",
        payload: {
          item: {
            name: starship.name,
            uid: starship.uid,
            type: "starship"
          }
        }
      });
    }
  };

  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      <img
        src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/starships/${starship.uid}.jpg`}
        className="card-img-top"
        alt={starship.name}
      />
      <div className="card-body">
        <h5 className="card-title">{starship.name}</h5>
        <Link to={`/starships/${starship.uid}`} className="btn btn-warning me-2">
          Details
        </Link>

        <button
          onClick={switchFavorite}
          className={`btn ${favorite ? "btn-danger" : "btn-outline-success"}`}
        >
          {favorite ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  );
};

export default CardStarship;
