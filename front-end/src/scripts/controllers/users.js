import navView   from '../views/nav.art'
import httpModel from '../models/httpModel'
import soundView from '../views/sound.art'
import store from 'store'
class Users{
    constructor(){
        this.isLogin = false
        this.username = ""
        this.nickname = ""
        this.email = ""
        this.cover_image = ""
        this.render()
    }
    async render(){
        await this.authLogin()
        let navHTML = navView({
            isLogin : this.isLogin,
            username : this.username,
            nickname : this.nickname,
            email : this.email,
            cover_image : this.cover_image
        })
        $('header.header-desktop').html(navHTML)
        this.bindEvent()
    }
    bindEvent(){
        $('.js-acc-btn').on('click',this.showMenu.bind(this))
        $(document).on('click',this.hiddenMenu.bind(this))
        $('.account-dropdown.js-dropdown').on('click',(evt)=>{evt.stopPropagation()})
        $('#logout').on('click',this.logout.bind(this))
        // $('input#SearchAll').on('input',this.Search.bind(this))
    }
    showMenu(evt){
        evt.stopPropagation()
        $('.account-item.js-item-menu').toggleClass('show-dropdown')
    }
    hiddenMenu(){
        $('.account-item.js-item-menu').removeClass('show-dropdown')
    }
    async authLogin(){
        let result = await httpModel.get({
            type:"get",
            url : '/api/users/isSignin'
        })
        console.log(result.data.username)
        let user_info = await httpModel.post({
            type : 'post',
            url: '/api/changeusers',
            data : {
                username : result.data.username
            }
        })
        console.log(user_info)
        if(result.ret){
            this.isLogin  = true
            this.nickname = user_info.data.info.nickname
            this.email = user_info.data.info.email
            this.cover_image = user_info.data.info.cover_image
            this.username = result.data.username 
        }
        console.log(result)
    }
    async logout(){
        let result = await httpModel.get({
            type:"get",
            url : '/api/users/isSignout'
        })
        if(result.ret){
            this.isLogin = false
            // location.reload()
            this.hiddenMenu()
            store.remove('token')
            location.reload()
        }
        

    }
    async Search(evt){
        let {target} = evt
        let KeyWords = $(target).val()
        console.log(KeyWords)
        let result = await httpModel.update({
            url : '/api/sound/search',
            KeyWords,
        })
        if(result.ret){
            
        }
    }
}
export default new Users()