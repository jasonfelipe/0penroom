
//Stuff to do
//Creating Get, Post, Updates, Deletes for Posts
//Creating Get, Post, Updates, Deletes for Messages


var db = require("../models");


module.exports = function (app) {

  //-----API ROUTES FOR FINDING AND CREATING USERS-----
  app.get("/api/users/", function (req, res) {
    db.User.findAll({})
      .then(function (dbUsers) {
        res.json(dbUsers);
      });
  });


  //Finding a matching name in the database. AKA the login (and for user profiles)
  app.get("/api/users/:name?", function (req, res) {
    db.User.findOne({
      where: {
        name: req.params.name
      }
    })
      .then(function (dbUsers) {
        res.json(dbUsers);
      });
  });


  //Registering a username.
  app.post("/api/users", function (req, res) {

    //creating a user by getting the req.body.name
    db.User.create({
      name: req.body.name,
    }).then(function (dbUsers) {

      res.json(dbUsers);

      //catching an error and sending it back to the client side. (the console log is in the server).
    }).catch(function (err) {
      console.log('Error creating username')
      res.send(err);
    });
  });

  //-----PLACE CODE FOR CREATING/UPDATING/GETTING/DELETING POSTS
app.post("/api/posts", function (req, res){
console.log(req.body.title)
  db.Post.create({
    title: req.body.title,
    description: req.body.description
  }).then(function(newTopic){
    res.json(newTopic);
  })
})
app.get("/api/posts", function (req,res){
  db.Post.findAll({})
  .then(function (grabT){
    res.json(grabT)
  })
})

  //Creating Messages
  app.post("/api/messages", function (req, res) {

    console.log(
      '\nAPI MESSAGE ROUTES CONSOLE LOG',
      '\nUSERNAME: ' + req.body.name,
      '\nTHEIR MESSAGE: ' + req.body.message,
      '\nIN WHAT TOPIC: ' + req.body.topic,
      "\n"
    );


    db.Message.create({
      user: req.body.name,
      message: req.body.message,
      topic: req.body.topic
    }).then(function (dbMessages) {

      res.json(dbMessages);

      //catching an error and sending it back to the client side. (the console log is in the server).
    }).catch(function (err) {
      console.log('Error creating Message')
      res.send(err);
    });
  });

  //Getting messages on specific topic

  app.get('/api/messages/:topic?', function (req, res) {
    db.Message.findAll({
      where: {
        topic: req.params.topic
      }

    })
      .then(function (dbMessage) {
        res.json(dbMessage);
      });
  });

}
