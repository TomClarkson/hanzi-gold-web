import {combineReducers} from 'redux';
const { routeReducer } = require('redux-simple-router');
import deck from './deck';
import user from './user';

export default combineReducers({
	deck,
	user,
	routing: routeReducer
});