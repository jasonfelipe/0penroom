
//Stuff to do
//Creating Get, Post, Updates, Deletes for Posts
//Creating Get, Post, Updates, Deletes for Messages


var db = require("../models");


module.exports = function (app) {

//-----API ROUTES FOR FINDING AND CREATING USERS-----
    app.get("/api/users/", function(req, res) {
        db.User.findAll({})
          .then(function(dbUsers) {
            res.json(dbUsers);
          });
      });


    //Finding a matching name in the database. AKA the login (and for user profiles)
    app.get("/api/users/:name?", function(req,res){
      db.User.findOne({
        where: {
          name: req.params.name
        }
      })
        .then(function(dbUsers){
          res.json(dbUsers);
        });
    });


    //Registering a username.
    app.post("/api/users", function(req, res) {
      
        //creating a user by getting the req.body.name
        db.User.create({
          name: req.body.name,
        }).then(function(dbUsers) {

          res.json(dbUsers);

          //catching an error and sending it back to the client side. (the console log is in the server).
        }).catch(function(err){
          console.log('Error creating username')
          res.send(err);
        });
      }); 

//-----PLACE CODE FOR CREATING/UPDATING/GETTING/DELETING POSTS


//-----PLACE CODE FOR CREATING/UPDATING/GETTING MESSAGES
}
