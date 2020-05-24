import { Row, Col, List, Empty } from 'antd'
import { request } from '../lib/request'
import Repo from '../components/repo'

const languages = ['Javascript','HTML','CSS','Java','Rust']

const sort = [
    {name:'Best Match'},
    {name:'Most Stars',sort:'stars',order:'desc'},
    {name:'Fewest Stars',sort:'stars',order:'asc'},
    {name:'Most Forks',sort:'forks',order:'desc'},
    {name:'Fewest Forks',sort:'forks',order:'asc'}
]


const Search = ({repos})=>{

    return <div className="search-container">
        <Row gutter={20}>
            <Col span={5}>
                <div className="stick">
                    <List 
                        header={<span className="title">语言</span>}
                        bordered
                        dataSource={languages}
                        renderItem={ item => <List.Item><a>{item}</a></List.Item> }
                        style={{marginBottom:20}}
                        size="small"
                    />
                    <List 
                        header={<span className="title">排序</span>}
                        bordered
                        dataSource={ sort }
                        renderItem={ item => <List.Item><a>{item.name}</a></List.Item> }
                        size="small"
                    />
                </div>
            </Col>
            <Col span={19}>
                { repos.items ? repos.items.map( item => <Repo repo={ item } key={item.id} />) : <Empty /> }
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
        `}</style>
    </div>
}

Search.getInitialProps = async ({ctx}) =>{

    const { query, language, sort, order, page } = ctx.query

    if(query){

        let queryString = `/search/repositories?q=${query}`
        if(language) queryString += `+language:${language}`
        if(sort) queryString += `&sort=${sort}&order=${ order || 'asc'}`
        if(page) queryString += `&page=${page}`

        const res = await request({
            url:queryString
        },ctx.req)
        
        return {
            repos:res.data
        }

    }

    return {

    }
}

export default Search