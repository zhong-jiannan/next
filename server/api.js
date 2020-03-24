const axios = require('axios')

const baseUrl = 'https://api.github.com'


module.exports = async (ctx,next) => {
    if(ctx.url.startsWith('/api/')){
       
        const token = ctx.session.token

        if(!token || !token.access_token){
            return ctx.body = 'you need to login'
        }
        
        const url = baseUrl + ctx.url.replace('/api/','/')

        const data = ctx.query || {}

        const resp = await axios({
            method:'GET',
            url,
            data,
            headers:{
                Authorization: `${token.token_type} ${token.access_token}`
            }
        })

        if(resp.status !== 200 || resp.data.error){
            return ctx.body = 'request error'
        }
        
        ctx.set({"Content-Type":"application/json"})
        return ctx.body = resp.data
        
    }
    await next()
}