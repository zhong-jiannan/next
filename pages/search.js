import { request } from '../lib/request'

const Search = ({data})=>{
    
    return <span data={data}>Search Page</span>
}

Search.getInitialProps = async ({ctx}) =>{

    const query = ctx.query && ctx.query.query

    let searchData ={}
    
    if(query){
        const resp = await request({
            url:`/search/repositories`,
            data:{
                q:'react'
            }
        },ctx.req)

        if(resp.status ===200){
            searchData = resp.data
        }
    }


    return {
        data:searchData
    }
}

export default Search