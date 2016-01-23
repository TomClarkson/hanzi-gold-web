import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncReduxAndRouter } from 'redux-simple-router';
import { pushPath } from 'redux-simple-router';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore, { seedHanzi } from './redux/configureStore';
import { loadUser } from './redux/user';
import './css/global.css';

var store = configureStore();
store.dispatch(loadUser());




let history = createBrowserHistory();
syncReduxAndRouter(history, store);

render((
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>
), document.getElementById('root'));

