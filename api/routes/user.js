const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const middleware = require("../middleware/middleware");

router.get("/", userController.users_get_all);
router.post(
  "/signup",
  middleware.checkExistingEmail,
  userController.user_sign_up
);

module.exports = router;
