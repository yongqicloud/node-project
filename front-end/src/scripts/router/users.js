import SMERouter from 'sme-router'
const userRouter = new SMERouter('root')

import {register} from '../controllers/register'
import {login} from '../controllers/login'

userRouter.route('/register',register)
userRouter.route('/login',login)

userRouter.route('*', (req, res, next) => {
    res.redirect('/login')
})