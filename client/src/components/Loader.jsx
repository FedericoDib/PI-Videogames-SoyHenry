import React from 'react'
import image from '../XVo6.gif'
import styled from 'styled-components'

const LoaderStyled = styled.img`
  width: 20%;
  height: 20%;
  `

const Loader = () => {
  return (
    <LoaderStyled src={image} alt="" />
  )
}

export default Loader