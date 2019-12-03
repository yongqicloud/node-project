import loginView from '../views/login.art'
import httpModel from '../models/httpModel'
const Cookies = require('js-cookie')
class Login{
    render(){
        // let loginHTML = loginView({})
        // $('#root').html(loginHTML)
        this.bindEvent()
    }
    bindEvent(){
        $('#btn-commit').on('click',this.handelSubmit.bind(this))
        $('.red-signin').on('click',this.handelRegister.bind(this))
    }
    async handelSubmit(){
        let username = $('#username').val()
        let password = $('#password').val()
        let data = $('#submitLoginVal').serialize()
        let loginResult = await httpModel.get({
            type:'post',
            data,
            url : '/api/users/signin' 
        }) 
        console.log(loginResult)
        if(loginResult.ret){
            // Cookies.set('username',username,{expires:7})
            location.href = '/index.html'
        }else{
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.msg('用户名或密码错误!',{
                    time : 2000,
                    anim: 5,
                    skin: 'layui-layer-faild'
                });
            });
        }
    }
    handelRegister(){
        location.hash = '#register'
    }
}
// export default new Login()
export const login = (req,res)=>{
    let loginHTML = loginView()
    res.render(loginHTML)
    new Login().render()
}