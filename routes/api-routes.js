var db = require("../models");


module.exports = function (app) {
    app.get("/api/users/", function(req, res) {
        db.User.findAll({})
          .then(function(dbUsers) {
            res.json(dbUsers);
          });
      });


    app.post("/api/users", function(req, res) {
        console.log(req.body);
        // create takes an argument of an object describing the item we want to
        // insert into our table. In this case we just we pass in an object with a text
        // and complete property (req.body)
        db.User.create({
          name: req.body.name,
        }).then(function(dbUsers) {
          // We have access to the new todo as an argument inside of the callback function
          res.json(dbUsers);
        });
      }); 
}
