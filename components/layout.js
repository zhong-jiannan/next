import { useState, useCallback } from 'react'
import { Layout, Input, Avatar } from 'antd'
const { Header, Content, Footer } = Layout


export default ({ children }) => {
    const [value,setValue] = useState('')

    const handleChangeInput = useCallback((event)=>{
        setValue(event.target.value)
    },[])

    const handleOnSearch = useCallback(()=>{
        console.log('on search')
    },[])

    return (
        <Layout>
            <Header>
                <div className="inner">
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
                        <div className="clearfix"></div>
                    </div>
                    <div className="right">
                        <div className="user">
                            <Avatar size={40} src="https://avatars0.githubusercontent.com/u/58517681?v=4" />
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </Header>
            <Content>{children}</Content>
            <Footer>
                <p className="copyright">Copyright © 2020 qianyi All rights reserved.</p>
            </Footer>
            <style jsx>{`
                .inner{width:1200px;margin:0 auto}
                .clearfix{clear:both}
                .left{float:left;width:300px}
                .logo{width:40px;float:left}
                .search{width:240px;float:right}
                .right{width:40px;float:right}
                .copyright{text-align:center}
            `}</style>
            <style jsx global>{`
                #__next,.ant-layout,.ant-layout-content{
                    height:100%;
                }
            `}</style>
        </Layout>
    )
}