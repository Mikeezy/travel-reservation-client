import actionTypes from "./actionTypes"

export default function (state = {}, action) {

    switch (action.type) {
        case actionTypes.USER_AUTHENTICATED :
            return Object.assign(state,action.payload)
        case actionTypes.USER_LOGOUT :
            return {}

        default:
            return state
    }
    
}