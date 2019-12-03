import navView from '../views/nav.art'
// import httpModel from '../models/httpModel'
class Users{
    constructor(){
        this.isLogin = true
        this.render()
    }
    render(){
        let navHTML = navView({
            islogin : this.isLogin 
        })
        $('header.header-desktop').html(navHTML)
        this.bindEvent()
    }
    bindEvent(){
        
        $('input#SearchAll').on('input',this.Search.bind(this))
    }
    Search(evt){
        
        let {target} = evt
        console.log(target)
    }
    
}
export default new Users()