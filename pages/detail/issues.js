import { useEffect } from 'react'
import { request } from '../../lib/request'
import withRepoBasic from '../../lib/with-repo-basic'
import Issue from '../../components/issue'

const Issues = ({issues}) => {
    return <div className="issues">
        {issues.map( issue => <Issue issue={issue} key={issue.id} />)}
        <style jsx>{`
            .issues{margin-top:20px;border:1px solid #eee;border-radius:4px;}
        `}</style>
    </div>
}

Issues.getInitialProps = async ({ ctx }) =>{

    const {owner,name} = ctx.query;

    const issuesResp = await request({
        url:`/repos/${owner}/${name}/issues`
    },ctx.req)

    return {
        issues:issuesResp.data
    }
}

export default withRepoBasic(Issues)