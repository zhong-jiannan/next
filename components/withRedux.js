
import React from 'react'
import createStore from '../store'

const isServer = typeof window === 'undefined'

function getOrCreateStore(){
    if(isServer){
        return createStore()
    }
    if(!window['_STORE_']){
        window['_STORE_'] = createStore()
    }
    return window['_STORE_']
}

export default App => {
    return class withRedux extends React.Component{
        constructor(props){
            super(props)
            this.reduxStore = getOrCreateStore()
        }

        static async getInitialProps(ctx){
            let pageProps = {}
            if(typeof App.getInitialProps === 'function'){
                pageProps = await App.getInitialProps(ctx)
            }
            const reduxState = getOrCreateStore().getState()
            return {
                pageProps,
                ...reduxState
            }
        }
        
        render(){
            return <App {...this.props} reduxStore={ this.reduxStore} />
        }
    }
}