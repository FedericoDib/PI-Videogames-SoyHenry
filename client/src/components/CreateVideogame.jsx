import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {getGenres, getPlatforms, createVideogame, getAllVideogames} from '../redux/actions/index.js'

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
    margin-top: 20px;
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
    color: #111;
    box-shadow: 3px 3px #111;
    align-items: left;
    padding-left: 1.5rem;
    resize: none;
    &:focus {
      outline: none;
    }
    &.error {
      border: 2px solid hsl(0, 69%, 50%);
      box-shadow: 3px 3px hsl(10, 95%, 21%);
    }
  }
  textarea {
    margin-bottom: 10px;
    &.error {
      border: 2px solid hsl(0, 69%, 50%);
      box-shadow: 3px 3px hsl(10, 95%, 21%);
    }
  }
  label {
    font-size: 0.85rem;
    width: 30%;
    text-align: left;
    margin: 20px;
  }
  select {
    font-family: 'Press Start 2P', cursive;
    width: 80%;
    margin: 0 20px 10px 20px;
    padding: 10px;
    border: 2px solid #111;
    color: #111;
    box-shadow: 3px 3px #111;
    &:focus {
      outline: none;
    }
    &.error {
      border: 2px solid hsl(0, 69%, 50%);
      box-shadow: 3px 3px hsl(10, 95%, 21%);
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
    span{
      text-align: center;
    }
`

const SpanStyled = styled.span`
  text-align: end;
  padding: 0 10px;
  width: 100%;
  font-size: 0.6rem;
  border-radius: 5px;
  color: hsl(0, 69%, 50%);`

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
      errors: {
        name: '',
        description: '',
        released: '',
        rating: '',
        image: '',
        platforms: '',
        genres: '',
      }
    }
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
    // this.handleErrors()
  }
  
  handleChange(event) {
    this.setState({
      newVideogame: {
        ...this.state.newVideogame,
        [event.target.name]: event.target.value
      }
    })
    // this.handleErrors()
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('hola')

    //verificar que las propiedades del state errors esten vacias

    if (Object.values(this.state.errors).every(el => el === '') && Object.values(this.state.newVideogame).every(el => el !== '' && el !== 0 && el !== [])) {
      this.props.getAllVideogames().then(() => {
        console.log(this.props.videogames)
        const videogame = this.props.videogames.find(videogame => videogame.name === this.state.newVideogame.name)
        console.log(videogame)
        if (videogame) {
          alert('Videogame already exists')
          this.props.history.push('/videogame/' + videogame.id)
        } else {
          this.props.createVideogame(this.state.newVideogame)
          alert('Videogame created!')
          this.props.history.push('/videogames')
        }
       }) 
    } else {
      alert('Please fill in all the fields')
      }
}

  handlePlatforms(event) {
    if (!this.state.newVideogame.platforms.includes(event.target.value)) {
      this.setState({
        newVideogame: {
          ...this.state.newVideogame,
          platforms: [...this.state.newVideogame.platforms, event.target.value]
        }
      })
    }
    // this.handleErrors()
  }

  handleGenres(event) {
    if (!this.state.newVideogame.genres.includes(event.target.value)) {
      this.setState({
        newVideogame: {
          ...this.state.newVideogame,
          genres: [...this.state.newVideogame.genres, event.target.value]
        }
      })
    }
    // this.handleErrors()
  }

  handleDelete(event) {
    this.setState({
      newVideogame: {
        ...this.state.newVideogame,
        platforms: this.state.newVideogame.platforms.filter(platform => platform !== event.target.id),
        genres: this.state.newVideogame.genres.filter(genre => genre !== event.target.id)
      }
    })
    // this.handleErrors()
  }

  handleErrors(e) {

    if (!e){
      return this.state.errors
    }

    const errors = {}

    document.querySelectorAll('input').forEach(input => {
      input.classList.remove('error')
    })
    document.querySelectorAll('textarea').forEach(textarea => {
      textarea.classList.remove('error')
    }
    )
    document.querySelectorAll('select').forEach(select => {
      select.classList.remove('error')
    }
    )

    if (!e.target.value) {
      errors[e.target.name] = `${e.target.name} is required`
      document.getElementById(`${e.target.id}`).classList.add('error')
    } else (
      errors[e.target.name] = ''
    )

    if (e.target.name === 'name' && (e.target.value && e.target.value.length < 3)) {
      errors[e.target.name] = 'Name must be at least 3 characters'
      document.getElementById(`${e.target.id}`).classList.add('error')
    }

    if (e.target.name === 'rating' && (e.target.value < 0 || e.target.value > 5)) {
      errors[e.target.name] = 'Rating must be between 0 and 5'
      document.getElementById(`${e.target.id}`).classList.add('error')
    }
    
    // if (this.state.newVideogame.name === '') {
    //   errors.name = 'Name is required'
    //   document.getElementById('name').classList.add('error')
    // }
    // if (this.state.newVideogame.description === '') {
    //   errors.description = 'description is required'
    //   document.getElementById('description').classList.add('error')
    // }
    // if (this.state.newVideogame.released === '') {
    //   errors.released = 'released is required'
    //   document.getElementById('released').classList.add('error')
    // }
    // if (this.state.newVideogame.rating === '') {
    //   errors.rating = 'rating is required'
    //   document.getElementById('rating').classList.add('error')
    // }
    // if (this.state.newVideogame.image === '') {
    //   errors.image = 'image is required'
    //   document.getElementById('image').classList.add('error')
    // }
    // if (this.state.newVideogame.platforms.length === 0) {
    //   errors.platforms = 'platforms is required'
    //   document.getElementById('platforms').classList.add('error')
    // }
    // if (this.state.newVideogame.genres.length === 0) {
    //   errors.genres = 'genres is required'
    //   document.getElementById('genres').classList.add('error')
    // }

    this.setState({
      errors: errors
    })
    console.log(this.state.newVideogame)
    console.log(this.state.errors)
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
                  <input onFocus={(e) => this.handleErrors(e)} onBlur={(e) => this.handleErrors(e)} onChange={this.handleChange} type="text" id="name" name="name" placeholder="Name..."/>
                </DivStyled>
                  <SpanStyled>{this.state.errors.name && <p>{this.state.errors.name}</p>}</SpanStyled>
                <DivStyled>
                  <label htmlFor="released">Released:</label>
                  <input onFocus={(e) => this.handleErrors(e)} onBlur={(e) => this.handleErrors(e)} onChange={this.handleChange} type="text" id="released" name="released" placeholder="Date of release..."/>
                </DivStyled>
                <SpanStyled>{this.state.errors.released && <p>{this.state.errors.released}</p>}</SpanStyled>
                <DivStyled>
                  <label htmlFor="rating">Rating:</label>
                  <input onFocus={(e) => this.handleErrors(e)} onBlur={(e) => this.handleErrors(e)} onChange={this.handleChange} type="number" min="0" max="5" step="0.1" id="rating" name="rating" placeholder="Game rating (0-5)..."/>
                </DivStyled>
                <SpanStyled>{this.state.errors.rating && <p>{this.state.errors.rating}</p>}</SpanStyled>
                <DivStyled>
                  <label htmlFor="image">Image:</label>
                  <input onFocus={(e) => this.handleErrors(e)} onBlur={(e) => this.handleErrors(e)} onChange={this.handleChange} type="text" id="image" name="image" placeholder="Image link..."/>
                </DivStyled>
                <SpanStyled>{this.state.errors.image && <p>{this.state.errors.image}</p>}</SpanStyled>
                <DivStyled>
                  <label htmlFor="description">Description:</label>
                  <textarea onFocus={(e) => this.handleErrors(e)} onBlur={(e) => this.handleErrors(e)} rows='5' onChange={this.handleChange} id="description" name="description" placeholder="Description..."/>
                </DivStyled>
                <SpanStyled>{this.state.errors.description && <p>{this.state.errors.description}</p>}</SpanStyled>
                <DivGPStyled>
                <label htmlFor="platforms">Platforms:</label>
                  <select id='platforms' onFocus={(e) => this.handleErrors(e)} onBlur={(e) => this.handleErrors(e)} onChange={this.handlePlatforms} name="platforms">
                    <option id='optionPlatforms' selected hidden value="">Select Platform</option>
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
                  <SpanStyled>{this.state.errors.platforms && <p>{this.state.errors.platforms}</p>}</SpanStyled>
                </DivGPStyled>
                
                  <DivGPStyled>
                  <label htmlFor="genres">Genres:</label>
                  <select id='genres' onFocus={(e) => this.handleErrors(e)} onBlur={(e) => this.handleErrors(e)} onChange={this.handleGenres} name="genres">
                    <option id='optionGenres' selected hidden value="">Select a genre</option>
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
                  <SpanStyled>{this.state.errors.genres && <p>{this.state.errors.genres}</p>}</SpanStyled>
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
      videogames: state.videogames
    };
}

function mapDispatchToProps(dispatch) {
    return {
      getAllVideogames: () => dispatch(getAllVideogames()),
      getPlatforms: () => dispatch(getPlatforms()),
      getGenres: () => dispatch(getGenres()),
      createVideogame: videogame => dispatch(createVideogame(videogame)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateVideogame);