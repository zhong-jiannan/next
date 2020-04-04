const Router = require('koa-router')
const router = new Router()
const axios = require('axios')
const { github } = require('../config')

router.get('/auth',async ctx => {
        if(ctx.query.code){
            const { client_id, client_secret, redirect_uri, token_url} = github
            try{
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
                    console.log('router 23 :请求接口，获取access_token失败',tokenResp)
                    return ctx.body = 'router 24 :请求接口，获取access_token失败'
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
                    console.log('router 36 : 获取用户信息失败',userResp)
                    return ctx.body = 'router 36 : 获取用户信息失败'
                }
                ctx.session.user = userResp.data
                ctx.redirect(ctx.session.refer || '/')
                return ctx.session.refer = ''

            }catch(err){
                return console.error('router 44 请求登陆错误:',err)
            }
        }
        return ctx.body = 'router 46 : 未收到OAuth的code信息'
})


router.get('/login',async ctx => {
    if(ctx.query.refer){
        ctx.session.refer = ctx.query.refer
        return ctx.redirect(github.login_url)
    }
    ctx.body = {
        message:'router 53 : 需要一个登陆后的重定向地址'
    }
    ctx.set({"Content-Type":"application/json"})
})



router.post('/logout',async ctx => {
    ctx.session = null
    ctx.body = {message:'success'}
    ctx.status = 200
    ctx.set({"Content-Type":"application/json"})
})



module.exports = router