module.exports = {
    server:{
        host:'localhost',
        port:3000
    },
    github:{
        token_url:'https://github.com/login/oauth/access_token',
        client_id:'eed2e4c60426bba1efa3',
        client_secret:'write you client secret here',
        redirect_uri:'http://localhost:3000/auth',
        scope:'user'
    },
    redis:{
        host:'localhost',
        port:6379
    }
}