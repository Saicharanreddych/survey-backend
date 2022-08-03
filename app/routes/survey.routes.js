const { verifySignUp } = require("../middleware");
const controller = require("../controllers/survey.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    
    next();
  });

  app.post("/api/surveys/createsurvey",[verifySignUp.checkDuplicateSurveyname], controller.create);
  app.post("/api/surveys/insert/:id",controller.insertQuestions);
  app.post("/api/surveys/insertanswers",controller.insertAnswers);
  app.post("/api/surveys/insertresponse",controller.insertResponses);
  app.post("/api/surveys/assign",controller.assignSurvey);
  app.get("/api/surveys/getsurveys",controller.findAll);
  app.get("/api/surveys/:id",controller.findOne);
  app.get("/api/surveys/assign/:userid",controller.findAssigned);
  app.get("/api/surveys/answer/:questionid/:userid",controller.findAnswers);
  app.get("/api/surveys/singleanswer/:questionid",controller.findAnswer);
  app.get("/api/surveys/getuserresponse/:id",controller.findUserResponse);
  app.put("/api/surveys/:id",controller.update);
  app.get("/api/surveys/questions/:id",controller.findAllQuestions);
  app.delete("/api/surveys/:id",controller.delete);
  app.delete("/api/surveys/questions/:id",controller.deleteQuestions);
  app.delete("/api/surveys/assignedsurveys/:id",controller.deleteAssignedSurveys);
  app.delete("/api/surveys/deleteanswers/:id",controller.deleteAnswers);
  app.delete("/api/surveys/deleteanswer/:answerid",controller.deleteAnswer);
  app.delete("/api/surveys/deleteuserresponse/:id",controller.deleteUserResponse);
  
};