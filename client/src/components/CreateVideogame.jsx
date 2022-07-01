import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {createVideogame} from '../redux/actions/index.js'

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    `

const DivStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    border: 2px solid #ddd;
    color: #ddd;
    background-image: linear-gradient( 89.7deg,  rgba(132,53,142,1) 2.8%, rgba(0,32,95,1) 97.8% );
    padding: 40px;
    border-radius: 10px;`

export class CreateVideogame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      released: '',
      rating: '',
      background_image: '',
      platforms: '',
      genres: [],
    }
      
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
   }

  handleSubmit(e) {
    e.preventDefault()
    this.props.createVideogame(this.state)
  }

  render() {
    return (
        <>
        <FormStyled action="" onSubmit={this.handleSubmit}>
            <DivStyled className="div_container">
                <div>CreateVideogame</div>
                <label htmlFor="name">Name</label>
                <input onChange={this.handleChange} type="text" id="name" name="name" />
                <label htmlFor="description">Description</label>
                <input onChange={this.handleChange} type="text" id="description" name="description" />
                <label htmlFor="released">Released</label>
                <input onChange={this.handleChange} type="text" id="released" name="released" />
                <label htmlFor="rating">Rating</label>
                <input onChange={this.handleChange} type="text" id="rating" name="rating" />
                <label htmlFor="platforms">Platforms</label>
                <input type="text" id="platforms" name="platforms" />
                <label htmlFor="genres">Genres</label>
                <input type="text" id="genres" name="genres" />
                <label htmlFor="background_image">Background Image</label>
                <input type="text" id="background_image" name="background_image" />
                <button type="submit">Submit</button>
            </DivStyled>
        </FormStyled>
      </>
    )
  }
}

function mapStateToProps(state) {
    return {
      detail: state.detailVideogame
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createVideogame: videogame => dispatch(createVideogame(videogame)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateVideogame);