import rejisterView from '../views/rejister.art'
import httpModel from '../models/httpModel'

class Rejister{
    render(){
        // let rejsterHTML = rejisterView({})
        // $('#root').html(rejsterHTML)
        // $('#submitRegisterVal')[0].reset()
        this.bindEvent()
    }
    bindEvent(){
        $('#btn-commit').on('click',this.handelSubmit.bind(this))
        $('.red-signin').on('click',this.handelSignin.bind(this))
    }
    async handelSubmit(){
        let data = $('#submitRegisterVal').serialize()
        let signupResult = await httpModel.get({
            type:'post',
            data,
            url : '/api/users/signup' 
        }) 
        if(signupResult.ret){
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.msg('注册成功!',{
                    time : 2000,
                    anim: 5,
                    skin: 'layui-layer-success',
                    end :()=>{
                        location.hash = '#login'
                    }
                });
            }); 
            
        }else{
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.msg('该用户名已存在!',{
                    time : 2000,
                    anim: 5,
                    skin: 'layui-layer-faild'
                });
            });
        }
        console.log(signupResult)
    }
    handelSignin(){
        location.hash = '#login'
    }
}
// export default new Rejister()
export const register = (req,res)=>{
    let rejisterHTML = rejisterView()
    res.render(rejisterHTML)
    new Rejister().render()
}
