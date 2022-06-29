import React from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import img from '../../ZS3t.gif'

const DivStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

const ButtonStyled = styled.button`
  background-color: #fbeee0;
  border: 2px solid rgba(9,56,121,1);
  border-radius: 30px;
  box-shadow: rgba(9,56,121,1) 4px 4px 0 0;
  color: rgba(9,56,121,1);
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  text-transform: uppercase;
  font-family: 'Press Start 2P', cursive;

&:hover {
  background-color: #fff;
  transform: translateY(-2px);
}

&:active {
  box-shadow: #422800 2px 2px 0 0;
  transform: translate(2px, 2px);
}
`

const ImgStyled = styled.img`
  height: 300px;
  width: 400px;
`

export default function LandingPage() {

  return (
      <DivStyled>
        <ImgStyled src={img} alt="img not found" />
        <Link to='/videogames'><ButtonStyled>Start</ButtonStyled></Link>
      </DivStyled>
    )
};