import { compose, createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

export default function configureStore(initialData = {}) {
	const createStoreWithMiddleware = applyMiddleware(
	  thunk
	)(createStore);

	const store = createStoreWithMiddleware(reducer);

	return store;
}

import characters from '../characters';

export function seedHanzi(store) {
	var defaultValues = {correctCount: 0, wrongCount: 0};
	var hanzi = characters.map(c => Object.assign(c, defaultValues));
	store.dispatch({type: 'IMPORT', hanzi});
}