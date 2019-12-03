const usersModel     = require('../models/usersModel') 
const Tools = require('../utils/tools')
const authMiddleware = require('../middlewares/auth')
// 中间件 判断用户名是否存在
const checkUser = async function(req, res, next){
    res.set('Content-Type', 'application/json; charset=utf-8') 
    let {username} = req.body
    let result = await usersModel.findOne({username})
    if (result) {
        res.render('fail',{
            data : JSON.stringify({
                message : '该账户已存在'
            })
        })
    }else{
        next()
    }
}
const signup = async function(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    console.log(req.body)
    const {username,email,password} = req.body
    let pwdResult = await Tools.hash(password)
    let result = await usersModel.save({
        username,
        email,
        password:pwdResult
    })
    if(result){
        res.render('success',{
            data : JSON.stringify({
                message : '注册成功'
            })
        })
    }else{
        res.render('fail',{
            data : JSON.stringify({
                message : '注册失败'
            })
        })
    }
}
const signin = async function(req,res,next){
    res.set('Content-Type', 'application/json; charset=utf-8')
    const {username,email,password} = req.body
    let result = await usersModel.findOne({username})
    if(!result){
        res.render('fail',{
            data : JSON.stringify({
                message : '该账户不存在'
            })
        })
    }else{
        let compareResult = await Tools.compare(password,result.password)
        if(compareResult){
            let token = await Tools.generateToken( )
            // 方案一 ：在请求头header里面注入token
            // res.header('X-Access-Token',token)
            // req.session.username = username
            // 方案二 ：cookie 装填token
            res.cookie('token',token)
            res.cookie('username',username)
            res.render('success',{
                data : JSON.stringify({
                    type: 'signin',
                    message : '登陆成功',
                    username
                })
            }) 
        }else{
            res.render('fail',{
                data : JSON.stringify({
                    message : '用户名或密码错误'
                })
            }) 
        }
    }
}
const isSignin = authMiddleware.isSignin
const isSignout = function(req,res,next){
    res.set('Content-Type', 'application/json; charset=utf-8')
    // 方案一
    req.session = null
    // 方案二
    res.cookie('token', '')
    res.cookie('username', '')
    
    res.render('success',{
        data : JSON.stringify({
            message : '注销成功'
        })
    })
}
module.exports = {
    signup,
    checkUser,
    signin,
    isSignin,
    isSignout
}