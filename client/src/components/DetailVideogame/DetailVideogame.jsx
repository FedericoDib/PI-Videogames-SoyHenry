import React from "react";
import { connect } from 'react-redux';
import { getDetailVideogame, deleteVideogame } from '../../redux/actions/index.js';
import s from "./DetailVideogame.module.css";
import {Link} from "react-router-dom";
import Loader from "../Loader/Loader.jsx";

class DetailVideogame extends React.Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getDetailVideogame(id)
    }

	render() {
        return (
        <div className={s.div_container}>
            <div className={s.div_container_videogame}>
                <div className={s.div_title}>
                    <h1 className={s.title}>{this.props.detail.name}</h1>
                    {
                        this.props.match.params.id.includes('database') ? (<button onClick={() => deleteVideogame(this.props.match.params.id)}>Delete</button>) : null
                    }
                    
                    <Link to='/videogames'><button className={s.button_back} onClick={this.handleDetail}>Back</button></Link>
                </div>
                {!this.props.detail.name ? (<Loader/>) : (
                    <>
                    <div className={s.div_container_details}>
                        <img className={s.img_videogame} src={this.props.detail.image ? this.props.detail.image : this.props.detail.background_image} alt="img not found"></img>
                        <h4 className={s.description}>{this.props.detail.description}</h4>
                    </div>
                    <div className={s.div_bottom_desc}>
                        <h2>Release date: {this.props.detail.released}</h2>
                        <h2>Rating: {this.props.detail.rating}</h2>
                        {console.log(this.props.detail)}
                        <h2>Genres: { this.props.detail.genres instanceof Array ? this.props.detail.genres.map(genre => genre).join(', ') : this.props.detail.genres}</h2>
                    </div>
                        <h2>Platforms: {this.props.detail.platforms}</h2>
                    </>
                    )
                }
            </div>
        </div>
)}}

function mapStateToProps(state) {
    return {
      detail: state.detailVideogame,
      actualVideogames: state.actualVideogames
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getDetailVideogame: id => dispatch(getDetailVideogame(id)),
        deleteVideogame : id => dispatch(deleteVideogame(id))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailVideogame);