import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const DetailStarships = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { uid } = useParams();

  const [starship, setStarship] = useState({
    name: "",
    model: "",
    starship_class: "",
    manufacturer: "",
    length: "",
    crew: "",
    passengers: "",
    hyperdrive_rating: "",
    cost_in_credits: "",
  });

  const detailStarship = () => {
    fetch(`https://www.swapi.tech/api/starships/${uid}`)
      .then((res) => res.json())
      .then((data) => setStarship(data.result.properties))
      .catch((err) => console.error("Error al ejecutar operación", err));
  };

  useEffect(() => {
    detailStarship();
  }, [uid]);

  return (
    <div className="container my-5">
      <div className="row g-4 align-items-center">
        <div className="col-md-4 text-center">
          <img
            src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/starships/${uid}.jpg`}
            className="img-fluid rounded shadow"
            alt={starship.name}
          />
        </div>

        <div className="col-md-8">
          <h2 className="fw-bold display-5">{starship.name}</h2>
          <p className="lead">Model: {starship.model}</p>

          <div className="row">
            <div className="col-md-6">
              <p><strong>Class:</strong> {starship.starship_class}</p>
              <p><strong>Manufacturer:</strong> {starship.manufacturer}</p>
              <p><strong>Length:</strong> {starship.length} m</p>
            </div>
            <div className="col-md-6">
              <p><strong>Crew:</strong> {starship.crew}</p>
              <p><strong>Passengers:</strong> {starship.passengers}</p>
              <p><strong>Hyperdrive Rating:</strong> {starship.hyperdrive_rating}</p>
              <p><strong>Cost:</strong> {starship.cost_in_credits} credits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
