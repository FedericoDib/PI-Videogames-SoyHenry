import {
	GET_ALL_VIDEOGAMES,
	GET_VIDEOGAMES_BY_NAME,
	GET_GENRES,
	GET_DETAILS,
	FILTER_BY_NAME,
	FILTER_BY_GENRE,
	FILTER_BY_RATING,
} from '../actions/index.js';

const initialState = {
	videogames: [],
	genres: [],
	detailVideogame: {},
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_VIDEOGAMES:
			return {
				...state,
				videogames: action.payload,
			};
		case GET_VIDEOGAMES_BY_NAME:
			return {
				...state,
				videogames: action.payload,
			};
		case GET_GENRES:
			return {
				...state,
				genres: action.payload,
			};
		case GET_DETAILS:
			return {
				...state,
				detailVideogame: action.payload,
			};
		case FILTER_BY_NAME:
			if (action.payload === 'asc') {
				return {
					...state,
					videogames: state.videogames.sort((a, b) => {
						return a.name.localeCompare(b.name);
					}),
				};
			} else if (action.payload === 'desc') {
				return {
					...state,
					videogames: state.videogames.sort((a, b) => {
						return b.name.localeCompare(a.name);
					}),
				};
			} else {
				return {
					...state,
					videogames: state.videogames,
				};
			}
		case FILTER_BY_RATING:
			if (action.payload === 'asc') {
				return {
					...state,
					videogames: state.videogames.sort((a, b) => {
						return a.rating - b.rating;
					}),
				};
			} else if (action.payload === 'desc') {
				return {
					...state,
					videogames: state.videogames.sort((a, b) => {
						return b.rating - a.rating;
					}),
				};
			} else {
				return {
					...state,
					videogames: state.videogames,
				};
			}
		case FILTER_BY_GENRE:
			const VGbyGenre =
				action.payload === 'All'
					? state.videogames
					: state.videogames.filter((videogame) => {
							return videogame.genres.includes(action.payload);
					  });
			console.log(VGbyGenre);
			return {
				...state,
				videogames: VGbyGenre,
			};
		default:
			return state;
	}
}
