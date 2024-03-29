import axios from 'axios';

export const GET_DETAILS = 'GET_DETAILS';
export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_RATING = 'FILTER_BY_RATING';
export const FILTER_BY_CREATION = 'FILTER_BY_CREATION';
export const CLEAR_DETAILS = 'CLEAR_DETAILS';
export const DELETE_VIDEOGAME = 'DELETE_VIDEOGAME';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// action creator
export const getAllVideogames = () => {
	return async function (dispatch) {
		const videogames = await axios.get('/videogames');

		return dispatch({
			type: GET_ALL_VIDEOGAMES,
			payload: videogames.data,
		});
	};
};

export const getVideogamesByName = (name) => {
	return async function (dispatch) {
		try {
			let videogames = await axios.get(`/videogames?name=${name}`);

			return dispatch({
				type: GET_VIDEOGAMES_BY_NAME,
				payload: videogames.data,
			});
		} catch (error) {
			return dispatch({
				type: GET_VIDEOGAMES_BY_NAME,
				payload: [],
			});
		}
	};
};

export const getGenres = () => {
	return async function (dispatch) {
		const genres = await axios.get('/genres');

		return dispatch({
			type: GET_GENRES,
			payload: genres.data,
		});
	};
};

export const getPlatforms = () => {
	return async function (dispatch) {
		const platforms = await axios.get('/platforms');

		return dispatch({
			type: GET_PLATFORMS,
			payload: platforms.data,
		});
	};
};

export const getDetailVideogame = (id) => {
	return async function (dispatch) {
		const detailVideogame = await axios.get(`/videogame/${id}`);
		return dispatch({
			type: GET_DETAILS,
			payload: detailVideogame.data,
		});
	};
};

export const createVideogame = (videogame) => {
	return async function (dispatch) {
		const newVideogame = await axios.post('/videogames', videogame);
		return dispatch({
			type: CREATE_VIDEOGAME,
			payload: newVideogame.data,
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

export const filterVideogamesByCreation = (payload) => {
	return {
		type: FILTER_BY_CREATION,
		payload,
	};
};

export const clearDetails = () => {
	return {
		type: CLEAR_DETAILS,
	};
};

export const deleteVideogame = async (id) => {
	const videogame = axios.delete(`/videogame/${id}`);

	return {
		type: DELETE_VIDEOGAME,
		payload: videogame.data,
	};
};

export const setPage = (payload) => {
	return {
		type: SET_CURRENT_PAGE,
		payload,
	};
};
