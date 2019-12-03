import SMERouter from 'sme-router'
const Router = new SMERouter('main-content')


import {home} from '../controllers/home'
import * as position from '../controllers/position'
import * as sound from '../controllers/sound'
import * as changeusers from '../controllers/changeusers'
import {search} from '../middleWares/search'
Router.use((req)=>{
    let url = req.url.slice(1).split("?")[0].split('_')[0]
    $(`ul.list-unstyled.navbar__list li[data-url=${url}]`).addClass('active').siblings().removeClass('active')

})

Router.route('/home',home)

Router.route('/position',position.info)
Router.route('/position_add',position.add)
Router.route('/position_update',position.update)

Router.route('/sound',sound.info)
Router.route('/sound_add',sound.add)
Router.route('/sound_update',sound.update)

Router.route('/changeusers',changeusers.info)
// Router.route()

Router.route('*', (req, res, next) => {
    res.redirect('/home')
})