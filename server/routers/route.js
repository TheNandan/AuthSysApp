const route = require('express').Router()
const controller = require('../controllers/controller')

route.get('/',controller.indexRoute)
route.get('/signup',controller.signupRoute)
route.get('/signin',controller.signinRoute)
route.get('/dashboard',controller.dashRoute)
route.get('/logout',controller.logoutRoute)
route.post('/signup',controller.postSignup)
route.post('/signin',controller.postSignin)

route.get('*',controller.x404Route)


module.exports = route