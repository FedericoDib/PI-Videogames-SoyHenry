import React from "react";
import { NavLink } from "react-router-dom";
import { DivStyled, ImgStyled } from "./CardVideogame"


export default function CardVideogame({id, name, image, genres, currentVideogames}) {
    let urlImage;
    if (image?.includes("media/games")) {
        const idImage = image.slice(image.indexOf("/games/") + 7, image.indexOf("/games/") + 10);
        const idGame = image.slice(image.indexOf("/games/") + 11, image.indexOf("/games/") + 43);
        urlImage = `https://media.rawg.io/media/crop/600/400/games/${idImage}/${idGame}.jpg`;
    } else if (image?.includes("media/screenshots")) {
        const idImageResize = image.slice(image.indexOf("/") + 34, image.indexOf(".") + 30);
        const idImageResized = image.slice(image.indexOf("/") + 38, image.indexOf(".") + 63);
        urlImage = `https://media.rawg.io/media/resize/640/-/screenshots/${idImageResize}/${idImageResized}.jpg`;
    }
    return (
        <DivStyled>
            <NavLink style={({textDecoration: 'none'})} to={`/videogame/${id}`}>
                <ImgStyled image={urlImage ? urlImage : image}>
                    <h4>{name}</h4>
                    <h5>{genres}</h5>
                </ImgStyled>
            </NavLink>
        </DivStyled>
    );
};