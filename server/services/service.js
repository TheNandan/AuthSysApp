const Model = require('../models/model')
const userCollection = Model.user
const bcrypt = require('bcrypt')

exports.indexRoute = ( req,res ) => {
    res.render('index',{title:"Index"})
}

exports.signupRoute = ( req,res ) => {
    if(req.session.email)
    {
        res.redirect('/dashboard')
    }
    else{
        res.render('signup',{title:"Sign Up"})
    }
    
}

exports.signinRoute = ( req,res ) => {
    if(req.session.email)
    {
        res.redirect('/dashboard')
    }
    else{
        res.render('signin',{title:'Sign In'})
    }
    
}

exports.dashRoute = async( req,res ) => {
    if(req.session.email)
    {
        const username = req.session.username
        const foundUser = await userCollection.findOne({username:username})
        res.render('dashboard',{title:"Dashboard",userinfo:foundUser})
    }
    else
    {
        res.redirect('x404')
    }
    
}

exports.postSignup = async( req,res ) => {
    const { fname , lname , uname , email , pass , cpass } = req.body

    if( fname == '' || lname == '' || uname == '' || email == '' || pass == '' || cpass == '')
    {
        req.flash('info','Input fields cannot be Empty')
        const message = req.flash()
        res.render('signup',{title:'Sign Up',messages:message})
    }
    else
    {
        const emailExist = await userCollection.findOne({email:email})

    if( emailExist )
    {
        req.flash('info','user already exist , Please Sign In')
        const message = req.flash()
        res.render('signin',{title:'Sign In',messages:message})
    }
    else
    {
        if ( pass == cpass )
        {
            const salt = 12
            const hashpass = bcrypt.hashSync(pass,salt)

            const newUser = new userCollection({
                firstname : fname,
                lastname : lname,
                username : uname,
                email : email,
                password : hashpass
            })

            newUser.save()
            req.flash('success','Sign up Success')
        const message = req.flash()
        res.render('signin',{title:'Sign In',messages:message})
        }
        else
        {
        req.flash('warning','password did not match')
        const message = req.flash()
        res.render('signup',{title:'Sign Up',messages:message})
        }
        
    }
    }

    
}

exports.postSignin = async( req,res ) => {

    const { email , pass } = req.body

    if ( email == '' || pass == '')
    {
        req.flash('info','Input fields cannot be Empty')
        const message = req.flash()
        res.render('signin',{title:'Sign In',messages:message})
    }
    else
    {
        const userExist = await userCollection.findOne({email:email})
    

    if(userExist)
    {
        const comparePass = await bcrypt.compareSync(pass,userExist.password)
        if(comparePass)
        {
            sess = req.session
            sess.username = userExist.username
            sess.email = userExist.email

            if(req.session.email)
            {
                req.flash('success','Signed In')
                const message = req.flash()
                res.render('dashboard',{title:'Dashboard',messages:message,userinfo:userExist})
            }
            
        }
        else
        {
            req.flash('error','Wrong password')
                const message = req.flash()
                res.render('signin',{title:'Sign In',messages:message})
        }
        
    }
    else
    {
        req.flash('error','user does not exist , please Sign up')
                const message = req.flash()
                res.render('signup',{title:'Sign Up',messages:message})
    }
    }
  

}

exports.logoutRoute = ( req,res ) => {
    req.session.destroy( (err) => {
        if(err)
        {
            console.log(err)
        }
        console.log('logged out successfully')
        res.redirect('/')
    })
}

exports.x404Route = ( req,res ) => {
    res.render('x404',{title:"404"})
        
}
