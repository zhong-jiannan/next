const axios = require('axios')

const isServer = typeof window === 'undefined'

const github_base_url = "https://api.github.com"

async function requestGithub(method, url, data, headers){
    return await axios({
        method,
        url:`${github_base_url}${url}`,
        data,
        headers
    })
}

 async function request( {method='GET',url,data ={} }, req){
     if(!url){
         throw Error('you must provide a url')
     }
    if(isServer){

        const session = req.session

        const token = session.token || {}

        const headers = {}

        if(token.access_token){
            headers['Authorization'] = `${token.token_type} ${token.access_token}`
        }

        return await requestGithub(method,url,data,headers)

    }else{
        return await axios({
            method,
            url:`/github${url}`,
            data
        })
    }

 }


 module.exports = {
     request,
     requestGithub
 }