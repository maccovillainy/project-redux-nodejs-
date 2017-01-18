const blogErrors = (state = {errors: false,exist: false}, action) => {
  switch (action.type){
    case 'SET_ERRORS':
    state = {
      ...state,
      errors: action.payload.errors,
      exist: action.payload.exist
    };break;
  }
  return state
}

export default blogErrors;