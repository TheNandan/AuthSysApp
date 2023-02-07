const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model

const userSchema = Schema({
    firstname : {
        type : String,
        required:true,
        lowercase : true
    },
    lastname : {
        type : String,
        required : true,
        lowercase : true
    },
    username : {
        type : String,
        required : true,
        lowercase : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique:true
    },
    password : {
        type : String,
        required : true,
    }
})

exports.user = Model('user',userSchema)