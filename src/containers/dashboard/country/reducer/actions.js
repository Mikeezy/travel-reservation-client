import ActionType from './actionTypes'

export const dataLoad = content => ({
    type: ActionType.DATA_LOAD,
    payload: {
        ...content
    }
})

export const dataClear = content => ({
    type: ActionType.DATA_CLEAR
})