/* eslint-disable no-unused-vars */
import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllVideogames, getGenres, filterVideogamesByName, filterVideogamesByGenre, filterVideogamesByRating, filterVideogamesByCreation, clearDetails} from '../../redux/actions/index.js';
import CardVideogame from '../CardVideogame/CardVideogame.jsx';
import s from "./Home.module.css";
import Paginate from "../Paginate/Paginate.jsx";
import Select from "../Select/Select.jsx";
import Loader from "../Loader/Loader.jsx";
import Navbar from "../NavBar/NavBar.jsx";
import notFound from "../../ea714c1e-3eb1-434f-b553-f222542a259b.jpg"

export default function Home() {
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames);
    const actualVideogames = useSelector(state => state.actualVideogames)
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame) ;
    const [listOfVideogames, setListOfVideogames] = useState(currentVideogames);

    function paginate(pageNumber) {
        setCurrentPage(pageNumber)
        document.querySelectorAll('button').forEach(button => button.classList.remove('active'));
        document.getElementById(`${pageNumber}`).classList.add("active");
    }    

    useEffect(() => {
        dispatch(getAllVideogames());
        dispatch(getGenres());
        dispatch(clearDetails())
    }, [dispatch]);


    const handleFilterByName = (e) => {
        setListOfVideogames(dispatch(filterVideogamesByName(e.target.value)));
        document.getElementById(`${currentPage}`).classList.remove('active');
        document.getElementById(`1`).classList.add("active");
        setCurrentPage(1);
    }

    const handleFilterByGenre = (e) => {
        setListOfVideogames(dispatch(filterVideogamesByGenre(e.target.value)));
        document.getElementById(`${currentPage}`).classList.remove('active');
        document.getElementById(`1`).classList.add("active");
        setCurrentPage(1);
    }

    const handleFilterByRating = (e) => {
        setListOfVideogames(dispatch(filterVideogamesByRating(e.target.value)));
        document.getElementById(`${currentPage}`).classList.remove('active');
        document.getElementById(`1`).classList.add("active");
        setCurrentPage(1);
    }

    const handleFilterByCreation = (e) => {
        setListOfVideogames(dispatch(filterVideogamesByCreation(e.target.value)));
        document.getElementById(`${currentPage}`).classList.remove('active');
        document.getElementById(`1`).classList.add("active");
        setCurrentPage(1);
    }

    const handleFilterClear = () => {
        setListOfVideogames(dispatch(getAllVideogames()));
        document.querySelectorAll('option').forEach(option => option.selected = false);
        document.getElementById('search').value = "";
        document.getElementById(`${currentPage}`).classList.remove('active');
        document.getElementById(`1`).classList.add("active");
        setCurrentPage(1);
    }

    return (
        <div className={s.div_home}>
            <Navbar filterClear={handleFilterClear} paginate={paginate}></Navbar>
            <div className={s.div_container}>
                <Select filterName={handleFilterByName} filterGenre={handleFilterByGenre} filterCreated={handleFilterByCreation} filterRating={handleFilterByRating} filterClear={handleFilterClear}></Select>
            </div>
            <div>
                <Paginate videogamesPerPage={videogamesPerPage} videogames={videogames.length} paginate={paginate}/>
            </div>
            
            {   
                currentVideogames.length ? (
                <div className={s.div_videogames__container}> {
                    currentVideogames.map(videogame => {
                        return (<CardVideogame currentVideogames={currentVideogames} key={videogame.id} id={videogame.id} name={videogame.name} image={videogame.image} genres={videogame.genres}/>)
                        })
                }
                </div>) 
                
                : null
            }
            
        </div>
    )
}
