import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ImgStyled = styled.div`
    color: #fff;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #121e39;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-image: ${props => `url(${props.image})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-blend-mode: multiply;
    background-color: rgba(0,0,0,0.7);
    transition: all 0.5s ease-in-out;
`

const DivStyled = styled.div`
    font-size: 1rem;
    box-shadow: #121e39 4px 4px 0 0;
    border-radius: 10px;
    height: 400px;
    width: 300px;
    overflow: hidden;
    &:hover ${ImgStyled} {
        transform: scale(1.05);
        background-color: rgba(0,0,0,0.4);
    }
`;

export default function CardVideogame({name, image, genres}) {
    return (
        <DivStyled>
            <NavLink style={({textDecoration: 'none'})} to='/videogame/id'>
                <ImgStyled image={image}>
                    <h3>{name}</h3>
                    <h5>{genres}</h5>
                </ImgStyled>
            </NavLink>
        </DivStyled>
    )
}