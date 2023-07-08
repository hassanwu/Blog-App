const usersCollection = require('../db').collection("users")

class User{

    constructor(_username, _password)
    {
        this.id = "";
        this.username = _username;
        this.password = _password;
    }

    static getUsers()
    {
        return new Promise((resolve, reject) => {
            usersCollection.find().toArray().then((users)=>{
                console.log("2")
                resolve(users);
            }).catch(()=>{
                console.log("1")
                reject();
            })
        })
    }

    register()
    {
        return new Promise((resolve, reject) => {
            usersCollection.insertOne({username : this.username, password: this.password}).then((info) => {
                console.log("New User Created !!!")
                resolve("New User Created !!!")
            }).catch(() => {
                console.log("Please try again later.")
                reject("Please try again later.")
            })
        })
    }

    static exists(_username)
    {
        return new Promise((resolve, reject) => {

        usersCollection.findOne({username : _username}).then((user) => {
            if (user) {
                console.log("Inside Exists 1")
                reject()
            } else {
                console.log("Inside Exists 2")
                resolve()
            }
        }).catch((err) =>{
            reject();
        })

    })
    }

    static findByUsername(_username){
        return new Promise((resolve, reject) => {
            usersCollection.findOne({username : _username}).then((user) => {
                if (user) {
                  resolve(user)
                } else {
                  reject('User not found');
                }
              }).catch(()=>{
                reject("usssss")
              })

        }).catch(function() {
            reject("Please try again later.")
        })
    }

    login()
    {
        console.log(this.username)
        console.log(this.password)
        return new Promise((resolve, reject) => {
            usersCollection.findOne({username : this.username}).then((user) => {
                if (user.password == this.password) {
                  console.log(user)
                  this.id = user._id.toString();
                  resolve("Congrats")
                } else {
                  reject('User not found');
                }
              }).catch(()=>{
                reject("usssss")
              })

        }).catch(function() {
            reject("Please try again later.")
        })
      
  
    }
}

module.exports = User;