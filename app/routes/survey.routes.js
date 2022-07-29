
const { authJwt } = require("../middleware");
const controller = require("../controllers/survey.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    
    next();
  });

  app.post("/api/surveys/createsurvey", controller.create);
  app.post("/api/surveys/insert/:id",controller.insertQuestions);
  app.get("/api/surveys/getsurveys",controller.findAll);
  app.get("/api/surveys/:id",controller.findOne);
  app.put("/api/surveys/:id",controller.update);
  app.get("/api/surveys/questions/:id",controller.findAllQuestions);
  app.delete("/api/surveys/:id",controller.delete);
  app.delete("/api/surveys/questions/:id",controller.deleteQuestions);
  
};