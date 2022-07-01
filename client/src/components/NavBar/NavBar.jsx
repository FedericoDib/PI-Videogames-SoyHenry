import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import s from "./NavBar.module.css";

export default function Navbar () {
    return (
        //TODO
            <div className={s.navbar}>
                <Link to="/videogames" className={s.navlink}>Home</Link>
                <Link to='/create' className={s.navlink}>Insert Videogame</Link>
                <SearchBar/>
                <h1 className={s.title}>Video-Game Database</h1>
            </div>
    )
}


