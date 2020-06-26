import { useEffect,useMemo } from 'react'
import { withRouter } from 'next/router'
import { request } from '../../lib/request'
import withRepoBasic from '../../lib/with-repo-basic'
import { setCacheReadme, getCacheReadme } from '../../lib/cache-repo-basic'
import Markdown from '../../components/markdown'

const isServer = typeof window === 'undefined'

const Detail = ({readme,router}) => {

    const fullName = useMemo(()=>{
        return `${router.query.owner}/${router.query.name}/readme`
    })

    useEffect(()=>{
        if(!isServer){
            setCacheReadme(fullName,readme)
        }
    })

    return <Markdown content={readme.content} isBase64={true} />
}

Detail.getInitialProps = async ({ ctx }) =>{
    const {owner, name} = ctx.query

    const fullName = `${owner}/${name}/readme`
    
    if(getCacheReadme(fullName)){
        return{
            readme:getCacheReadme(fullName)
        }
    }

    const readmeResp = await request({
        url:`/repos/${owner}/${name}/readme`
    },ctx.req)

    return {
        readme:readmeResp.data
    }

}

export default withRepoBasic(withRouter(Detail))