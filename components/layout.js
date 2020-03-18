import { useState, useCallback } from 'react'
import { Layout, Input, Avatar } from 'antd'
import Container from './container'
const { Header, Content, Footer } = Layout
const Inner = ({ children, color,style }) => <div style={{color,...style}} >{children}</div>

export default ({ children }) => {

    const [value,setValue] = useState('')
    const handleChangeInput = useCallback((event)=>{setValue(event.target.value)},[])
    const handleOnSearch = useCallback(()=>{console.log('on search')},[])
    
    return (
        <Layout>
            <Header>
                <Container render={<Inner />}>
                    <div className="left">
                        <div className="logo">
                            <Avatar size={40} />
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
                    <Avatar size={40} src="https://avatars0.githubusercontent.com/u/58517681?v=4" />
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