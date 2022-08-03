module.exports = (sequelize, Sequelize) => {
    const SurveyAnswers = sequelize.define("surveyanswers", {
      
      answer: {
        type: Sequelize.STRING
      }
    });
  
    return SurveyAnswers;
  };