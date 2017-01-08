export function goSigned(tr){
	return {
		type: 'signed',
		payload: tr
	}
}
export function signOut(fa){
	return {
		type: 'signOut',
		payload: fa
	}
}