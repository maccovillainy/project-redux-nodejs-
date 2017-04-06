import { ADD_NAME } from '../const/user'
export default (state = {
  id: 1,
  name: 'Sign in',
  lastname: '',
  auth: false
}, action) => {
  switch(action.type){
    case ADD_NAME:
      state = {
        ...state,
        id: state.id + 1,
        name: action.payload

      };break;
  }
  return state;
};