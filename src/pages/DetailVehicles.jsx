import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const DetailVehicles = () => {
  const { store, dispatch } = useGlobalReducer();
  const { uid } = useParams();

  const [vehicle, setVehicle] = useState({
    name: "",
    model: "",
    manufacturer: "",
    cost_in_credits: "",
    length: "",
    crew: "",
    passengers: "",
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
        payload: { item: { name: vehicle.name, uid: uid, type: "vehicles" } }
      });
    }
  };

  useEffect(() => {
    const fetchVehicle = async () => {
      const res = await fetch(`https://www.swapi.tech/api/vehicles/${uid}`);
      const data = await res.json();
      setVehicle({
        ...data.result.properties,
        description: data.result.description
      });
    };
    fetchVehicle();
  }, [uid]);

  return (
    <div className="container my-5">
      <div className="row g-4 align-items-center">
        <div className="col-md-4 text-center">
          
          <img
            src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/vehicles/${uid}.jpg`}
            className="img-fluid rounded shadow mb-3"
            alt={vehicle.name}
          />
        </div>

        <div className="col-md-8">
          <h2 className="fw-bold display-5">{vehicle.name}</h2>
          <p className="lead">{vehicle.description}</p>

          
          <button
            onClick={switchFavorite}
            className={`btn ${favorite ? "btn-danger" : "btn-outline-success"} mb-3`}
          >
            {favorite ? "Unfavorite" : "Favorite"}
          </button>

          <p><strong>Model:</strong> {vehicle.model}</p>
          <p><strong>Manufacturer:</strong> {vehicle.manufacturer}</p>
          <p><strong>Cost:</strong> {vehicle.cost_in_credits}</p>
          <p><strong>Length:</strong> {vehicle.length}</p>
          <p><strong>Crew:</strong> {vehicle.crew}</p>
          <p><strong>Passengers:</strong> {vehicle.passengers}</p>
        </div>
      </div>
    </div>
  );
};