import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory} from 'react-router'
import store from './store'
import User from './users/user'
import App from './pages/index'
import Test from './pages/test'
import Test2 from './pages/test2'
import $ from 'jquery'

function requireAuth(nextState, replace, done) {
  $.get({
    url:'/log'
  }).then(res => {
    console.log(res,'ee', res.error)
    if (res.error) {
      replace('/login?path=' + nextState.location.pathname.split('/')[1])
    }
      done()
  });
}


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} >
        <Route path='login(?:path)' component={User} />
        <Route path='content' component={Test} onEnter={requireAuth}/>
        <Route path='ul' component={Test2} onEnter={requireAuth}/>
      </Route>
    </Router>
  </Provider>
  ,root);


