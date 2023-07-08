const User = require('../models/User')
const Post = require('../models/Post')
const jwt = require('jsonwebtoken')

exports.apiGetUsers = async function(req, res) {
    try{
        let users = await User.getUsers();
        res.json(users);
    }catch{
        console.log("GetUsers UnsucessFull !!!")
        res.json("GetUsers UnsucessFull !!!")
    }
}

exports.apiRegister = async function(req, res)
{
    try{
        User.exists(req.body.username).then(async()=>{
            console.log("inside false");
            let user = new User(req.body.username, req.body.password);
            await user.register();
            res.json("User Created Successfully !!!")
        }).catch(() => res.json("Unsuccessful"))
            
        
    }catch (err){
        res.json("User not created !!! " + err)
    }

}

exports.apiGetPostsByUsername = async function(req, res){
    try{
        let authorDoc = await User.findByUsername(req.params.username)
        let posts = await Post.findAuthorId(authorDoc._id)
        res.json(posts);
    }
    catch{
        res.json("Soryy, invalid ")
    }
}

exports.apimustBeLoggedIn = function(req, res, next){
    try{
        req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET)
        console.log("Inside apimustBeLoggedIn")
        console.log("UC : " + req.apiUser._id);
        next();
        
    }
    catch{
        console.log("Sorry !! PLease provide a valid token")
        res.json("Sorry !! PLease provide a valid token")
    } 
}

exports.apiLogin = function(req, res) {
    console.log(req.body)
    let user = new User(req.body.username, req.body.password);
    user.login().then(function(){
         res.json(jwt.sign({_id: user.id}, process.env.JWTSECRET, {expiresIn : '30d'}))
    }).catch(function(err){
        res.json(" Login Unsuccessful from user Controller")
    })
}



