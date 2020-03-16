import { combineReducers } from 'redux'
import { LOGIN, LOGOUT, UPDATEINFO } from './action-type'

const initialUser = {
    id:'',
    username:'unknow'
}

const initialInfo = {
    message:'login'
}

const userReducer = (state = initialUser, action) => {
    switch (action.type) {
        case LOGIN :
            return Object.assign({}, state, action.user)
        case LOGOUT :
            return {}
        default :
            return state
    }
}

const infoReducer = (state = initialInfo, action ) => {
    switch(action.type) {
        case UPDATEINFO : 
            return { ...state, ...action.info }
        default :
            return state
    }
}

export default combineReducers({
    user : userReducer,
    info : infoReducer
})
