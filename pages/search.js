import { request } from '../lib/request'
import Repo from '../components/repo'
const Search = ({data})=>{    
    return <div className="search-container">
        <div className="search-list">
            {data.items.map((repo,index) => <Repo repo={repo} key={index} />)}
        </div>
    </div>
}

Search.getInitialProps = async ({ctx}) =>{

    const query = ctx.query && ctx.query.query

    let data ={}
    
    if(query){
        const resp = await request({
            url:`/search/repositories`,
            data:{
                q:query
            }
        },ctx.req)

        if(resp.status ===200){
            data = resp.data
        }
    }

    return {
        data
    }
}

export default Search