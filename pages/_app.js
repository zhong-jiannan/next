import App from 'next/app'
import withRedux from '../components/withRedux'
import { Provider } from 'react-redux'
import 'antd/dist/antd.min.css'

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
            <Component { ...pageProps } />
        </Provider>
    }
}

export default withRedux(MyApp)