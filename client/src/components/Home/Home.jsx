/* eslint-disable no-unused-vars */
import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllVideogames, getGenres, filterVideogamesByName, filterVideogamesByGenre, filterVideogamesByRating} from '../../redux/actions/index.js';
//import {Link} from "react-router-dom";
import CardVideogame from '../CardVideogame.jsx';
import s from "./Home.module.css";
import Paginate from "../Paginate.jsx";
import Select from "../Select/Select.jsx";

export default function Home() {
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames);
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame) ;
    const [listOfVideogames, setListOfVideogames] = useState(currentVideogames);

    const paginate = pageNumber => setCurrentPage(pageNumber);


    useEffect(() => {
        dispatch(getAllVideogames());
        dispatch(getGenres())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleReload = () => {
        //e.preventDefault(); ?
        dispatch(getAllVideogames());
    }

    const handleFilterByName = (e) => {
        setListOfVideogames(dispatch(filterVideogamesByName(e.target.value)));
        setCurrentPage(1);
        //TODO: checkear si podemos rerenderizar de otra forma
    }

    const handleFilterByGenre = (e) => {
        setListOfVideogames(dispatch(filterVideogamesByGenre(e.target.value)));
        setCurrentPage(1);
    }

    const handleFilterByRating = (e) => {
        setListOfVideogames(dispatch(filterVideogamesByRating(e.target.value)));
        setCurrentPage(1);
    }

    return (
        <div className={s.div_home}>
            <h1>Video-Game Database</h1>
            <div className={s.div_container}>
                <button className={s.reload_button} onClick={handleReload}>Reload DB</button>
                <Select filterName={handleFilterByName} filterGenre={handleFilterByGenre} filterRating={handleFilterByRating}></Select>
            </div>
            <div>
                <Paginate videogamesPerPage={videogamesPerPage} videogames={videogames.length} paginate={paginate}/>
            </div>
            <div className={s.div_videogames__container}>
            {
                currentVideogames?.map(videogame => {
                    console.log(videogame.genre);
                    return <CardVideogame id={videogame.id} name={videogame.name} image={videogame.image} genres={videogame.genres}/>
                })
            }
            </div>
        </div>
    )
}
