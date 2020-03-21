const axios = require('axios')
const { LOGOUT } = require('./action-type')


const logout = dispatch => {
    return axios({
        method:'POST',
        url:'/logout'
    }).then(resp => {
        if(resp.status === 200){
            dispatch({
                type:LOGOUT
            })
        }
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {
    logout
}