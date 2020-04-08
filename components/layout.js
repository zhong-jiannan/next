import { useState, useCallback } from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { Layout, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import{ logout } from '../store/action-creators'
import { connect } from 'react-redux'
import Container from './container'
const { Header, Content, Footer } = Layout

const MyLayout = ({ children, user, logout, router }) => {
    const [value,setValue] = useState('')
    const handleChangeInput = useCallback((event)=>{setValue(event.target.value)},[])
    const handleOnSearch = useCallback(()=>{
        router.push(`/search?query=${value}`)
    },[value])
    const handleLogout = useCallback(()=>{logout()},[logout])
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
                <Container render={<div style={{alignItems:'center'}} />}>
                    <div className="left">
                        <div className="logo">
                            <Link href="/">
                                <Avatar size={40} src="/images/logo.svg" />
                            </Link>
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
                        <a href={`/login?refer=${router.asPath}`}><Avatar size={40} icon={ <UserOutlined />} /></a>
                    </Tooltip>
                    }
                </Container>
            </Header>
            <Content>
                <Container render={<div style={{flexGrow:1}} />}>
                    {children}
                </Container>
                </Content>
            <Footer>
                <Container render={<div style={{justifyContent:'center'}} />}>
                    <p className="copyright">Develop By ZhongJiannan @ 2020.
                    <a href="http://beian.miit.gov.cn/">赣ICP备20004032号</a>
                    </p>
                </Container>
            </Footer>
            <style jsx>{`
                .left{width:300px;display:inline-flex;justify-content:space-between}
                .right{width:40px}
                .logo{width:40px;cursor:pointer}
                .search{width:240px}
                .copyright{margin:0}
                .copyright a {margin-left:15px}
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

export default connect(mapState,mapDispatch)(withRouter(MyLayout))