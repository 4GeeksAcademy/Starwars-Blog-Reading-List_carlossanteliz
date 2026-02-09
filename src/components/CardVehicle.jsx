import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import React from "react";

const CardVehicle = ({ vehicle }) => {
  const { store, dispatch } = useGlobalReducer();
  const favorite = store.favorites.some(f => f.uid === vehicle.uid);

  const switchFavorite = () => {
    if (favorite) {
      const index = store.favorites.findIndex(f => f.uid === vehicle.uid);
      dispatch({
        type: "remove_favorite",
        payload: { index }
      });
    } else {
      dispatch({
        type: "add_favorite",
        payload: {
          item: {
            name: vehicle.name,
            uid: vehicle.uid,
            type: "vehicle"
          }
        }
      });
    }
  };

  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      <img
        src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/vehicles/${vehicle.uid}.jpg`}
        className="card-img-top"
        alt={vehicle.name}
      />
      <div className="card-body">
        <h5 className="card-title">{vehicle.name}</h5>
        <Link to={`/vehicles/${vehicle.uid}`} className="btn btn-warning me-2">
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

export default CardVehicle; 