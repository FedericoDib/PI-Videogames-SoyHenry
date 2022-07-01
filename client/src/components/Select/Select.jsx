import React from "react";
import { useSelector } from "react-redux";

const styleSelectContainer = {
    display : "flex",
    justifyContent : "center",
    width: "100%",
    marginTop: "30px"
}

const styleSelect = {
    fontFamily: 'Press Start 2P, cursive',
    fontSize: '0.9rem',
    color: '#ddd',
    textTransform: 'uppercase',
    textDecoration: 'none',
    padding: '10px 10px',
    border: '2px solid #111',
    background: '#572e7e',
    boxShadow: '3px 3px #111',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    marginRight: '15px'
}

const styleOption = {
    padding: '10px',
    // backgroundColor: '#fcfdfd',
    // border: '2px solid rgba(132,53,142,1)',
    // borderRadius: '30px',
    // boxShadow: 'rgba(132,53,142,1) 4px 4px 0 0',
    // color: 'rgba(9,56,121,1)',
    // cursor: 'pointer',
    // display: 'inline-block',
    // fontWeight: '600',
    // lineHeight: '50px',
    // textAlign: 'center',
    // textDecoration: 'none',
    // userSelect: 'none',
    // touchAction: 'manipulation',
    // textTransform: 'uppercase',
    // marginRight: '20px',
}

export default function Select({filterName, filterGenre, filterCreated, filterRating}){

    const genres = useSelector(state => state.genres);

    return(
        <>
            <div style={styleSelectContainer}>
            <h1>Filters: </h1>
                <select onChange={filterName} style={styleSelect}  name="Alph">
                        <option style={styleOption} value='All'>Alphabetically:</option>
                        <option value='asc'>Ascendant</option>
                        <option value='desc'>Falling</option>
                </select>
                <select onChange={filterRating} style={styleSelect} name="Rating">
                        <option value='All'>Rating:</option>
                        <option value='asc'>Ascendant</option>
                        <option value='desc'>Falling</option>
                </select>
                <select onChange={filterCreated} style={styleSelect} name="Created">
                        <option value='All'>Videogame:</option>
                        <option value='database'>Created</option>
                        <option value='api'>Existent</option>
                </select>
                <select onChange={filterGenre} style={styleSelect} name="Genres">
                        <option value='All'>Genres:</option>
                        {
                            genres.map(genre => (
                                <option key={genre.id} value={genre.name}>{genre.name}</option>
                            ))
                        }
                </select>
            </div>
        </>
    )
}





