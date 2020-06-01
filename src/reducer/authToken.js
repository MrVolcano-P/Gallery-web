import { SET_AUTH_TOKEN } from '../action/authToken'

export default (state = null, action) => {
    switch (action.type) {
        case SET_AUTH_TOKEN:
            return action.token
        default:
            return state
    }
}