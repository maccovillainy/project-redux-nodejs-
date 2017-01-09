

const signed = (state = {sign: false}, action) => {
	switch (action.type) {
		case 'signed':
			state = {
				...state,
				sign: action.payload.sign,
				name: action.payload.name
			};break;
		case 'signOut':
			state = {
				...state,
				sign: action.payload.sign
			};break;
	}
	return  state;
}

export default signed