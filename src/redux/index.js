import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import userReducer from '../containers/dashboard/auth/reducer'
import busReducer from '../containers/dashboard/bus/reducer'
import countryReducer from '../containers/dashboard/country/reducer'
import townReducer from '../containers/dashboard/town/reducer'
import travelReducer from '../containers/dashboard/travel/reducer'

const rootReducer = combineReducers({
    form: formReducer,
    currentUser : userReducer,
    currentBus : busReducer,
    currentCounty : countryReducer,
    currentTown : townReducer,
    currentTravel : travelReducer
})

export default rootReducer
