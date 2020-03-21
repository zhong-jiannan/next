import App from 'next/app'
import 'antd/dist/antd.min.css'
import { Provider } from 'react-redux'
import Layout from '../components/layout'
import withRedux from '../components/with-redux'
class MyApp extends App {

    static async getInitialProps (ctx) {
        const { Component } = ctx
        let pageProps

        if(typeof Component.getInitialProps === 'function'){
           pageProps = await Component.getInitialProps(ctx)
        }
        return {
            pageProps
        }
    }

    render(){
        const { Component, pageProps, reduxStore } = this.props
        return (
            <Provider store={reduxStore}>
            <Layout>
                  <Component { ...pageProps } />
               </Layout>
            </Provider>
        )
               
    }
}

export default withRedux(MyApp)