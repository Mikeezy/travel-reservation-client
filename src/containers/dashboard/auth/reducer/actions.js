import ActionType from './actionTypes'

export const userAuthenticated = content => ({
    type: ActionType.USER_AUTHENTICATED,
    payload: {
        ...content
    }
})

export const userLogout = () => ({
    type: ActionType.USER_LOGOUT,
    payload: {}
})