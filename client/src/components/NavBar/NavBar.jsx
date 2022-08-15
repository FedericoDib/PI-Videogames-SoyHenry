import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import s from "./NavBar.module.css";

export default function Navbar ({paginate}) {
    return (
            <div className={s.navbar}>
                <div className={s.container}>
                    <Link to='/create' className={s.navlink}>Insert Videogame</Link>
                    <SearchBar paginate={paginate}/>
                </div>
                <div className={s.containerTwo}>
                    <h1 className={s.title}>Video Game Database</h1>
                </div>
            </div>
    )
}


