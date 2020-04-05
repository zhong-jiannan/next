const Koa = require('koa')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')
const onerror = require('koa-onerror')
const router = require('./server/router')
const sessionStore = require('./server/session-store')
const config = require('./config')
const proxy = require('./server/proxy')
const redis = new Redis({...config.redis})
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
redis.on('connect',()=>{ console.log('redis client connected...') })
app.prepare().then(() => {
    const server = new Koa()

    onerror(server)
    
    server.keys = ['a project for next study']
    const sessionConfig = {
        key:'sessionId',
        store:new sessionStore(redis)
    }
    server.use(session(sessionConfig, server))
    proxy(server)
    server.use(router.routes())
    server.use(router.allowedMethods())
    server.use(async (ctx, next) => {
        ctx.req.session = ctx.session
        await handle(ctx.req, ctx.res)
        ctx.response = false
        next()
    })
    server.listen(config.server.port, () => {
        console.log(`the server is running at port ${ config.server.port }...`)
    })
})
