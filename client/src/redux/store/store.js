import {
	legacy_createStore as createStore,
	applyMiddleware,
	compose,
} from 'redux';
import reducer from '../reducer/index';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk))
);
