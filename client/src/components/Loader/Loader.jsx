import React from 'react'
import image from '../../XVo6.gif'
import styled from 'styled-components'

const LoaderStyled = styled.img`
  width: 20%;
  height: 20%;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    align-self: center;
  }
  `

const Loader = () => {
  return (
    <LoaderStyled src={image} alt="" />
  )
}

export default Loader