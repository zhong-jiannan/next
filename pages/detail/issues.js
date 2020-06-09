import withRepoBasic from '../../lib/with-repo-basic'

const Issues = ({text}) => {
    return <span>Issues {text}</span>
}

 

Issues.getInitialProps = async ({ ctx }) =>{
    return {
        text:'issues'
    }
}



export default withRepoBasic(Issues)