import './src/asserts/sass/style.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import $ from 'jquery'

import { Router, Route, browserHistory} from 'react-router'
import store from './store'
import Login from './src/app/main/users/Login/Login'
import Register from './src/app/main/users/Register/Register'
import App from './src/app/app'


function requireAuth(nextState, replace, done) { //onEnter={requireAuth}
      replace('/login?path=' + nextState.location.pathname.split('/')[1]);
      done()
}


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} >
        <Route path='/login(?:path)' component={Login} />
        <Route path='/register' component={Register} />
      </Route>
    </Router>
  </Provider>
  ,root);


