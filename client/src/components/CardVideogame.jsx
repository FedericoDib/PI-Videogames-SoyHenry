import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
//import ResizeImg from "./ResizeImg.jsx";

const ImgStyled = styled.div`
    color: #fff;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    line-height: 1.5;
    letter-spacing: 0.09em;
    align-items: center;
    width: 280px;
    height: 400px;
    background-image: ${props => `url(${props.image})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-blend-mode: multiply;
    background-color: rgba(0,0,0,0.65);
    transition: all 0.5s ease-in-out;
`

const DivStyled = styled.div`
    margin: 15px;
    font-size: 0.8rem;
    box-shadow: #111 6px 6px;
    border: 2px solid #111;
    overflow: hidden;
    &:hover ${ImgStyled} {
        transform: scale(1.05);
        background-color: rgba(0,0,0,0.4);
    }
    &:hover h4 {
        transform: scale(0.95);
        transition: all 0.5s ease-in-out;
    }

    &:hover h5 {
        transform: scale(0.95);
        transition: all 0.5s ease-in-out;
    }
`;

export default function CardVideogame({id, name, image, genres}) {
    console.log(genres);
    return (
        <DivStyled>
            <NavLink style={({textDecoration: 'none'})} to={`/videogame/${id}`}>
                {/* <ResizeImg img={image} width='280' height="400">
                    <h4>{name}</h4>
                    <h5>{genres}</h5>
                </ResizeImg> */}
                <ImgStyled image={image}>
                    <h4>{name}</h4>
                    <h5>{genres}</h5>
                </ImgStyled>
            </NavLink>
        </DivStyled>
    );
};