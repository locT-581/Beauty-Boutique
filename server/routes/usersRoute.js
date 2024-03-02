import express from "express";

import * as usersController from "../controllers/userController.js";
import isAuthenticated from "../middlewares/auth.js";
const router = express.Router();

router.post("/signup", usersController.signupUser);
router.post("/signin", usersController.loginUser);
router.get("/logout", usersController.logoutUser);

router
  .route("/me")
  .get(isAuthenticated, usersController.getAccountDetails)
  .delete(isAuthenticated, usersController.deleteProfile);

router
  .get("/location", usersController.getLocations)
  .post("/location", usersController.updateLocation);

// // put request -> update something
// router.put("/update/password", isAuthenticated, usersController.updatePassword);
// router.put("/update/profile", isAuthenticated, usersController.updateProfile);

// router.route("/password/forgot").post(usersController.forgotPassword);
// router.route("/password/reset/:token").put(usersController.resetPassword);

export default router;
