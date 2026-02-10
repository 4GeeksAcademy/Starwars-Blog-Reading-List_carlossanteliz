import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const DetailStarships = () => {
  const { store, dispatch } = useGlobalReducer();
  const { uid } = useParams();

  const [starship, setStarship] = useState({
    name: "",
    model: "",
    manufacturer: "",
    cost_in_credits: "",
    length: "",
    crew: "",
    passengers: "",
    hyperdrive_rating: "",
    description: ""
  });

  
  const favorite = store.favorites.some(f => f.uid === uid);

  const switchFavorite = () => {
    if (favorite) {
      const index = store.favorites.findIndex(f => f.uid === uid);
      dispatch({ type: "remove_favorite", payload: { index } });
    } else {
      dispatch({
        type: "add_favorite",
        payload: { item: { name: starship.name, uid: uid, type: "starships" } }
      });
    }
  };

  useEffect(() => {
    const fetchStarship = async () => {
      const res = await fetch(`https://www.swapi.tech/api/starships/${uid}`);
      const data = await res.json();
      setStarship({
        ...data.result.properties,
        description: data.result.description
      });
    };
    fetchStarship();
  }, [uid]);

  return (
    <div className="container my-5">
      <div className="row g-4 align-items-center">
        <div className="col-md-4 text-center">
          
          <img
            src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/starships/${uid}.jpg`}
            className="img-fluid rounded shadow mb-3"
            alt={starship.name}
          />
        </div>

        <div className="col-md-8">
          <h2 className="fw-bold display-5">{starship.name}</h2>
          <p className="lead">{starship.description}</p>

          
          <button
            onClick={switchFavorite}
            className={`btn ${favorite ? "btn-danger" : "btn-outline-success"} mb-3`}
          >
            {favorite ? "Unfavorite" : "Favorite"}
          </button>

          <p><strong>Model:</strong> {starship.model}</p>
          <p><strong>Manufacturer:</strong> {starship.manufacturer}</p>
          <p><strong>Cost:</strong> {starship.cost_in_credits}</p>
          <p><strong>Length:</strong> {starship.length}</p>
          <p><strong>Crew:</strong> {starship.crew}</p>
          <p><strong>Passengers:</strong> {starship.passengers}</p>
          <p><strong>Hyperdrive Rating:</strong> {starship.hyperdrive_rating}</p>
        </div>
      </div>
    </div>
  );
};