var express = require('express');
var router = express.Router();
const usercontroller = require("../controllers/user.controller");
const { verifySignUp } = require("../middleware");
const authcontroller = require("../controllers/auth.controller");

router.get("/api/surveys/user/:id", usercontroller.findOne);

router.get("/api/surveys/checkadmin", usercontroller.checkAdmin);

  

router.delete(
    "/api/surveys/user/:id",usercontroller.delete
  );
  
  router.put(
    "/api/surveys/user/:id",usercontroller.update
  );

  router.get(
    "/api/surveys/users/all",usercontroller.findAll
  );

  router.post(
    "/api/surveys/user",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authcontroller.signup
  );

  router.post("/api/surveys/userlogin", authcontroller.signin);

  module.exports = router;