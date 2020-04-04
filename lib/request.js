const axios = require('axios')
const isServer = typeof window === 'undefined'
const github_base_url = "https://api.github.com"

async function requestGithub(method, url, data, headers){
    const combineUrl = `${github_base_url}${url}`
    try{
        if(method === 'GET'){
            return await axios({
                method,
                url:combineUrl,
                params:data,
                headers
            })
        }
        return await axios({
            method,
            url:combineUrl,
            data,
            headers
        })
    }catch(err){
        console.log('requestGithub函数请求错误：',err)
    }
}

 async function request( {method='GET',url, data={} }, req){
     if(!url){
         throw Error('url不能为空')
     }
     
    if(isServer){
        const session = req.session
        const token = session.token || {}
        const headers = {}
        if(token.access_token){
            headers['Authorization'] = `${token.token_type} ${token.access_token}`
        }
        return await requestGithub(method, url, data, headers)
    }else{
        return await axios({
            method,
            url:`/github${url}`,
            params:data
        })
    }
 }


 module.exports = {
     request,
     requestGithub
 }