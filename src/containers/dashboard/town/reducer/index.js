import actionTypes from "./actionTypes"

export default function (state = {}, action) {

    switch (action.type) {
        case actionTypes.DATA_LOAD :
            return action.payload
            
        case actionTypes.DATA_CLEAR :
            return {}

        default:
            return state
    }
    
}