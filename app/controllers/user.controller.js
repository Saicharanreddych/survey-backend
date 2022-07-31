
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const user_roles = db.sequelize.models.user_roles;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const username = req.query.name;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;
  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
  
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
};
exports.checkAdmin = (req, res) => {
  
  user_roles.findAll({
    where : {roleId:3}
  })
    .then(data => {
      
      if (data.length) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No admin as of now`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error connecting to server"
      });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;
    var data = {}
    
    
    data.username = req.body.username;
    
  User.update(data, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

