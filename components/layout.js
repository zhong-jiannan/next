import { useState, useCallback } from 'react'
import { Layout, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd'
import{ logout } from '../store/action-creators'
import { connect } from 'react-redux'
import { github } from '../config'
import Container from './container'
const { Header, Content, Footer } = Layout
const Inner = ({ children, color,style }) => <div style={{color,...style}} >{children}</div>

const MyLayout = ({ children, user, logout }) => {
    const [value,setValue] = useState('')
    const handleChangeInput = useCallback((event)=>{setValue(event.target.value)},[])
    const handleOnSearch = useCallback(()=>{console.log('on search')},[])
    const handleLogout = useCallback(()=>{logout()},[])
    const logoutMeun = ()=>(
        <Menu>
            <Menu.Item>
                <div onClick={handleLogout}>退出</div>
            </Menu.Item>
        </Menu>
    )
    return (
        <Layout>
            <Header>
                <Container render={<Inner />}>
                    <div className="left">
                        <div className="logo">
                            <Avatar size={40} src="/logo.svg" />
                        </div>
                        <div className="search">
                            <Input.Search
                            placeholder="搜索"
                            value={value}
                            onChange={handleChangeInput}
                            onSearch={handleOnSearch}
                            />
                        </div>
                    </div>
                    {
                    (user && user.id) ? 
                    <Dropdown overlay={logoutMeun}>
                        <Avatar size={40} src={user.avatar_url} />
                    </Dropdown>
                    :
                    <Tooltip title="点击登陆">
                        <a href={github.login_url}><Avatar size={40} src="/logo.png" /></a>
                    </Tooltip>
                    }
                </Container>
            </Header>
            <Content>
                <Container render={<Inner />}>
                    {children}
                </Container>
                </Content>
            <Footer>
                <p className="copyright">Copyright © 2020 qianyi All rights reserved.</p>
            </Footer>
            <style jsx>{`
                .left{width:300px;display:inline-flex;justify-content:space-between;}
                .right{width:40px;}
                .logo{width:40px;}
                .search{width:240px;}
                .copyright{text-align:center}
            `}</style>
            <style jsx global>{`
                #__next,.ant-layout,.ant-layout-content{
                    height:100%;
                }
                .ant-layout-header{
                    padding:0
                }
            `}</style>
        </Layout>
    )
}


const mapState = state =>{
    return {
        user:state.user
    }
}


const mapDispatch = dispatch => {
    return {
        logout:()=>{dispatch(logout)}
    }
}

export default connect(mapState,mapDispatch)(MyLayout)