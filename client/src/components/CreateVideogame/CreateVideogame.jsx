import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {getGenres, getPlatforms, createVideogame, getAllVideogames} from '../../redux/actions/index.js'
import { FormStyled, DivFormStyled, DivGPStyled, DivSelectButton, DivInputsStyled, DivStyled, ButtonStyled, SpanStyled } from './CreateVideogame'

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
  }
  
  handleChange(event) {

    this.setState({
      newVideogame: {
        ...this.state.newVideogame,
        [event.target.name]: event.target.value
      }
    })
    console.log(this.state.errors)
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('hola')

    if (Object.values(this.state.errors).every(el => el === '') && Object.values(this.state.newVideogame).every(el => el !== '' && el !== 0 && el.length !== 0)) {
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

  handleErrors(e) {

    if (!e){
      return this.state.errors
    }

    let errors = {
      ...this.state.errors
    }

    document.querySelectorAll('input').forEach(input => {
      input.classList.remove('error')
    })
    document.querySelectorAll('textarea').forEach(textarea => {
      textarea.classList.remove('error')
    })
    document.querySelectorAll('select').forEach(select => {
      select.classList.remove('error')
    })
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

    if (e.target.name === 'rating' && (e.target.value < 0 || e.target.value > 5 || isNaN(e.target.value))) {
      console.log("🚀 ~ file: CreateVideogame.jsx ~ line 137 ~ CreateVideogame ~ handleErrors ~ isNaN(e.target.value)", isNaN(e.target.value))
      errors[e.target.name] = 'Rating must be between 0 and 5'
      document.getElementById(`${e.target.id}`).classList.add('error')
    }

    console.log(errors)

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