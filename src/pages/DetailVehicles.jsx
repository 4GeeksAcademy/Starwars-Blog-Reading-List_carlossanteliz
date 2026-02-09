import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const DetailVehicles = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { uid } = useParams();

  const [vehicle, setVehicle] = useState({
    name: "",
    model: "",
    vehicle_class: "",
    manufacturer: "",
    length: "",
    crew: "",
    passengers: "",
    cost_in_credits: "",
  });

  const detailVehicle = () => {
    fetch(`https://www.swapi.tech/api/vehicles/${uid}`)
      .then((res) => res.json())
      .then((data) => setVehicle(data.result.properties))
      .catch((err) => console.error("Error al ejecutar operación", err));
  };

  useEffect(() => {
    detailVehicle();
  }, [uid]);

  return (
    <div className="container my-5">
      <div className="row g-4 align-items-center">
        <div className="col-md-4 text-center">
          <img
            src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/vehicles/${uid}.jpg`}
            className="img-fluid rounded shadow"
            alt={vehicle.name}
          />
        </div>

        <div className="col-md-8">
          <h2 className="fw-bold display-5">{vehicle.name}</h2>
          <p className="lead">Model: {vehicle.model}</p>

          <div className="row">
            <div className="col-md-6">
              <p><strong>Class:</strong> {vehicle.vehicle_class}</p>
              <p><strong>Manufacturer:</strong> {vehicle.manufacturer}</p>
              <p><strong>Length:</strong> {vehicle.length} m</p>
            </div>
            <div className="col-md-6">
              <p><strong>Crew:</strong> {vehicle.crew}</p>
              <p><strong>Passengers:</strong> {vehicle.passengers}</p>
              <p><strong>Cost:</strong> {vehicle.cost_in_credits} credits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
