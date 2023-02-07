const route = require('express').Router()
const services = require('../services/service')

route.get('/',services.indexRoute)
route.get('/signup',services.signupRoute)
route.get('/signin',services.signinRoute)
route.get('/dashboard',services.dashRoute)
route.get('/logout',services.logoutRoute)
route.post('/signup',services.postSignup)
route.post('/signin',services.postSignin)

route.get('*',services.x404Route)


module.exports = route