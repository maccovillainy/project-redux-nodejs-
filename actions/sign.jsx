import store from '../store.jsx'

export function goSigned(tr, name){
  return {
    type: 'signed',
    payload: {
      sign: tr,
      name: name
    }
  }
}




export function signOut(){
  return dispatch => {
    $.ajax({url: '/signout'}).then(res => {
      console.log(res)
      if (res)
      dispatch({
        type: 'signOut',
        payload: {
          sign: false,
          name: null
        }
      })
    }).catch(err => console.log(err))
  }
}




$.ajax({
  url: '/session',
  method: 'get'
}).then(res => {
  if (res)
  store.dispatch({
    type: 'signed',
    payload: {
      sign: true,
      name: res[0].name
    }
  })
})





