import MarkdownIt from 'markdown-it'
import 'github-markdown-css'
import withRepoBasic from '../../lib/with-repo-basic'
import { request } from '../../lib/request'

const md = new MarkdownIt({
    html:true
})

function decode (str){
    return decodeURIComponent(escape(atob(str)))
}


const Detail = ({readme}) => {
    const content = decode(readme.content)
    const html = md.render(content)
    return <div className="markdown-body">
        <div dangerouslySetInnerHTML={{__html:html}}></div>
    </div>
}

Detail.getInitialProps = async ({ ctx }) =>{
    const {owner, name} = ctx.query

    const readmeResp = await request({
        url:`/repos/${owner}/${name}/readme`
    },ctx.req)

    

    return {
        readme:readmeResp.data
    }

}



export default withRepoBasic(Detail)