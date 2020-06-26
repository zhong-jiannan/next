import Link from 'next/link'
import { StarFilled } from '@ant-design/icons'
import { timeFromNow } from '../lib/utils'

const Repo = ({ repo }) => {
    console.log(repo)
    return <div className="item">
                <div className="basic-info">
                    <h3 className="title">
                        <Link href={`/detail?owner=${repo.owner.login}&name=${repo.name}`}>
                            <a>{repo.full_name}</a>
                        </Link>
                    </h3>
                    <p className="repo-desc">{repo.description}</p>
                    <p className="other-info">
                        <span className="license">{repo.license ? `${repo.license.spdx_id} license` : null }</span>
                        <span className="last-update">{timeFromNow(repo.updated_at)}</span>
                        <span className="open-issues">{repo.open_issues_count} open issues</span>
                    </p>
                </div>
                <div className="lang-star">
                    <span className="lang">{repo.language}</span>
                    <span className="stars">
                        {repo.stargazers_count} <StarFilled />
                    </span>
                </div>
                <style jsx>{`
                    .item{
                        display:flex;
                        justify-content:space-between;
                        border-top:1px solid #eee;
                        padding-top:20px;
                        width:100%;
                    }
                    .item:first-child{
                        border-top:none;
                        padding-top:0;
                    }
                    .basic-info{
                        display:flex;
                        flex-direction:column;
                        flex:1;
                        padding-right:40px;
                    }
                    .title{
                        font-size:20px;
                    }
                    .lang-star{
                        display:flex;
                        width:150px;
                        justify-content:space-between;
                    }
                    .other-info > span{
                        width:120px;
                        text-align:right;
                        margin-right:10px;
                    }
                    .other-info > span:empty{
                        margin-right:0;
                    }
                    .repo-desc{
                        text-overflow: -o-ellipsis-lastline;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;                        
                    }
                `}</style>
            </div>
}
export default Repo