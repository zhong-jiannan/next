const axios = require('axios')
const { github } = require('../config')
module.exports = async (ctx, next) => {
    if(ctx.path === '/auth'){
        if(ctx.query.code){
            const { client_id, client_secret, redirect_uri, token_url} = github
            const tokenResp = await axios({
                method:'POST',
                url:token_url,
                data:{
                    client_id,
                    client_secret,
                    redirect_uri,
                    code:ctx.query.code
                },
                headers:{
                    Accept:'application/json'
                }
            })
            if(tokenResp.status !==200 || tokenResp.data.error){
                console.log(tokenResp.status,tokenResp.data)
                return ctx.body = 'get access token failed'
            }
            ctx.session.token = tokenResp.data
            const userResp = await axios({
                method:'GET',
                url:'https://api.github.com/user',
                headers:{
                    authorization:`${tokenResp.data.token_type} ${tokenResp.data.access_token}`
                }
            })
            if(userResp.status !==200 || userResp.data.error){
                console.log(userResp.status,userResp.data)
                return ctx.body = 'get user info failed'
            }
            ctx.session.user = userResp.data
            return ctx.redirect('/')
        }
        return ctx.body = 'you need have a code to access login'
    }
    await next()
}
