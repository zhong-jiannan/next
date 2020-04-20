import { useEffect } from 'react'
import { withRouter } from 'next/router'
import { request } from '../lib/request'
import { message, Empty } from 'antd'

const Detail = ({ repo, router }) => {
    
    useEffect(()=>{
        if(router.query.owner && router.query.name){
            if(!repo) message.error('仓库信息获取失败')
        }
    },[repo])

    return repo ? <span repo={repo}>detail page</span> : <Empty /> 
}

Detail.getInitialProps = async ({ ctx }) => {

    const { owner, name } = ctx.query

    if(owner && name){
        try {
            const resp = await request({
                url: `/repos/${owner}/${name}`
            }, ctx.req)
            
            const data = {}

            if(resp && resp.status === 200 && !resp.data.error){
                data['repo'] = resp.data
            }

            return data

        } catch (err) {
            console.log('detail第23行中的repos出错',err)
        }
    }

    return {

    }
}

export default withRouter(Detail)