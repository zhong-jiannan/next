import React from 'react'

import createStore from '../store'

const isServer = typeof window === 'undefined'

function getOrCreateStore(state) {
    if (isServer) {
        return createStore(state)
    }
    if (!window['_STORE_']) {
        window['_STORE_'] = createStore(state)
    }
    return window['_STORE_']
}

export default App => {
    return class withRedux extends React.Component { 
        constructor(props){
            super(props)
            this.reduxStore = getOrCreateStore(props.initReduxState)
        }
        render() {
            const { Component, pageProps, ...rest } = this.props
            return <App Component = { Component } pageProps = { pageProps } {...rest } reduxStore={this.reduxStore} />
        }
        static getInitialProps = async ctx => {
            let reduxStore
            if(isServer){
                const {req} = ctx.ctx
                const session = req.session
                if(session && session.user){
                    reduxStore = getOrCreateStore({
                        user: session.user
                    })
                }else {
                    reduxStore = getOrCreateStore()
                }
            }else {
                reduxStore = getOrCreateStore()
            }
            let appProps = {}
            if (typeof App.getInitialProps === 'function') {
                appProps = await App.getInitialProps(ctx)
            }
            return {
                ...appProps,
                initReduxState:reduxStore.getState()
            }
        }
    }
}