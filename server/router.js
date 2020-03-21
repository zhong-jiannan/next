const Router = require('koa-router')
const router = new Router

router.post('/logout',async ctx => {
    ctx.session = null
    ctx.body = {message:'success'}
    ctx.status = 200
    ctx.set({"Content-Type":"application/json"})
})



module.exports = router