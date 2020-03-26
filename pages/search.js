import { request } from '../lib/request'



const Search = ({data})=>{
       
    return <span>Search Page</span>
}

Search.getInitialProps = async ({ctx}) =>{

    const data = ctx.query.data

    let searchData ={}
    
    if(data){
        const resp = await request({
            url:`/search/repositories`,
            data:{
                q:data
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