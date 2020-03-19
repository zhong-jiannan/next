import { combineReducers } from 'redux'

const userReducer = (state={}, action) => {
    switch (action.type) {
        default :
            return state
    }
}

export default combineReducers({
    user : userReducer
})
