import axios from 'axios';

export const GET_DETAILS = 'GET_DETAILS';
export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_RATING = 'FILTER_BY_RATING';

// action creator
export const getAllVideogames = () => {
	return async function (dispatch) {
		const videogames = await axios.get('http://localhost:3001/videogames');

		return dispatch({
			type: GET_ALL_VIDEOGAMES,
			payload: videogames.data,
		});
	};
};

export const getVideogamesByName = (name) => {
	return async function (dispatch) {
		const videogames = await axios.get(
			`http://localhost:3001/videogames?name=${name}`
		);

		return dispatch({
			type: GET_VIDEOGAMES_BY_NAME,
			payload: videogames.data,
		});
	};
};

export const getGenres = () => {
	return async function (dispatch) {
		const genres = await axios.get('http://localhost:3001/genres');

		return dispatch({
			type: GET_GENRES,
			payload: genres.data,
		});
	};
};

export const getDetailVideogame = (id) => {
	return async function (dispatch) {
		const detailVideogame = await axios.get(
			`http://localhost:3001/videogame/${id}`
		);

		return dispatch({
			type: GET_DETAILS,
			payload: detailVideogame.data,
		});
	};
};

export const filterVideogamesByName = (payload) => {
	return {
		type: FILTER_BY_NAME,
		payload,
	};
};

export const filterVideogamesByGenre = (payload) => {
	return {
		type: FILTER_BY_GENRE,
		payload,
	};
};

export const filterVideogamesByRating = (payload) => {
	return {
		type: FILTER_BY_RATING,
		payload,
	};
};

// module.exports = {
// 	GET_ALL_VIDEOGAMES,
// 	GET_VIDEOGAME,
// 	GET_GENRES,
// 	GET_PLATFORMS,
// 	getAllVideogames,
// };
