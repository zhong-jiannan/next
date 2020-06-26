import { useState, useCallback } from 'react'
import { Avatar, Button} from 'antd'
import { timeFromNow } from '../lib/utils'
import Markdown from '../components/markdown'

function IssueDetail({issue}){
    return <div className="issue-detail">
        <Markdown content={issue.body} />
        <Button href={issue.html_url} target="_blank">进入讨论页面</Button>
        <style jsx>{`
            .issue-detail{background:#fafafa;margin-top:10px}
        `}</style>
    </div>
}

const Issue = ({issue}) => {

    const [showDetail,setShowDetail] = useState(false)
    const handleShowDetail = useCallback(()=>{
        setShowDetail(showDetail => !showDetail)
    },[showDetail])

    return <div className="issue">
        <div className="description">
            <div className="avatar">
                <Avatar src={issue.user.avatar_url} shape="square" size={50} />
            </div>
            <div className="content">
                <h3 className="title">{ issue.title}</h3>
                <span className="update">Updated at {timeFromNow(issue.updated_at)}</span>
                <Button 
                type="primary"
                size="small"
                onClick={handleShowDetail}
                style={{position:'absolute',right:10,top:10}}>
                    {showDetail ? '隐藏' : '查看'}
                </Button>
            </div>
        </div>
        {showDetail ? <IssueDetail issue={issue} /> : null}
        <style jsx>{`
            .issue{padding:10px;position:relative}
            .issue + .issue{border-top:1px solid #eee;}
            .description{display:flex}
            .issue:hover{background:#fafafa}
            .content{padding-right:50px;width:calc(100% - 75px)}
            .avatar{margin-right:15px;}
            .title{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;color:#333;margin-bottom:0.25em}
        `}</style>
    </div>
}



export default Issue