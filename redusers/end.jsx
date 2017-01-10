const ENDend = (state = {finish: false}, action) => {
  switch (action.type){
    case 'END':
      state = {
        ...state,
        finish: action.payload
      };break
  }
  return state;
}

export default ENDend