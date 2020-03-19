module.exports = {
    server:{
        host:'localhost',
        port:3000
    },
    github:{
        login_url:'https://github.com/login/oauth/authorize',
        token_url:'https://github.com/login/oauth/access_token',
        client_id:'eed2e4c60426bba1efa3',
        client_secret:'7b40179b93a4e2ca99d67be970ea587e74c23e72',
        redirect_uri:'http://localhost:3000/auth',
        scope:'user'
    },
    redis:{
        host:'localhost',
        port:6379
    }
}