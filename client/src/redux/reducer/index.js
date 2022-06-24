//import { GET_ALL_VIDEOGAMES } from '../actions/index.js';

const initialState = {
	videogames: [],
	genres: [],
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_ALL_VIDEOGAMES':
			return {
				...state,
				videogames: action.payload,
			};
		default:
			return state;
	}
}
