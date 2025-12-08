import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const CardPeople = ({people}) => {
    const { store, dispatch } = useGlobalReducer()
    const favorite = store.favorites.some(f => f.uid == people.uid)
    
    const switchFavorite = () => {
        
        if (favorite) {
            const index = store.favorites.findIndex(f => f.uid === people.uid);
            dispatch({
                type: "remove_favorite",
                payload: { index }
            });

        } else {
            dispatch({
                type: "add_favorite",
                payload: {
                    item: {
                        name: people.name,
                        uid: people.uid,
                        type: "people"
                    }
                }
            });
        }
    };



return (
    <div>
        <div className="card" style={{width: "18rem"}}>
            <img src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/people/${people.uid}.jpg`} className="card-img-top" alt={people.name} />
            <div className="card-body">
                <h5 className="card-title">Name: {people.name}</h5>

                <Link to={`/people/${people.uid}`} className="btn btn-primary">Go somewhere</Link>

                <button onClick={switchFavorite}>
                    {favorite ? "Unfavorite" : "Favorite"}
                </button>

            </div>

        </div>
    </div>
)

}

export default CardPeople