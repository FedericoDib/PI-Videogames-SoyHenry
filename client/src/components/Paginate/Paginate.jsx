import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import notFound from "../../ea714c1e-3eb1-434f-b553-f222542a259b.jpg"
import { PaginateNav, PaginateUl, PaginateButton, StyledImgNotFound, StyledP, PaginateDiv, PaginatePlus } from "./Paginate";


export default function Paginate({videogamesPerPage, videogames, paginate}) {

    const currentPage = useSelector(state => state.currentPage);

    useEffect(() => {
        document.querySelectorAll('button').forEach(button => button.classList.remove('active'));
        document.getElementById(`${currentPage}`).classList.add('active');
    }, [currentPage]);

    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(videogames / videogamesPerPage); i++) {
        pageNumbers.push(i);
    }
    let aux = pageNumbers;

    if (aux.length > 2) {
        if (currentPage === 1) {
            aux = pageNumbers.slice(0, 3);
        } else if (currentPage === pageNumbers.length) {
            aux = pageNumbers.slice(pageNumbers.length - 3, pageNumbers.length);
        } else {
            aux = pageNumbers.slice(currentPage - 2, currentPage + 1);
        }
    }

    const handlePrevNext = (e) => {
        if (e.target.id === "prev") {
            // document.getElementById(`${currentPage}`).classList.remove('active');
            currentPage > 1 ? paginate(currentPage - 1) : paginate(1);
            document.getElementById(`prev`).classList.remove('active');
            // currentPage > 1 ? document.getElementById(`${currentPage - 1}`).classList.add("active") : document.getElementById(`${1}`).classList.add("active");
        } else {
            // document.getElementById(`${currentPage}`).classList.remove('active');
            currentPage < pageNumbers.length ? paginate(currentPage + 1) : paginate(pageNumbers.length);
            document.getElementById(`next`).classList.remove('active');
            // currentPage < pageNumbers.length ? document.getElementById(`${currentPage + 1}`).classList.add("active") : document.getElementById(`${pageNumbers.length}`).classList.add("active");
        }
    }

    return(
        <PaginateNav>
            <PaginateUl>
                <PaginatePlus id="prev" onClick={handlePrevNext}>-</PaginatePlus>
                    <PaginateDiv>
                        <StyledP>...</StyledP>
                        {aux.length ? (aux.map(num => 
                        <li key={num}>
                            <PaginateButton className={num === 1 ? "active" : null} id={num} onClick={() => paginate(num)}>{num}</PaginateButton>
                        </li>)) : 
                        <div>
                            <li key='1'><PaginateButton className="active" id='1' onClick={() => paginate(1)}>1</PaginateButton></li>
                            <StyledImgNotFound src={notFound} alt="not found"/>
                            <h1>No videogames found</h1>
                        </div>
                        }
                        <StyledP>...</StyledP>
                    </PaginateDiv>
                <PaginatePlus id="next" onClick={handlePrevNext}>+</PaginatePlus>
            </PaginateUl>
        </PaginateNav>
    )
}