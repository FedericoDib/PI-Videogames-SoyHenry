import React from "react";
import { useSelector } from "react-redux";

const styleSelectContainer = {
    display : "flex",
    justifyContent : "space-between",
    width: "50%",
}

const styleSelect = {
        padding: '10px',
        backgroundColor: '#fcfdfd',
        border: '2px solid rgba(132,53,142,1)',
        borderRadius: '30px',
        boxShadow: 'rgba(132,53,142,1) 4px 4px 0 0',
        color: 'rgba(9,56,121,1)',
        cursor: 'pointer',
        display: 'inline-block',
        fontWeight: '600',
        lineHeight: '50px',
        textAlign: 'center',
        textDecoration: 'none',
        userSelect: 'none',
        touchAction: 'manipulation',
        textTransform: 'uppercase',
        marginRight: '20px',
        transition: 'all 0.3s ease-in-out',
}

const styleOption = {
    padding: '10px',
    backgroundColor: '#fcfdfd',
    border: '2px solid rgba(132,53,142,1)',
    borderRadius: '30px',
    boxShadow: 'rgba(132,53,142,1) 4px 4px 0 0',
    color: 'rgba(9,56,121,1)',
    cursor: 'pointer',
    display: 'inline-block',
    fontWeight: '600',
    lineHeight: '50px',
    textAlign: 'center',
    textDecoration: 'none',
    userSelect: 'none',
    touchAction: 'manipulation',
    textTransform: 'uppercase',
    marginRight: '20px',
}

export default function Select({filterName, filterGenre, filterRating}){

    const genres = useSelector(state => state.genres);

    return(
        <>
            <div style={styleSelectContainer}>
                <select onChange={filterName} style={styleSelect}  name="Alph">
                        <option style={styleOption} value='All'>Alfabéticamente:</option>
                        <option value='asc'>Ascendente ↑</option>
                        <option value='desc'>Descendente ↓</option>
                </select>
                <select onChange={filterRating} style={styleSelect} name="Rating">
                        <option value='All'>Rating:</option>
                        <option value='asc'>Asc</option>
                        <option value='desc'>Desc</option>
                </select>
                <select style={styleSelect} name="Created">
                        <option value='All'>Videogame:</option>
                        <option value='created'>Created</option>
                        <option value='existent'>Existent</option>
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





