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


export function register(type,
  errors,
  msg
  ){
  return {
    type: 'REGISTER',
    payload: {
      type,
      errors,
      msg
    }
  }
}


export function getData(data){
  return {
    type: 'CONTENT',
    payload: data
    }
  }

export function setData(data){
  return {
    type: 'SET_DATA',
    payload: data
    }
  }


export function end(bul){
  return {
    type: 'END',
    payload: bul
    }
  }


export function setErrors(arr, ex){
  console.log(ex)
  return {
    type: 'SET_ERRORS',
    payload: {
        errors:arr,
        exist:ex
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
          sign: null,
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






