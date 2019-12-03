import indexControllers from '../controllers/layout'
import registerControllers from '../controllers/register'
import loginControllers from '../controllers/login'
class Router{
    constructor(){
        this.render()   
    }
    render(){
        window.addEventListener('load',this.refresh.bind(this))
        window.addEventListener('hashchange',this.handelHash.bind(this))
    }
    refresh(){
        let hash = location.hash.slice(1) || 'index'
        location.hash = hash;
        let str = hash.split('/')
        this.renderDOM(hash)
    }
    renderDOM(hash){
        let controllers = {
            indexControllers,
            // usersControllers,
            registerControllers,
            loginControllers
        }
        controllers[hash + 'Controllers'].render()
    }
    handelHash(){
        let hash = location.hash.slice(1)
        console.log(hash)
        this.renderDOM(hash)
    }
}
new Router()