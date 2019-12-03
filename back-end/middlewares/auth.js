const Tools = require('../utils/tools')
const isSignin = async function(req,res,next){
    res.set('Content-Type', 'application/json; charset=utf-8')
    // 方案一
    // let token = req.get('x-access-token')
    // 方案二
    let {username,token} = req.cookies
    if(token){
        if(req.path === "/isSignin"){
            res.render('success',{      
                data : JSON.stringify({
                    message  : '已登陆',
                    // 兼容两种token携带方法
                    username : req.session.username || username
                })
            }) 
        }else{
            let decoded = await Tools.verifyToken(token)
            if(decoded){
                next()
            }else{
                res.render('fail',{
                    data : JSON.stringify({
                        message : "token 验证失败"
                    })
                })
            }
            
        }
        
    }else{
        res.render('fail',{
            data : JSON.stringify({
                message : '请登录'
            })
        }) 
    }
}
module.exports = {
    isSignin
}