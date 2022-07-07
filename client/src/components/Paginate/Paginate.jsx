import React from "react";
import notFound from "../../ea714c1e-3eb1-434f-b553-f222542a259b.jpg"
import { PaginateNav, PaginateUl, PaginateButton, StyledImgNotFound } from "./Paginate";


export default function Paginate({videogamesPerPage, videogames, paginate}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(videogames / videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <PaginateNav>
            <PaginateUl>
                {pageNumbers.length ? (pageNumbers.map(num => <li key={num}><PaginateButton className={num === 1 ? "active" : null} id={num} onClick={() => paginate(num)}>{num}</PaginateButton></li>)) : 
                <div>
                    <li key='1'><PaginateButton className="active" id='1' onClick={() => paginate(1)}>1</PaginateButton></li>
                    <StyledImgNotFound  src={notFound} alt="not found"/>
                    <h1>No videogames found</h1>
                </div>
                }
            </PaginateUl>
        </PaginateNav>
    )
}