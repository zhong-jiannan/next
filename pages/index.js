import { Button } from 'antd'
import { github } from '../config'
const Index = ()=>{
    const { login_url, client_id, scope, redirect_uri} = github
    const url = `${login_url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`
return <a href={url}>
    <Button type="primary">登陆</Button>
</a>
}

export default Index
