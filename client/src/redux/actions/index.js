import axios from 'axios';

export const GET_VIDEOGAME = 'GET_VIDEOGAME';
export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';

// action creator
//  const DECREMENTAR_COUNTER = {
//    type: 'DECREMENTAR_COUNTER'
//  };

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

// module.exports = {
// 	GET_ALL_VIDEOGAMES,
// 	GET_VIDEOGAME,
// 	GET_GENRES,
// 	GET_PLATFORMS,
// 	getAllVideogames,
// };
