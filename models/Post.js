const postsCollection = require('../db').collection("posts")

class Post{
    constructor(data, userID)
    {
        this.data = data;
        this.userID = userID;
    }

    static findAuthorId(userID)
    {
        return new Promise((resolve, reject) => {
            postsCollection.find().toArray().then((posts) => {
              if (posts) {
                resolve(posts);
              } else {
                reject('Post not found');
              }
            }).catch((error) => {
              reject();
            });
          }).catch(function() {
            reject()
        })
    }

    create ()
    {
        return new Promise((resolve, reject) => {
            console.log("POst : " + this.userID)
            this.data.userID = this.userID;
            postsCollection.insertOne(this.data).then((info) => {
                console.log("New Post Created !!!")
                resolve("New Post Created !!!")
            }).catch(() => {
                console.log("Please try again later.")
                reject("Please try again later.")
            })
        })
    }

    static findSingleById(postIdToDelete)
    {
        return new Promise((resolve, reject) => {
            postsCollection.find().toArray().then((posts) => {
              const matchingPost = posts.find(post => post._id.toString() === postIdToDelete.toString());
              if (matchingPost) {
                resolve(matchingPost);
              } else {
                reject('Post not found');
              }
            }).catch((error) => {
              reject();
            });
          }).catch(function() {
            reject()
        })
    }

    static delete(postIdToDelete, userID) {
        return new Promise(async (resolve, reject) => {
            try {
              let post = await Post.findSingleById(postIdToDelete)
              console.log(post)
              if(post.userID === userID){
                await postsCollection.deleteOne({_id : post._id})
                console.log("Post : Post Deletion Succesfull !!")
                resolve()
              }
              else{
                console.log("POst : Post Deletion UnSuccesfull !!")
                reject();
              }
                 
            } catch {
               reject()
            }
          })
    }
}


module.exports = Post