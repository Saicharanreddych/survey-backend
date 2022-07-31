const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Survey = db.survey;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkDuplicateSurveyname = (req, res, next) => {
  // Surveyname
  Survey.findOne({
    where: {
      surveyname: req.body.surveyname
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Surveyname is already in use!"
      });
      return;
    }
    next();
  });
  
}

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    
      if (!ROLES.includes(req.body.roles)) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles
        });
        return;
      }
    
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
  checkDuplicateSurveyname: checkDuplicateSurveyname
}

module.exports = verifySignUp;