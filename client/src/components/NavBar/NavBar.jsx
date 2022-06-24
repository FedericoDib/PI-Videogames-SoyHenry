import React from "react";
import { Link } from "react-router-dom";
import s from "./NavBar.module.css";

export default function Navbar () {
    return (
        //TODO
            <nav className={s.navbar}>
                <Link to="/" className={s.navlink}>Home</Link>
                <Link to='/videogame' className={s.navlink}>Insert Videogame</Link>
            </nav>
    )
}


