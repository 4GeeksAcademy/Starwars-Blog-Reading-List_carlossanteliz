import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import CardPeople from "../components/CardPeople.jsx";


export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

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


  useEffect(() => {
    people();
  }, []);

  const groupedPeople = store.people.reduce((rows, person, index) => {
    if (index % 3 === 0) rows.push([]);
    rows[rows.length - 1].push(person);
    return rows;
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Starwars!!</h1>

      <div id="peopleCarousel" className="carousel slide" data-bs-ride="carousel">
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


        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#peopleCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon bg-dark rounded-circle" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#peopleCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon bg-dark rounded-circle" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </div>
  );
};
