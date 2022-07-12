module.exports = (sequelize, Sequelize) => {
    const Survey = sequelize.define("survey", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      surveyname: {
        type: Sequelize.STRING
      }
    });
  
    return Survey;
  };
  