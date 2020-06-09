import withRepoBasic from '../../lib/with-repo-basic'

const Detail = ({text}) => {
    return <span>detail {text}</span>
}

 

Detail.getInitialProps = async ({ ctx }) =>{
    return {
        text:'index'
    }
}



export default withRepoBasic(Detail) 