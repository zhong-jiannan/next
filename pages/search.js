import { isValidElement, useEffect } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { Row, Col, List, Empty, Pagination } from 'antd'
import cacheArray,{ setCacheSearchList, getCacheSearchList } from '../lib/cache-repo-basic'
import { request } from '../lib/request'
import Repo from '../components/repo'

const languages = [{ name: 'All' },
{ name: 'Javascript', value: 'javascript' },
{ name: 'TypeScript', value: 'typescript' },
{ name: 'HTML', value: 'html' },
{ name: 'CSS', value: 'css' }
]

const dataSource = [
    { name: 'Best Match' },
    { name: 'Most Stars', sort: 'stars', order: 'desc' },
    { name: 'Fewest Stars', sort: 'stars', order: 'asc' },
    { name: 'Most Forks', sort: 'forks', order: 'desc' },
    { name: 'Fewest Forks', sort: 'forks', order: 'asc' }
]

const selectedStyle = {
    borderLeft: '3px solid #1890ff'
}

const noop = () => { }

const FilterLink = ({ query, name, language, sort, order, page }) => {
    let queryString = `/search?query=${query}`
    if (language) queryString += `&language=${language}`
    if (sort) queryString += `&sort=${sort}&order=${order || 'asc'}`
    if (page) queryString += `&page=${page}`

    return (
        <Link href={queryString}>
            {isValidElement(name) ? name : <a>{name}</a>}
        </Link>
    )
}

const isServer = typeof window === 'undefined'

const Search = ({ repos, params, router }) => {
    useEffect(()=>{
        if(!isServer){
            cacheArray(repos.items)
            setCacheSearchList(params,repos)
        }
    })

    const total = repos.total_count
    const query = router.query
    const { page, language, sort, order } = query

    return <div className="search-container">
        <Row gutter={20}>
            <Col span={5}>
                <div className="stick">
                    <List
                        header={<span className="title">语言</span>}
                        bordered
                        dataSource={languages}
                        renderItem={item => (
                            <List.Item style={language === item.value ? selectedStyle : null}>
                                {language === item.value ? <span>{item.name}</span> : <FilterLink {...query} name={item.name} language={item.value} />}
                            </List.Item>
                        )}
                        style={{ marginBottom: 20 }}
                    />
                    <List
                        header={<span className="title">排序</span>}
                        bordered
                        dataSource={dataSource}
                        renderItem={item => {
                            let selected = false
                            if (item.name === 'Best Match' && !sort) {
                                selected = true
                            } else if (item.sort === sort && item.order === order) {
                                selected = true
                            }
                            return (<List.Item style={selected ? selectedStyle : null}>
                                {selected ? <span>{item.name}</span> : <FilterLink {...query} name={item.name} sort={item.sort} order={item.order} />}
                            </List.Item>
                            )
                        }}
                    />
                </div>
            </Col>
            <Col span={19}>
                <h1 className="result-title">共有<label>{total}</label>个仓库</h1>
                {repos.items ? repos.items.map(item => <Repo repo={item} key={item.id} />) : <Empty />}
                <div className="pagination">
                    <Pagination
                        showSizeChanger={false}
                        current={Number(page) || 1}
                        total={total < 1000 ? total : 1000}
                        pageSize={30}
                        onChange={noop}
                        itemRender={(page, type, originalElement) => (
                            <FilterLink
                                {...query}
                                name={type === 'page' ? page : originalElement}
                                page={page}
                            />
                        )}
                    />
                </div>
            </Col>
        </Row>
        <style jsx>{`
            .search-container{
                width:100%;
                padding:20px;
            }
            .title{
                font-weight:bold;
                font-size:17px;
            }
            .stick{
                position:sticky;
                top:20px;
            }
            .pagination{
                text-align:center;
            }
            .result-title label{
                color:#1890ff;
            }
        `}</style>
    </div>
}

Search.getInitialProps = async ({ ctx }) => {

    const { query, language, sort, order, page } = ctx.query

    if (!query) {
        return {}
    }

    if(getCacheSearchList(ctx.query)){
        return {
            params:ctx.query,
            repos:getCacheSearchList(ctx.query)
        }
    }

    let queryString = `/search/repositories?q=${query}`
    if (language) queryString += `+language:${language}`
    if (sort) queryString += `&sort=${sort}&order=${order || 'asc'}`
    if (page) queryString += `&page=${page}`

    const res = await request({
        url: queryString
    }, ctx.req)

    return {
        repos: res.data,
        params:ctx.query
    }
}

export default withRouter(Search)