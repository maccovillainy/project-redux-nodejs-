const signed = (state = {sign: false}, action) => {
	switch (action.type) {
		case 'signed':
			state = {
				...state,
				sign: action.payload
			};break;
		case 'signOut':
			state = {
				...state,
				sign: false
			};break;
	}
	return  state;
}

export default signed