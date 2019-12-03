import layoutView from '../views/layout.art'
import usersView from '../views/users.art'
import loginbtnsView from '../views/loginbtns.art'
const Cookies = require('js-cookie')
class Layout {
    constructor(){
        this.render()
    }
    render(){
        let layoutHTML = layoutView({})
        $('#root').html(layoutHTML)
        // this.autoLogin()
    }
    autoLogin(){
        let cookieUser = Cookies.get('username')
        if(cookieUser){
            this.renderUsers(cookieUser)
        }else{
            this.renderBtn()
        }
    }
    renderUsers(cookieUser){
        let usersHTML = usersView({
            username : cookieUser
        })
        $('.account-wrap').html(usersHTML)
        this.bindEvent()
    }
    renderBtn(){
        let btnsHTML = loginbtnsView({})
        $('.account-wrap').html(btnsHTML)
        this.bindEvent()
    }
    bindEvent(){
        $('.js-acc-btn').on('click',this.showMenu.bind(this))
        // $('#register,#login').on('click',this.handelHash.bind(this))
        $('#logout').on('click',this.logout.bind(this))
        $(document).on('click',this.hiddenMenu.bind(this))
        $('.account-dropdown.js-dropdown').on('click',(evt)=>{evt.stopPropagation()})
    }
    logout(){
        Cookies.remove('username', { path: '' }); // removed!
        this.renderBtn()
    }
    hiddenMenu(){
        $('.account-item.js-item-menu').removeClass('show-dropdown')
    }
    showMenu(evt){
        evt.stopPropagation()
        $('.account-item.js-item-menu').toggleClass('show-dropdown')
    }
    // handelHash(evt){
    //     let {target} = evt 
    //     let hash = $(target).attr('id')
    //     location.hash = '#' + hash
    // }
    
}

export default new Layout()