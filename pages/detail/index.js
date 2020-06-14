import { useEffect,useMemo } from 'react'
import MarkdownIt from 'markdown-it'
import { withRouter } from 'next/router'
import 'github-markdown-css'
import withRepoBasic from '../../lib/with-repo-basic'
import { setCacheReadme, getCacheReadme } from '../../lib/cache-repo-basic'
import { request } from '../../lib/request'

const md = new MarkdownIt({
    html:true
})

const decode = str => decodeURIComponent(escape(atob(str)))

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

    const content = decode(readme.content)
    const html = md.render(content)
    return <div className="markdown-body">
        <div dangerouslySetInnerHTML={{__html:html}}></div>
    </div>
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