const register = (state = {
  type : false,
  errors : false,
  msg : false
}, action) => {
  switch (action.type) {
    case 'REGISTER':
      state = {
        ...state,
        type: action.payload.type,
        errors: action.payload.errors,
        msg: action.payload.msg,
      };break;
  }
  return  state;
}

export default register