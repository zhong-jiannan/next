import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducer'
export default function initialStore (){
    return createStore(reducers,composeWithDevTools(applyMiddleware()))
}