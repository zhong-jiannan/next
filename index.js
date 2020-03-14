const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const config = require('./config')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()
    server.use(async (ctx, next) => {
        await handle(ctx.req, ctx.res)
        ctx.response = false
        next()
    })
    server.use(router.routes())
    server.use(router.allowedMethods())
    server.listen(config.server.port, () => {
        console.log(`the server is running at port ${ config.server.port }...`)
    })
})
