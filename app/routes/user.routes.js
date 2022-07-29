const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/surveys/user/:id", controller.findOne);

  app.get("/api/surveys/checkadmin", controller.checkAdmin);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.delete(
    "/api/surveys/user/:id",controller.delete
  );
  
  app.put(
    "/api/surveys/user/:id",controller.update
  );

  app.get(
    "/api/surveys/users/all",controller.findAll
  );
  
  
};