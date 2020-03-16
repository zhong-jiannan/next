import { connect } from 'react-redux'
import { Button } from 'antd'
import {github} from '../config'
const Index = props => {
    const {client_id,scope,redirect_uri} = github
    return <a href={`https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`}>
            <Button>{ props.message }</Button>
        </a>
}

const mapState = state => {
    const { info } = state
    return {
        ...info
    }
}

const mapDispatch = dispatch => {
    return {

    }
}

export default connect(mapState, mapDispatch)(Index)