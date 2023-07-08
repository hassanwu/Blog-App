let express = require('express')
const mongoose = require("mongoose")

const dotenv = require('dotenv')
dotenv.config();

let app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api', require('./router-api'))

let db;  

module.exports = app;

// mongoose.connect(process.env.connectionString, {useNewUrlParser : true, useUnifiedTopology: true}).then(() => {
//     console.log("Connection Established !!!")
//     db = mongoose.connection;
//     app.listen(3000)
// }).catch(err =>
//     console.log(err));



app.post('/load', (req, res)=>
{
    let users;
    if (mongoose.modelNames().includes('users')) {
        users = mongoose.model('users');
        console.log("already exists !!!")
    } 
    else {
        const userSchema = new mongoose.Schema({
          username: String,
          password: String,
        });
      
        users = mongoose.model('users', userSchema);

        console.log("new schema created !!!")

    }
    
    const newUser = new users({
        username: 'lmao',
        password: '123456'
    });
    
    newUser.save()
      .then(() => {
        console.log('Data saved successfully');
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });

      
    res.end("User Signed Up Successfully")
    
})


app.get('/', (req, res) =>{
    res.send(`
    <form action="/load" method="POST">
       <input type="submit" />
    </form>
    `);

})




