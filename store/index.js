import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducer'
const initUser = {name:'zhongjiannan',age:24}
export default function initialStore (state){
    const store = createStore(
        reducers,
        Object.assign({},{
            user:initUser
        },state),
        composeWithDevTools(applyMiddleware())
    )
    return store
}
