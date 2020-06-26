import MarkdownIt from 'markdown-it'
const md = new MarkdownIt({
    html:true
})

const decodeBase64 = str => decodeURIComponent(escape(atob(str)))

const Markdown = ({content,isBase64}) =>{

    if(isBase64){
        content = decodeBase64(content)
    }

    const html = md.render(content)
    return <div className="markdown-body">
        <div dangerouslySetInnerHTML={{__html:html}}></div>
    </div>
}

export default Markdown