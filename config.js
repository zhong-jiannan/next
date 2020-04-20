const { client_secret, redirect_uri} = require('./secret')

module.exports = {
    server:{
        host:'localhost',
        port:3000
    },
    github:{
        login_url:`https://github.com/login/oauth/authorize?client_id=eed2e4c60426bba1efa3&redirect_uri=${redirect_uri}&scope=user`,
        token_url:'https://github.com/login/oauth/access_token',
        client_id:'eed2e4c60426bba1efa3',
        client_secret,
        redirect_uri,
        scope:'user'
    },
    redis:{
        host:'localhost',
        port:6379
    }
}