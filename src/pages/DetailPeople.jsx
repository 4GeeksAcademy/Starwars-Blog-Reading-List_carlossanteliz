import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const DetailPeople = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { uid } = useParams();

  const [person, setPerson] = useState({
    birth_year: "",
    eye_color: "",
    films: "",
    gender: "",
    hair_color: "",
    height: "",
    homeworld: "",
    mass: "",
    name: "",
    skin_color: "",
    created: "",
    edited: "",
    species: "",
    starships: "",
    url: "",
    vehicles: "",
  });

  const detailPerson = () => {
    fetch(`https://www.swapi.tech/api/people/${uid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setPerson(data.result.properties))
      .catch((err) => console.error("Error al ejecutar operación", err));
  };

  useEffect(() => {
    detailPerson();
  }, [uid]);

  return (
    <div className="card" style={{ width: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/people/${uid}.jpg`}
            className="card-img-top"
            alt={person.name}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title fw-bold fs-2">{person.name}</h5>
            <p className="card-text">
              <span className="fw-bold">Birth Year: </span>{person.birth_year}
            </p>
            <p className="card-text">
              <span className="fw-bold">Eye Color: </span>{person.eye_color}
            </p>
            <p className="card-text">
              <span className="fw-bold">Gender: </span>{person.gender}
            </p>
            <p className="card-text">
              <span className="fw-bold">Hair Color: </span>{person.hair_color}
            </p>
            <p className="card-text">
              <span className="fw-bold">Height: </span>{person.height}
            </p>
            <p className="card-text">
              <span className="fw-bold">Skin Color: </span>{person.skin_color}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
