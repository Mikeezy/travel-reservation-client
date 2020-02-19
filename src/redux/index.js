import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import userReducer from '../containers/dashboard/auth/reducer';
import busReducer from '../containers/dashboard/bus/reducer';
import countryReducer from '../containers/dashboard/country/reducer';

const rootReducer = combineReducers({
    form: formReducer,
    currentUser : userReducer,
    currentBus : busReducer,
    currentCounty : countryReducer
})

export default rootReducer
