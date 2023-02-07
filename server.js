require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const connectDB = require('./server/databases/connection')
const session = require('express-session')
const connectflash = require('connect-flash')
const app = express()

const PORT = process.env.PORT
const SECRET = process.env.SECRET

app.set('view engine','ejs')
app.use(express.static('assets'))
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(session({
    secret:SECRET,
    saveUninitialized:false,
    resave:false,
}))
app.use(connectflash())
app.use(( req,res,next ) => {
    res.locals.message = req.flash()
    next()
})

app.use('/',require('./server/routers/route'))

connectDB().then( ()=>{
    app.listen(PORT, console.log(`🚀 @ http://127.0.0.1:${PORT}`))
}
)