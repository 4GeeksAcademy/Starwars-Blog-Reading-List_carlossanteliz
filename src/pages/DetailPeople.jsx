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
    gender: "",
    hair_color: "",
    height: "",
    skin_color: "",
    name: "",
    species: "",
    vehicles: "",
    starships: "",
    description: ""
  });

  const detailPerson = () => {
  fetch(`https://www.swapi.tech/api/people/${uid}`)
    .then((res) => res.json())
    .then((data) =>
      setPerson({
        ...data.result.properties,
        description: data.result.description
      })
    )
    .catch((err) => console.error("Error al ejecutar operación", err));
};


  useEffect(() => {
    detailPerson();
  }, [uid]);

  return (
    <div className="container my-5">
      <div className="row g-4 align-items-center">
        
        <div className="col-md-4 text-center">
          <img
            src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/people/${uid}.jpg`}
            className="img-fluid rounded shadow"
            alt={person.name}
          />
        </div>

        
        <div className="col-md-8">
          <h2 className="fw-bold display-5">{person.name}</h2>
          <p className="lead">
            <p className="lead">{person.description}</p>
          </p>

          <div className="row">
            <div className="col-md-6">
              <p><strong>Gender:</strong> {person.gender}</p>
              <p><strong>Birth Year:</strong> {person.birth_year}</p>
              <p><strong>Height:</strong> {person.height} cm</p>
              <p><strong>Eye Color:</strong> {person.eye_color}</p>
              <p><strong>Hair Color:</strong> {person.hair_color}</p>
              <p><strong>Skin Color:</strong> {person.skin_color}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Species:</strong> {person.species}</p>
              <p><strong>Vehicles:</strong> {person.vehicles}</p>
              <p><strong>Starships:</strong> {person.starships}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
