module.exports = (sequelize, Sequelize) => {
  const Survey = sequelize.define("survey", {
    surveyname: {
      type: Sequelize.STRING
    }
  });
  const SurveyQuestions = require("../models/surveyquestions.model.js")(sequelize, Sequelize);
  const SurveyAnswers = require("../models/surveyanswers.model.js")(sequelize, Sequelize);
  SurveyQuestions.belongsTo(Survey);
  SurveyAnswers.belongsTo(SurveyQuestions)
  return {Survey,SurveyQuestions,SurveyAnswers};
};