import Link from 'next/link'
import { StarFilled } from '@ant-design/icons'
import moment from 'moment'
function getLicence(licence){
    return licence ? `${licence.spdx_id} licence` : null
}

function timeFormat(time){
    return moment(time).fromNow()
}

const Repo = ({ repo=[] }) => {
    return <div className="item">
                <div className="basic-info">
                    <h3 className="title">
                        <Link href={`/detail?owner=${repo.owner.login}&name=${repo.name}`}>
                            <a>{repo.full_name}</a>
                        </Link>
                    </h3>
                    <p className="repo-desc">{repo.description}</p>
                    <p className="other-info">
                        <span className="licence">{getLicence(repo.licence)}</span>
                        <span className="last-update">{timeFormat(repo.updated_at)}</span>
                        <span className="open-issues">{repo.open_issues_count}</span>
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
                    }
                    .item:first-child{
                        border-top:none;
                        padding-top:0;
                    }
                    .title{
                        font-size:20px;
                    }
                    .lang-star{
                        display:flex;
                    }
                    .lang-star > span{
                        width:120px;
                        text-align:right;
                    }
                    .lang-star > span:not(:empty){
                        margin-left:10px;
                    }
                    .repo-desc{
                        width:400px;
                    }
                `}</style>
            </div>
}
export default Repo