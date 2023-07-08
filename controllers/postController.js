const Post = require('../models/Post')

exports.apiCreate = function(req, res) {
    console.log("PC : " + req.apiUser._id);

    let post = new Post(req.body, req.apiUser._id)
    post.create().then(()=>{
        res.json("Congrats.")
    }).catch(function(err){
        res.json("Sorry Post Controller !");
    })
}

exports.apiDelete = function(req, res){
    Post.delete(req.params.id, req.apiUser._id).then(()=>{
        console.log("Sucessfully Deleted !!!")
        res.json("Sucessfully Deleted !!!")
    }).catch(() => {
        console.log("Delete Not Successful !!!")
        res.json("Delete Not Successful !!!")
    })
}