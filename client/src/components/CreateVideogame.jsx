import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {getGenres, getPlatforms, createVideogame} from '../redux/actions/index.js'

const FormStyled = styled.form`
    font-family: 'Press Start 2P', cursive;
    letter-spacing: 1px;
    font-size: 0.8rem;
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 30px 0;
    `

const DivFormStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    border: 2px solid #ddd;
    color: #ddd;
    background-image: linear-gradient( 89.7deg,  rgba(132,53,142,1) 2.8%, rgba(0,32,95,1) 97.8% );
    padding: 40px;
    box-shadow: 7px 7px #111;
  `

  const DivStyled = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    `

const DivInputsStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 40px;
  input, textarea {
    font-family: 'Press Start 2P', cursive;
    width: 100%;
    padding: 10px;
    border: 2px solid #111;
    border-radius: 5px;
    color: #111;
    box-shadow: 3px 3px #111;
    align-items: left;
    padding-left: 1.5rem;
    resize: none;
    &:focus {
      outline: none;
    }
  }
  label {
    font-size: 0.85rem;
    width: 30%;
    text-align: left;
  }
  select {
    font-family: 'Press Start 2P', cursive;
    width: 80%;
    margin: 10px;
    padding: 10px;
    border: 2px solid #111;
    border-radius: 5px;
    color: #111;
    box-shadow: 3px 3px #111;
    &:focus {
      outline: none;
    }
  }
`
const ButtonStyled = styled.button`
  font-family: 'Press Start 2P', cursive;
  font-size: 0.9rem;
  color: #FAFAFA;
  text-transform: uppercase;
  text-decoration: none;
  padding: 20px 20px;
  border: 2px solid #111;
  background: #572e7e;
  box-shadow: 3px 3px #111;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-right: 15px;
  &:hover {
      background-color: #fedeff;
      color: rgba(9,56,121,1);
      transform: translateY(-4px);
  }
`

const DivSelectButton = styled.div`
  display: flex;
  background-color: #111;
  color: #FAFAFA;
  margin: 5px;
  padding: 10px;
  border: 2px solid #ddd;
  button {
    padding: 5px;
    margin: 5px 0px;
    }
    `

    const DivGPStyled = styled.div`
    display: flex;
    width: 50%;
    flex-direction: column;
    align-items: center;
