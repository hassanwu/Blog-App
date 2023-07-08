const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

console.log(process.env.CONNECTIONSTRING)
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connection Established !!!")
    const app = require('./app')
    app.listen(process.env.PORT)
}).catch(err =>
    console.log(err));
    
module.exports = mongoose.connection;