import React from "react";
import styled from "styled-components";

const PaginateNav = styled.nav`
  display: flex;
  justify-content: center;
  margin: 30px;
  `;

const PaginateUl = styled.ul`
    display: flex;
    list-style: none;
`;

const PaginateButton = styled.button`
    font-family: 'Press Start 2P', cursive;
    font-size: 1rem;
    color: #FAFAFA;
    text-transform: uppercase;
    text-decoration: none;
    padding: 15px 20px;
    border: 2px solid #111;
    background: rgba(9,56,121,1);
    box-shadow: 3px 3px #111;
    cursor: pointer;
    margin-right: 20px;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: #fedeff;
        color: rgba(9,56,121,1);
        transform: translateY(-4px);
    }

    &:active {
        background-color: #fedeff;
        color: rgba(9,56,121,1);
        transform: translate(2px, 2px);
    }

`




export default function Paginate({videogamesPerPage, videogames, paginate}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(videogames / videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return( 
        <PaginateNav>
            <PaginateUl>
                {pageNumbers && pageNumbers.map(num => (
                    <li key={num}><PaginateButton onClick={() => paginate(num)}>{num}</PaginateButton></li>
                ))}
            </PaginateUl>
        </PaginateNav>
    )
}