import { request } from './request'
import Repo from '../components/repo'
import Link from 'next/link'
import { withRouter } from 'next/router'

export default Comp => {

    function WithRepoBasic({repo,router,...rest}){

        return <div className="detail">
            <Repo repo={repo} />
            <div className="tabs">
                <Link href={`/detail?owner=${router.query.owner}&name=${router.query.name}`}>
                    <a className="tab">Readme</a>
                </Link>
                <Link href={`/detail/issues?owner=${router.query.owner}&name=${router.query.name}`}>
                    <a className="tab">Issues</a>
                </Link>
            </div>
            <Comp {...rest} />
            <style jsx>{`
                .detail{width:100%;padding:20px 0}
                .tab{margin-right:10px;}
            `}</style>
        </div>
    }

    WithRepoBasic.getInitialProps = async ctx => {

        const {owner, name} = ctx.ctx.query


        if(!owner || !name){
            return {
                
            }
        }

        const repo = await request({

            url:`/repos/${owner}/${name}`

        },ctx.ctx.req)
        
        let pageProps = {}
        if(typeof Comp.getInitialProps === 'function'){
            pageProps = await Comp.getInitialProps(ctx)
        }

        return {
            repo:repo.data,
            ...pageProps
        }

    }

    return withRouter(WithRepoBasic)
}