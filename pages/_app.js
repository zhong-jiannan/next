import App from 'next/app'
import 'antd/dist/antd.min.css'
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
        const { Component, pageProps} = this.props
        return <Layout>
                  <Component { ...pageProps } />
               </Layout>
               
    }
}

export default withRedux(MyApp)