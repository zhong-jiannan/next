import App from 'next/app'
import 'antd/dist/antd.min.css'
import '../public/css/global.css'
import { Provider } from 'react-redux'
import Router from 'next/router'
import Layout from '../components/layout'
import Loading from '../components/loading'
import withRedux from '../components/with-redux'
class MyApp extends App {

    constructor(props){
        super(props)
        this.state = {
            loading:false
        }
    }
    
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
                {this.state.loading ? <Loading /> : null }
                <Layout>
                  <Component { ...pageProps } />
                </Layout>
            </Provider>
        )      
    }

    showLoading = () => {
        this.setState({
            loading:true
        })
    }

    hideLoading = () => {
        this.setState({
            loading:false
        })
    }

    componentDidMount(){
        Router.events.on('routeChangeStart', this.showLoading)
        Router.events.on('routeChangeComplete', this.hideLoading)
        Router.events.on('routeChangeError', this.hideLoading)
    }

    componentWillUnmount(){
        Router.events.on('routeChangeStart')
        Router.events.on('routeChangeComplete')
        Router.events.on('routeChangeError')
    }

}

export default withRedux(MyApp)