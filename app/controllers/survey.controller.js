const db = require("../models");
const config = require("../config/auth.config");
const Op = db.Sequelize.Op;
const Survey = db.survey;
const SurveyQuestions = db.surveyquestions;
const AssignedSurveys = db.sequelize.models.assignedsurveys;
const UserResponses = db.sequelize.models.userresponses;
const SurveyAnswers = db.surveyanswers;
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
    var types = JSON.parse(req.body.types);
   // var questions = req.body.questions; postman
    
    var finaldata = [];
    var count = 0;
    for(var i=0;i<questions.length;i++)
    {
    // Create a Survey
    var surveyquestion = {
      question: questions[i],
      type:types[i],
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

  // Insert questions into survey.
exports.insertResponses = (req, res) => {
    
  var answerresponse = req.body.answerresponse;
  var userid = req.body.userid;
 // var questions = req.body.questions; postman
  
  var finaldata = [];
  var count = 0;
  for(var i=0;i<answerresponse.length;i++)
  {
  // Create a Survey
  var userresponse = {
    answerId: answerresponse[i].id,
    userId: userid
  };
  
  
  // Save Survey in the database
  UserResponses.create(userresponse)
    .then(data => {
      count += 1;
      res.statusCode = 200;
      finaldata.push(data.dataValues);
      
      if(count == answerresponse.length)
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
            err.message || "Some error occurred while inserting the responses."
        });
  }
  

};

  // Insert questions into survey.
exports.insertAnswers = (req, res) => {
    
  var answers = JSON.parse(req.body.answers);
  var questionids = JSON.parse(req.body.questionids);
 // var questions = req.body.questions; postman
  
  var finaldata = [];
  var count = 0;
  for(var i=0;i<answers.length;i++)
  {
  // Create a Survey
  var surveyanswer = {
    answer: answers[i],
    surveyquestionId: questionids[i]
  };
  
  
  // Save Survey in the database
  SurveyAnswers.create(surveyanswer)
    .then(data => {
      count += 1;
      res.statusCode = 200;
      finaldata.push(data.dataValues);
      
      if(count == answers.length)
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
            err.message || "Some error occurred while inserting the answers."
        });
  }
  

};


  // Assign a new Survey
exports.assignSurvey = (req, res) => {

  console.log(req.body);
  const surveyinfo = {
    userId: req.body.userid,
    surveyId: req.body.surveyid
  };
  
  // Save Surveyinfo in the database
  AssignedSurveys.create(surveyinfo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while assigning the survey."
      });
    });

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

  exports.findAnswers = (req, res) => {
    const questionid = req.params.questionid;
    const userid = req.params.userid;
    SurveyAnswers.findAll({
      where : { surveyquestionId : questionid}
    })
      .then(data => {
        UserResponses.findAll({
          where:{userId:userid}
        })
        .then(data => {
          if(data){
            res.send(data);
          } else {
            res.status(404).send({
              message: `There are no answers assigned for the question by the user`
            });
          }
        })
       
      })
      .catch(err => {
        res.status(500).send({
          message: "Internal server error"
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

  exports.findAssigned = (req, res) => {
    const userid = req.params.userid;
    AssignedSurveys.findAll({
      where : { userId : userid}
    })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `There are no surveys assigned for the user`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Internal server error"
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
    Survey.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Survey was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Survey with id=${id}. Maybe Survey was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Survey with id=" + id
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

  // Delete a Survey with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Survey.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Survey was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Survey with id=${id}. Maybe Survey was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Survey with id=" + id
        });
      });
  };

  // Delete a Survey with the specified id in the request
  exports.deleteQuestions = (req, res) => {
    const id = req.params.id;
    SurveyQuestions.destroy({
      where: { surveyId: id }
    })
    .then(nums => {
        res.send({ message: `${nums} Survey questions were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all questions."
        });
      });
  };