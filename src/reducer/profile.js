import { SET_PROFILE } from "../action/profile"

export default (state = null, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return action.profile
        default:
            return state
    }
}