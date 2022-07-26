const db = require("../models");
const config = require("../config/auth.config");
const Op = db.Sequelize.Op;
const Survey = db.survey;
const SurveyQuestions = db.surveyquestions;
// Create and Save a new Survey
exports.create = (req, res) => {
    // Validate request
    if (!req.body.surveyname) {
      res.status(400).send({
        message: "Survey name can not be empty!"
      });
      return;
    }
    // Create a Survey
    const survey = {
      surveyname: req.body.surveyname,
    };
    
    // Save Survey in the database
    Survey.create(survey)
      .then(data => {
        
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Survey."
        });
      });

  };

  // Insert questions into survey.
exports.insertQuestions = (req, res) => {
    
    const id = req.params.id;
    
    var questions = JSON.parse(req.body.questions);
   // var questions = req.body.questions; postman
    
    var finaldata = [];
    var count = 0;
    for(var i=0;i<questions.length;i++)
    {
    // Create a Survey
    var surveyquestion = {
      question: questions[i],
      surveyId: id
    };
    
    
    // Save Survey in the database
    SurveyQuestions.create(surveyquestion)
      .then(data => {
        count += 1;
        res.statusCode = 200;
        finaldata.push(data.dataValues);
        
        if(count == questions.length)
        {
            res.end(JSON.stringify(finaldata));
        }
      })
      .catch(err => {
        res.statusCode = 500;
      });
    }
    
    if(res.statusCode == 500)
    {
        res.send({
            message:
              err.message || "Some error occurred while inserting the questions."
          });
    }
  };
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

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Survey.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find survey with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving survey with id=" + id
        });
      });
  };

  
  exports.findAllQuestions = (req, res) => {
    const surveyid = req.params.id;
    
    SurveyQuestions.findAll({ where: {surveyId: surveyid} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving survey questions."
        });
      });
  };

  
