module.exports = (sequelize, Sequelize) => {
    const SurveyQuestions = sequelize.define("surveyquestions", {
      
      question: {
        type: Sequelize.STRING
      }
    });
  
    return SurveyQuestions;
  };