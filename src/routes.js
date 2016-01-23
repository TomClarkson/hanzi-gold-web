import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Master from './layout/Master';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Learn from './pages/Learn';
import Quiz from './pages/Quiz';
import Write from './pages/Write';
import Dashboard from './pages/Dashboard';
import {getUser} from './storage';
import Jen from './pages/Jen';
import About from './pages/About';
import Hanzi from './pages/Hanzi';

function requireAuth(nextState, replaceState) {
  if (!getUser()) {
  	replaceState({ nextPathname: nextState.location.pathname }, '/')
  }
}

export default (
    <Route path="/" component={Master}>
    	<IndexRoute component={Home}/>
    	<Route path="dashboard" onEnter={requireAuth} component={Dashboard} />
    	<Route path="learn" component={Learn} />
    	<Route path="login" component={Login} />
    	<Route path="quiz" component={Quiz} />
    	<Route path="write" component={Write} />
      <Route path="hanzi" component={Hanzi} />
    	<Route path="jen" component={Jen} />
      <Route path="about" component={About} />
    	<Route path="*" component={NotFound} />
    </Route>
);