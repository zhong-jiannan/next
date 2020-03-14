import { combineReducers } from 'redux'


const initialState = {
    id:'',
    username:'unknow'
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, action.user)
        case 'LOGOUT':
            return {}
        default :
            return state
    }
}


export default combineReducers({
    user:userReducer
})