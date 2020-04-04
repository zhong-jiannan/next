import { GlobalOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons'
import { request } from '../lib/request'
import { github } from '../config'
import { connect } from 'react-redux'
import { Button } from 'antd'
const Index = ({ user,repos,starred }) => {
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
    return <div className='info' repos={repos} starred={starred}>
        <div className="basic-info">
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
        <style jsx>{`
            .info{
                width:100%;
                display:flex;
                justify-content:space-between;
            }
            .basic-info{
                display:flex;
                flex-direction:column;
            }
            .avatar{
                width:200px;
                height:200px;
                margin-top:30px;
                margin-bottom:30px;
            }
            .avatar img {
                border-radius:5px;
                width:100%;
            }
            .name{
                font-size:22px;
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

            if(repos && repos.status === 200){
                data['repos'] = repos.data
            }
            if(starred && starred.status === 200){
                data['starred'] = starred.data
            }

            return data

        }catch(err){
            console.log('index请求错误')
            console.error(err)
        }

    }
    return {

    }
}


const mapState = state => ({
    user: state.user
})


export default connect(mapState)(Index)