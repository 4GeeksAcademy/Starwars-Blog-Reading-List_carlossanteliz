import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import CardPeople from "../components/CardPeople.jsx";
import CardVehicle from "../components/CardVehicle.jsx";   
import CardStarship from "../components/CardStarship.jsx"; 

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);

  async function people() {
    let personajesBasicos = [];
    let url = "https://www.swapi.tech/api/people/";

    while (url) {
      const response = await fetch(url);
      const data = await response.json();
      personajesBasicos = [...personajesBasicos, ...data.results];
      url = data.next;
    }

    dispatch({
      type: "get_people",
      payload: { people: personajesBasicos }
    });
  }

  
  async function fetchVehicles() {
    let vehiculosBasicos = [];
    let url = "https://www.swapi.tech/api/vehicles/";

    while (url) {
      const response = await fetch(url);
      const data = await response.json();
      vehiculosBasicos = [...vehiculosBasicos, ...data.results];
      url = data.next;
    }

    setVehicles(vehiculosBasicos);
  }

  
  async function fetchStarships() {
    let starshipsBasicos = [];
    let url = "https://www.swapi.tech/api/starships/";

    while (url) {
      const response = await fetch(url);
      const data = await response.json();
      starshipsBasicos = [...starshipsBasicos, ...data.results];
      url = data.next;
    }

    setStarships(starshipsBasicos);
  }

useEffect(() => {
  if (store.people.length === 0) {
    people(); 
  }
  if (vehicles.length === 0) {
    fetchVehicles();
  }
  if (starships.length === 0) {
    fetchStarships();
  }
}, []);

  
  const groupedPeople = store.people.reduce((rows, person, index) => {
    if (index % 3 === 0) rows.push([]);
    rows[rows.length - 1].push(person);
    return rows;
  }, []);

  const groupedVehicles = vehicles.reduce((rows, vehicle, index) => {
    if (index % 3 === 0) rows.push([]);
    rows[rows.length - 1].push(vehicle);
    return rows;
  }, []);

  const groupedStarships = starships.reduce((rows, starship, index) => {
    if (index % 3 === 0) rows.push([]);
    rows[rows.length - 1].push(starship);
    return rows;
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Starwars!!</h1>

      
      <div id="peopleCarousel" className="carousel slide" data-bs-interval="false"> 
        <div className="carousel-inner">
          {groupedPeople.map((group, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
              <div className="d-flex justify-content-center gap-3">
                {group.map((p, j) => (
                  <CardPeople key={j} people={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#peopleCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon bg-dark rounded-circle" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#peopleCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon bg-dark rounded-circle" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      
      <div id="vehiclesCarousel" className="carousel slide mt-5" data-bs-interval="false"> 
        <div className="carousel-inner">
          {groupedVehicles.map((group, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
              <div className="d-flex justify-content-center gap-3">
                {group.map((v, j) => (
                  <CardVehicle key={j} vehicle={v} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#vehiclesCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon bg-dark rounded-circle" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#vehiclesCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon bg-dark rounded-circle" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      
      <div id="starshipsCarousel" className="carousel slide mt-5" data-bs-interval="false"> 
        <div className="carousel-inner">
          {groupedStarships.map((group, i) => (
  <div key={i} className={`carousel-item ${i === 1 ? "active" : ""}`}> 
    <div className="d-flex justify-content-center gap-3">
      {group.map((s, j) => (
        <CardStarship key={j} starship={s} />
      ))}
    </div>
  </div>
))}

        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#starshipsCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon bg-dark rounded-circle" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#starshipsCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon bg-dark rounded-circle" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};