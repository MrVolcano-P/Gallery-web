import { combineReducers } from 'redux'
import authToken from './authToken'
import profile from './profile'
export default combineReducers({
    authToken,
    profile
})