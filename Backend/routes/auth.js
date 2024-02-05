import express from "express";
const router = express.Router();
import { allUsers, forgotPassword, getUserDetails, getUserProfile, loginUser, logout, registerUser, resetPassword, updatePassword, updateProfile} from "../controller/authController.js";
import { authorizeRoles, isAuthenticate } from "../middlewares/auth.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout)


 router.route("/password/forgot").post(forgotPassword)
 router.route("/password/reset/:token").put(resetPassword)


 router.route("/me").get(isAuthenticate,getUserProfile);
 router.route("/me/update").put(isAuthenticate,updateProfile)
 router.route("/password/update").put(isAuthenticate,updatePassword);

 router.route("/admin/users").get(isAuthenticate,authorizeRoles("admin"),allUsers);

 router
 .route("/admin/update/:id")
 .get(isAuthenticate,authorizeRoles("admin"),getUserDetails);
 //router
// .route("/admin/update/:id").get(isAuthenticate,authorizeRoles("admin"),updateUser);
 //router
 //.route("/admin/update/:id")
 //.get(isAuthenticate,authorizeRoles("admin"),deleteUser);







export default router;