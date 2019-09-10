const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const middleware = require("../middleware/middleware");

router.get("/", userController.users_get_all);
router.post(
  "/signup",
  middleware.checkEmptyUserCredentials,
  middleware.checkExistingEmail,
  userController.user_sign_up
);

router.post("/login", userController.user_login);

module.exports = router;
