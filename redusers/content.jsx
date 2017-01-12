const content = (state = {data: []}, action) => {
  switch (action.type){
    case 'CONTENT':
      state = {
        ...state,
        data: action.payload
      };break
  }
  return state;
}

export default content