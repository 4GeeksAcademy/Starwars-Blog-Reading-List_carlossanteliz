import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const CardPeople = ({people}) => {
    const { store, dispatch } = useGlobalReducer()



return (
    <div>
        <div className="card" style={{width: "18rem"}}>
            <img src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/people/${people.uid}.jpg`} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Name: {people.name}</h5>

                <Link to={'/personaje/${people.uid}'} className="btn btn-primary">Go somewhere</Link>

                <button>fav</button>

            </div>

        </div>
    </div>
)

}

export default CardPeople