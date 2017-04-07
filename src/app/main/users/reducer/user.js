import { LOGIN } from '../const/user'
export default (state = {
  username: '',
  is_login: '',
  token: '',
}, action) => {
  switch(action.type){
    case LOGIN:
      state = {
        ...state,
        username: action.payload.username,
        is_login: action.payload.is_login,
        token: action.payload.token

      };break;
  }
  return state;
};