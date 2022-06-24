/* eslint-disable no-unused-vars */
import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllVideogames} from '../../redux/actions/index.js';
//import {Link} from "react-router-dom";
import CardVideogame from '../CardVideogame.jsx';
import NavBar from '../NavBar/NavBar.jsx';
import s from "./Home.module.css";

export default function Home() {
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames);
//    const [videogameList, setVideogameList] = useState([]);

    useEffect(() => {
        dispatch(getAllVideogames());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleReload = (e) => {
        e.prevent.default()
        dispatch(getAllVideogames());
    }

    return (
        <>
            <NavBar></NavBar>
            <div className={s.div_container}>
                <h1>Video-Game Database</h1>
                <button onClick={handleReload}>Reload Videogames</button>
                <select>
                    <option value=''> </option>
                    <option value='asc'>Asc</option>
                    <option value='desc'>Desc</option>
                </select>
            </div>
            <div className={s.div_videogames__container}>
            {
                videogames && videogames.map(videogame => {
                    return <CardVideogame name={videogame.name} image={videogame.background_image} genres={videogame.genres}/>
                })
            }
            </div>
        </>
    )
}
