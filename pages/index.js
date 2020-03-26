import { GlobalOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons'
import { github } from '../config'
import { connect } from 'react-redux'
import { Button } from 'antd'
const Index = ({ user }) => {
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
    return <div className='info'>
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
    const mapState = state => ({
        user: state.user
    })

    export default connect(mapState)(Index)