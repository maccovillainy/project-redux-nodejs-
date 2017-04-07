import {LOGIN} from '../const/user'
import axios from 'axios'

export function login(username, password) {
  return dispatch => {
    axios.post('http://localhost:1337/user/login', {
      username: 'max',
      password: '11111'
    }).then(user => {
      console.log(1, user.data)
      dispatch({
        type: LOGIN,
        payload: {
          username: user.data.data.username,
          is_login: user.data.success,
          token: user.data.data.token
        }
      })
    })
  }
}
/*

 export function addName(username,is_login,token){
 return {
 type: LOGIN,
 payload: {
 username,
 is_login,
 token
 }
 }
 }
 */

function incrementIfOdd() {
  return (dispatch, getState) => {
    const {counter} = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}