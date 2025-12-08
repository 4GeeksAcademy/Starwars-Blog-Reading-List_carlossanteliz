import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import React from "react";

const CardPeople = ({ people }) => {
  const { store, dispatch } = useGlobalReducer();
  const favorite = store.favorites.some(f => f.uid === people.uid);

  const switchFavorite = () => {
    if (favorite) {
      const index = store.favorites.findIndex(f => f.uid === people.uid);
      dispatch({
        type: "remove_favorite",
        payload: { index }
      });
    } else {
      dispatch({
        type: "add_favorite",
        payload: {
          item: {
            name: people.name,
            uid: people.uid,
            type: "people"
          }
        }
      });
    }
  };

  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      <img
        src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/people/${people.uid}.jpg`}
        className="card-img-top"
        alt={people.name}
      />
      <div className="card-body">
        <h5 className="card-title">{people.name}</h5>
        <p className="card-text">
          <strong>Gender:</strong> {people.gender}
        </p>
        <p className="card-text">
          <strong>Hair Color:</strong> {people.hair_color}
        </p>
        <p className="card-text">
          <strong>Height:</strong> {people.height}
        </p>

        <Link to={`/people/${people.uid}`} className="btn btn-primary me-2">
          Learn more
        </Link>

        <button
          onClick={switchFavorite}
          className={`btn ${favorite ? "btn-danger" : "btn-outline-danger"}`}
        >
          {favorite ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  );
};

export default CardPeople;
