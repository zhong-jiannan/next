import { connect } from 'react-redux'

const Index = props => {
    return <span>{ props.message }</span>
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