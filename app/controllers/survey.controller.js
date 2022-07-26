const db = require("../models");
const config = require("../config/auth.config");
const Op = db.Sequelize.Op;
const Survey = db.survey;


  exports.findAll = (req, res) => {
    const surveyname = req.query.name;
    var condition = surveyname ? { surveyname: { [Op.like]: `%${surveyname}%` } } : null;
    Survey.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving surveys."
        });
      });
  };

