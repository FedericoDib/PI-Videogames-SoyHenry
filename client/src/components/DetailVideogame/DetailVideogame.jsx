import React from "react";
import { connect } from 'react-redux';
import { getDetailVideogame } from '../../redux/actions/index.js';
import s from "./DetailVideogame.module.css";
import {Link} from "react-router-dom";
import Loader from "../Loader.jsx";

class DetailVideogame extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getDetailVideogame(id);
    }

	render() {
		return (
        
        <div className={s.div_container}>
            <div className={s.div_container_left}>
                <div className={s.div_title}>
                    <Link to='/videogames'><button className={s.button_back}>Back</button></Link>
                    <h1 className={s.title}>{this.props.detail.name}</h1>
                </div>
                {/*TODO: hacer funcionar el loader*/  }
                {!this.props.detail ? (<Loader/>) : (
                    <>
                        <img className={s.img_videogame} src={this.props.detail.background_image} alt="img not found"></img>
                        <div className={s.div_container_desc}>
                            <div>
                                <h2>Released: {this.props.detail.released}</h2>
                                <h2>Rating: {this.props.detail.rating}</h2>
                            </div>
                            <div>
                                <h2>Platforms: {this.props.detail.platforms}</h2>
                                <h2>Genres: {this.props.detail.genres}</h2>
                            </div>
                        </div>
                        <h4>{this.props.detail.description}</h4>
                    </>
                    )
                }
            </div>
        </div>
)}}

function mapStateToProps(state) {
    return {
      detail: state.detailVideogame
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getDetailVideogame: id => dispatch(getDetailVideogame(id)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailVideogame);