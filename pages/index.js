const { github } = require('../config')

const { login_url,client_id,scope,redirect_uri }  = github


const url = `${login_url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`
export default () =><a href={url}>登陆</a>