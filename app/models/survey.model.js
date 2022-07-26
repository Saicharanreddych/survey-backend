module.exports = (sequelize, Sequelize) => {
    const Survey = sequelize.define("survey", {
     
      surveyname: {
        type: Sequelize.STRING
      }
    });
  
    return Survey;
  };
  