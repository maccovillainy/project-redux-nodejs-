import { ADD_NAME } from '../const/user'

export function addName(name){
  return {
    type: ADD_NAME,
    payload: name
  }
}