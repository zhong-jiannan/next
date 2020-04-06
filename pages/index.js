import { GlobalOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons'
import { request } from '../lib/request'
import { github } from '../config'
import { connect } from 'react-redux'
import { Button, Tabs, Empty } from 'antd'
import Repo from '../components/repo'

const Index = ({ user, repos, starred }) => {

    if (!user || !user.id) {
        return <div className="wrapper">
            <p className="tip-text">您还未登陆</p>
            <a href={github.login_url}>
                <Button type="primary">点击登陆</Button>
            </a>
            <style jsx>{`
            .wrapper{
                display:flex;
                width:100%;
                height:100%;
                flex-direction:column;
                justify-content:center;
                align-items:center;
            }
            .tip-text{
                padding:0;
                margin:0;
            }
        `}</style>
        </div>
    }
    return <div className='wrapper'>
        <div className="user-info">
            <div className="avatar">
                <img src={user.avatar_url} />
            </div>
            <p className="name">{user.name}</p>
            <p className="location">
                <HomeOutlined />
                {user.location}
            </p>
            <p className="email">
                <MailOutlined />
                {user.email}
            </p>
            <p className="website">
                <GlobalOutlined />
                {user.blog}
            </p>
        </div>
        <div className="repo-info">
            <Tabs animated={false}>
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
                margin-bottom:30px;
            }
            .avatar img {
                border-radius:5px;
                width:100%;
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
            console.log('index中repos和starred请求错误',err)
        }
    }
    return {

    }
}


const mapState = state => ({
    user: state.user
})


export default connect(mapState)(Index)