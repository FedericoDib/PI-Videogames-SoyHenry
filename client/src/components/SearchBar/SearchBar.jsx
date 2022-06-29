import React from "react";
import { useDispatch } from "react-redux";
import s from "./SearchBar.module.css";
import { getVideogamesByName } from "../../redux/actions";

export const SearchBar = ({onChange}) => {
    const dispatch = useDispatch()
    const handleChange = (e) => {
        dispatch(getVideogamesByName(e.target.value));
    }
    return (
        <div>
            <input className={s.searchBar}
                type="text"
                onChange={handleChange}
                placeholder="Search..."
            />
        </div>
    );
}