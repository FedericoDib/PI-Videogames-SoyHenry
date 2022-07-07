import React from 'react';
import {Link} from 'react-router-dom';
import img from '../../ZS3t.gif'
import {DivStyled, ButtonStyled, ImgStyled} from "./LandingPage"

export default function LandingPage() {

  return (
      <DivStyled>
        <ImgStyled src={img} alt="img not found" />
        <Link to='/videogames'><ButtonStyled>Start</ButtonStyled></Link>
      </DivStyled>
    )
};