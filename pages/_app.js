import App from 'next/app'
import withRedux from '../components/withRedux'
import { Provider } from 'react-redux'
import 'antd/dist/antd.min.css'
import Layout from '../components/layout'
class MyApp extends App {

    static async getInitialProps ({ Component, ctx }) {
        
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
        return <Provider store={reduxStore}>
                    <Layout>
                        <Component { ...pageProps } />
                    </Layout>
               </Provider>
    }
}

export default withRedux(MyApp)