import App from 'next/app'
import 'antd/dist/antd.min.css'
import '../public/css/global.css'
import { Provider } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
import '../node_modules/nprogress/nprogress.css'
import withRedux from '../lib/with-redux'
import Layout from '../components/layout'
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

    timer = null

    showLoading = () => {
        NProgress.start()
    }

    hideLoading = () => {
        NProgress.done()
    }

    componentDidMount(){
        Router.events.on('routeChangeStart', this.showLoading)
        Router.events.on('routeChangeComplete', this.hideLoading)
        Router.events.on('routeChangeError', this.hideLoading)
    }

    componentWillUnmount(){
        Router.events.off('routeChangeStart',this.showLoading)
        Router.events.off('routeChangeComplete',this.hideLoading)
        Router.events.off('routeChangeError',this.hideLoading)
    }

}

export default withRedux(MyApp)