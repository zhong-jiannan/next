const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')
const sessionStore = require('./server/session-store')
const config = require('./config')
const redis = new Redis({...config.redis})
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
redis.on('connect',()=>{ console.log('redis client connected...') })
app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()
    server.keys = ['a project for next study']
    const sessionConfig = {
        key:'sessionId',
        store:new sessionStore(redis)
    }
    server.use(session(sessionConfig, server))
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
