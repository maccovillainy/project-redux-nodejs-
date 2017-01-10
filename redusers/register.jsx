const register = (state = {
  existName: false,
  existEmail: false,
  nameInalid: false,
  passInvalid: false,
  errors: false,
  register: false
}, action) => {
  switch (action.type) {
    case 'REGISTER':
      state = {
        ...state,
        existName: action.payload.existName,
        existEmail: action.payload.existEmail,
        nameInalid: action.payload.nameInalid,
        passInvalid: action.payload.passInvalid,
        errors: action.payload.errors ,
        register: action.payload.register
      };break;
  }
  return  state;
}

export default register