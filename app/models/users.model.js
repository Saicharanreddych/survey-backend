module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      email: {
        type: Sequelize.STRING
      },
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
     
    });
    return User;
  };