import { useEffect } from 'react'
import Router,{ withRouter } from 'next/router'
import { GlobalOutlined, MailOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
import { request } from '../lib/request'
import { connect } from 'react-redux'
import { Button, Tabs, Empty, message } from 'antd'
import LRU from 'lru-cache'
import Repo from '../components/repo'

const cache = new LRU({
    maxAge:1000 * 60 * 5
})

const Index = ({ user, repos, starred, router }) => {
    
    useEffect(()=>{
        if(!user || !user.id) return
        if(!repos) message.error('repos获取失败')
        if(!starred) message.error('starred获取失败')
    },[user,repos,starred])

    useEffect(()=>{
        if(repos && starred){
            cache.set('repos',repos)
            cache.set('starred',starred)
        }
    },[repos,starred])


    const tabKey = router.query.tab || '1'

    const handleTabChange = key => {
        Router.push(`/?tab=${key}`)
    }

    if (!user || !user.id) {
        return <div className="wrapper">
            <p className="tip-text">您还未登陆</p>
            <a href={`/login?refer=${router.asPath}`}>
                <Button type="primary">点击登陆</Button>
            </a>
            <style jsx>{`
                .wrapper{display:flex;width:100%;height:100%;flex-direction:column;justify-content:center;align-items:center}
                .tip-text{padding:0;margin:0}
            `}</style>
        </div>
    }
    return <div className='wrapper'>
        <div className="user-info">
            <div className="avatar">
                <img src={user.avatar_url} />
            </div>
            <ul>
                <li>
                    <UserOutlined />
                    <label>{user.name}</label>
                </li>
                <li>
                    <HomeOutlined />
                    <label>{user.location}</label>
                </li>
                <li>
                    <MailOutlined />
                    <label>{user.email}</label>
                </li>
                <li>
                    <GlobalOutlined />
                    <a href={user.blog}>{user.blog}</a>
                </li>
            </ul>
        </div>
        <div className="repo-info">
            <Tabs activeKey={tabKey} animated={false} onChange={handleTabChange}>
                <Tabs.TabPane tab="创建的仓库" key="1">
                    { repos ? repos.map((item,index) => <Repo repo={item} key={index} /> ) : <Empty /> }
                </Tabs.TabPane>
                <Tabs.TabPane tab="关注的仓库" key="2">
                    { starred ? starred.map((item,index) => <Repo repo={item} key={index} /> ): <Empty /> }
                </Tabs.TabPane>
            </Tabs>
        </div>
        <style jsx>{`
            .wrapper{
                width:100%;
                display:flex;
                justify-content:space-between;
                padding:20px 0
            }
            .user-info{
                display:flex;
                flex-direction:column;
                margin-right:20px;
            }
            .avatar{
                width:200px;
                height:200px;
            }
            .user-info ul{
                margin-top:15px;
                list-style:none;
                padding:0;
            }

            .user-info ul li{
                line-height:35px;
                font-size:15px;
            }

            .user-info ul li label,
            .user-info ul li a{
                margin-left:8px;
                color:#666;
            }

            .avatar img {
                border-radius:5px;
                width:100%;
                display:block;
            }
            .name{
                font-size:22px;
            }
            .repo-info{
                flex:1;
            }
        `}</style>
    </div>
}

Index.getInitialProps = async ({ctx,reduxStore}) =>{
    const user = reduxStore.getState().user
    if(user && user.id){

        if(cache.get('repos') && cache.get('starred')){
            return {
                repos:cache.get('repos'),
                starred:cache.get('starred')
            }
        }


        try{
            const repos = await request({
                url:'/user/repos'
            },ctx.req)

            const starred = await request({
                url:'/user/starred'
            },ctx.req)

            const data = {}

            if(repos && repos.status === 200 && !repos.data.error){
                data['repos'] = repos.data
            }

            if(starred && starred.status === 200 && !starred.data.error){
                data['starred'] = starred.data
            }

            return data

        }catch(err){
            console.error(err)
        }
    }
    return {

    }
}

const mapState = state => ({
    user: state.user
})


export default withRouter(connect(mapState)(Index))