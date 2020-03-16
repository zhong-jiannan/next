class SessionStore {
    constructor(redis){
        this.redis = redis
    }
    prefix(key){
        return `session:${key}`
    }
    async get(key){
        try{
            const sessionStr = await this.redis.get(this.prefix(key))
            return JSON.parse(sessionStr)
        }catch(err){
            console.err(err)
        }
    }
    async set(key, session, maxAge){
        try{
            const sessionStr = JSON.stringify(session)
            if(typeof maxAge === 'number'){
                maxAge = maxAge / 1000
                return this.redis.setex(this.prefix(key),maxAge,sessionStr)
            }else{
                return this.redis.set(this.prefix(key),sessionStr)
            }
        }catch(err){
            console.err(err)
        }
    }
    async destroy(key){
        return this.redis.del(this.prefix(key))
    }
}
module.exports = SessionStore