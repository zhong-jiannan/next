import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducer'

let middleware
if(process.env.NODE_ENV === 'production'){
    middleware = applyMiddleware(thunk)
}else{
   middleware = composeWithDevTools(applyMiddleware(thunk))
}

export default function initialStore (state){
    const store = createStore(
        reducers,
        Object.assign({},{
            user:{}
        },state),
        middleware
    )
    return store
}
