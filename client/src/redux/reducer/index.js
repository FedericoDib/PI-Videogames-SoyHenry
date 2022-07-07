import {
	GET_ALL_VIDEOGAMES,
	GET_VIDEOGAMES_BY_NAME,
	GET_GENRES,
	GET_DETAILS,
	CREATE_VIDEOGAME,
	FILTER_BY_NAME,
	FILTER_BY_GENRE,
	FILTER_BY_RATING,
	FILTER_BY_CREATION,
	GET_PLATFORMS,
	CLEAR_DETAILS,
	DELETE_VIDEOGAME,
} from '../actions/index.js';

const initialState = {
	videogames: [],
	allVideogames: [],
	genres: [],
	platforms: [],
	detailVideogame: {},
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_VIDEOGAMES:
			return {
				...state,
				videogames: action.payload,
				allVideogames: action.payload,
			};
		case GET_VIDEOGAMES_BY_NAME:
			return {
				...state,
				videogames: action.payload,
				allVideogames: action.payload,
			};
		case GET_GENRES:
			return {
				...state,
				genres: action.payload,
			};
		case GET_PLATFORMS:
			return {
				...state,
				platforms: action.payload,
			};
		case GET_DETAILS:
			return {
				...state,
				detailVideogame: action.payload,
			};
		case CREATE_VIDEOGAME:
			return {
				...state,
				videogames: [...state.videogames, action.payload],
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
					? state.allVideogames
					: state.allVideogames.filter((videogame) => {
							return videogame.genres.includes(action.payload);
					  });
			return {
				...state,
				videogames: VGbyGenre,
			};
		case FILTER_BY_CREATION:
			const VGbyCreation =
				action.payload === 'All'
					? state.allVideogames
					: state.allVideogames.filter((videogame) => {
							return videogame.id.includes(action.payload);
					  });
			return {
				...state,
				videogames: VGbyCreation,
			};
		case CLEAR_DETAILS:
			return {
				...state,
				detailVideogame: {},
			};
		case DELETE_VIDEOGAME:
			return {
				...state,
			};
		default:
			return state;
	}
}