`

export class CreateVideogame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newVideogame: {
        name: '',
        description: '',
        released: '',
        rating: '',
        image: '',
        platforms: [],
        genres: [],
      },
      errors: []
    }
    console.log(this.state.platforms)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleGenres = this.handleGenres.bind(this)
    this.handlePlatforms = this.handlePlatforms.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleErrors = this.handleErrors.bind(this)
  }

  componentDidMount() {
    this.props.getGenres()
    this.props.getPlatforms()
    this.handleErrors()
    console.log(this.state.errors)
  }
  
  handleChange(event) {
    this.handleErrors()
    console.log(this.state.errors)
    this.setState({
      newVideogame: {
        ...this.state.newVideogame,
      [event.target.name]: event.target.value
      }
   })
  }

  handleSubmit(e) {
    e.preventDefault()
    
    console.log(this.state.newVideogame)
    this.props.createVideogame(this.state.newVideogame)
  }

  handlePlatforms(event) {
    this.handleErrors()
    console.log(this.state.errors)
    if (!this.state.newVideogame.platforms.includes(event.target.value)) {
    this.setState({
      newVideogame: {
        ...this.state.newVideogame,
        platforms: [...this.state.newVideogame.platforms, event.target.value]
      }
    })
  }
  }

  handleGenres(event) {
    this.handleErrors()
    console.log(this.state.errors)
    if (!this.state.newVideogame.genres.includes(event.target.value)) {
    this.setState({
      newVideogame: {
        ...this.state.newVideogame,
        genres: [...this.state.newVideogame.genres, event.target.value]
      }
    })
  }
  }

  handleDelete(event) {
    this.setState({
      newVideogame: {
        ...this.state.newVideogame,
        platforms: this.state.newVideogame.platforms.filter(platform => platform !== event.target.id),
        genres: this.state.newVideogame.genres.filter(genre => genre !== event.target.id)
      }
    })
  }

  handleErrors() {
    const errors = []
    if (this.state.newVideogame.name === '') {
      errors.push('Name is required')
    }
    if (this.state.newVideogame.description === '') {
      errors.push('Description is required')
    }
    if (this.state.newVideogame.released === '') {
      errors.push('Released is required')
    }
    if (this.state.newVideogame.rating === '') {
      errors.push('Rating is required')
    }
    if (this.state.newVideogame.image === '') {
      errors.push('Image is required')
    }
    if (this.state.newVideogame.platforms.length === 0) {
      errors.push('Platform is required')
    }
    if (this.state.newVideogame.genres.length === 0) {
      errors.push('Genre is required')
    }
    this.setState({
      errors: errors
    })
  }

  render() {
    return (
        <>
          <FormStyled action="" onSubmit={this.handleSubmit}>
            <DivFormStyled>
              <DivStyled>
                <h1>Create a videogame</h1>
                <Link to='/videogames'><ButtonStyled>Back</ButtonStyled></Link>
              </DivStyled>
              <DivInputsStyled>
                <DivStyled>
                  <label htmlFor="name">Name:</label>
                  <input onChange={this.handleChange} type="text" id="name" name="name" />
                </DivStyled>
                <DivStyled>
                  <label htmlFor="released">Released:</label>
                  <input onChange={this.handleChange} type="text" id="released" name="released" />
                </DivStyled>
                <DivStyled>
                  <label htmlFor="rating">Rating:</label>
                  <input onChange={this.handleChange} type="text" id="rating" name="rating" />
                </DivStyled>
                <DivStyled>
                  <label htmlFor="image">Image:</label>
                  <input onChange={this.handleChange} type="text" id="image" name="image" />
                </DivStyled>
                <DivStyled>
                  <label htmlFor="description">Description:</label>
                  <textarea rows='5' onChange={this.handleChange} id="description" name="description" />
                </DivStyled>
                <DivGPStyled>
                <label htmlFor="platforms">Platforms:</label>
                  <select onChange={this.handlePlatforms} name="platforms">
                    <option selected disabled value="Platform">Select Platform</option>
                    {this.props.platforms.map(platform => (
                      <option key={platform.id} value={platform.name}>{platform.name}</option>
                    ))}
                  </select>
                  {
                    this.state.newVideogame.platforms.map(platform => (
                      <DivSelectButton>
                        <h5 key={platform}>{platform}</h5>
                        <ButtonStyled type="button" id={platform} onClick={this.handleDelete}>x</ButtonStyled>
                      </DivSelectButton>
                    ))
                  }
                </DivGPStyled>
                
                  <DivGPStyled>
                  <label htmlFor="genres">Genres:</label>
                  <select onChange={this.handleGenres} name="genres">
                    <option selected disabled value="">Select a genre</option>
                    {this.props.genres.map(genre => (
                      <option key={genre.id} value={genre.name}>{genre.name}</option>
                    ))}
                  </select>

                {
                    this.state.newVideogame.genres.map(genre => (
                      <DivSelectButton>
                        <h5 key={genre}>{genre}</h5>
                        <ButtonStyled type="button" id={genre} onClick={this.handleDelete}>x</ButtonStyled>
                      </DivSelectButton>
                    ))
                  }
                  </DivGPStyled>
                  
                  
              </DivInputsStyled>
              <ButtonStyled type="submit">Create</ButtonStyled>
            </DivFormStyled>
          </FormStyled>
        </>
    )
  }
}

function mapStateToProps(state) {
  //TODO - ver si hace falta esto o no jaja
  return {
      genres: state.genres,
      platforms: state.platforms,
    };
}

function mapDispatchToProps(dispatch) {
    return {
      getPlatforms: () => dispatch(getPlatforms()),
      getGenres: () => dispatch(getGenres()),
      createVideogame: videogame => dispatch(createVideogame(videogame)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateVideogame);