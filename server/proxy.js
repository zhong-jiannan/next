const { requestGithub } = require('../lib/request')
module.exports = server => {
    server.use(async (ctx,next) => {
        const path = ctx.path
        const method = ctx.method
        if(path.startsWith('/github/')){
            const session = ctx.session
            const token = session.token || {}
            const headers = {} 
            if(token.access_token){
                headers['Authorization'] = `${token.token_type} ${token.access_token}`
            }
            const result = await requestGithub(method,ctx.url.replace('/github/','/'),{},headers)
            ctx.status = result.status
            ctx.body = result.data
            ctx.set({"Content-Type":"application/json"})
        }else{
            await next()
        }
    })
}