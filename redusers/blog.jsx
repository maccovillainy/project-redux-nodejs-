const blog = (state = {data: {}}, action) => {
  switch (action.type){
    case 'SET_DATA':
      state = {
        ...state,
        data: action.payload
      };break
  }
  return state;
}

export default blog