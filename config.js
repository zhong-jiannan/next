const { client_secret, redirect_uri,client_id} = require('./secret')

module.exports = {
    server:{
        host:'localhost',
        port:3000
    },
    github:{
        login_url:`https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=user`,
        token_url:'https://github.com/login/oauth/access_token',
        client_id,
        client_secret,
        redirect_uri,
        scope:'user'
    },
    redis:{
        host:'localhost',
        port:6379
    }
}