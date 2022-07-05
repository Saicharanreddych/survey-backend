const db = require("../models");
const bcrypt = require('bcrypt');
const User = db.users;
const Op = db.Sequelize.Op;
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a new User
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password,salt);
  const user = {
    email: req.body.email,
    fname: req.body.firstname,
    lname: req.body.lastname,
    password:req.body.password
  };
  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while signing up the user."
      });
    });
};