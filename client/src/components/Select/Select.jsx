import React from "react";
import { useSelector } from "react-redux";
import { DivContainerStyled, DivSelectStyled, ButtonStyled} from "./Select.js"

export default function Select({filterName, filterGenre, filterCreated, filterRating, filterClear}){

    const genres = useSelector(state => state.genres);
    
    return(
        <>
            <DivContainerStyled>
                    <DivSelectStyled>
                        <select onChange={filterName} name="Alph">
                            <option id="" selected hidden value='All'>Order by:</option>
                            <option value='asc'>A-Z</option>
                            <option value='desc'>Z-A</option>
                        </select>
                        <select onChange={filterRating} name="Rating">
                            <option selected hidden value='All'>Rating:</option>
                            <option value='asc'>Ascendant</option>
                            <option value='desc'>Falling</option>
                        </select>
                        <select onChange={filterCreated} name="Created">
                            <option selected hidden value='All'>Videogame:</option>
                            <option value='database'>Created</option>
                            <option value='api'>Existent</option>
                        </select>
                        <select onChange={filterGenre} name="Genres">
                            <option selected hidden value='All'>Genres:</option>
                            {
                                genres.map(genre => (
                                    <option key={genre.id} value={genre.name}>{genre.name}</option>
                                ))
                            }
                        </select>
                <ButtonStyled onClick={filterClear}>Clear Filters</ButtonStyled>
                    </DivSelectStyled>
            </DivContainerStyled>
        </>
    )
}





