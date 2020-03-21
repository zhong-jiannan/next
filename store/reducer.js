import { combineReducers } from 'redux'
import { LOGOUT } from './action-type'
const userReducer = (state={}, action) => {
    switch (action.type) {
        case LOGOUT : 
            return {}
        default :
            return state
    }
}

export default combineReducers({
    user : userReducer
})
