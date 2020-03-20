import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducer'

export default function initialStore (state){
    const store = createStore(
        reducers,
        Object.assign({},{
            user:{}
        },state),
        composeWithDevTools(applyMiddleware())
    )
    return store
}
