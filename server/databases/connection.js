const mongoose = require('mongoose')
mongoose.set('strictQuery',true)
const URI = process.env.URI || process.env.localURI
const DB = process.env.DB

const connectDB = async() => {

    try {
        mongoose.connect(URI,{dbName:DB})
        console.log(` 💾 connected to ${DB} ....`)
    } catch (error) {
        console.log(error)
        process.exit(1)   
    }
}

module.exports = connectDB