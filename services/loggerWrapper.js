const loggerObj = (code,data,user)=>{
    return {
        code:code,
        data: data,
        user: user?user:null
    }
}
module.exports = {loggerObj};