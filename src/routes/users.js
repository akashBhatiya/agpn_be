const express = require("express");
const userController = require("../controllers/users");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/sendsecuritycode", userController.sendSecurityCode)

// router.post("/signup", userController.postSignUp);
// router.post("/login", userController.postLogin);
// router.get("/getAll", auth, userController.getAllUsers);
// router.post("/getAllNew", auth, userController.getAllUsersNew);
// router.post("/getAllDownload", auth, userController.getAllUsersDownload);
// router.get("/:id", userController.getUserById);
// router.get("/email/:email", userController.getUserByEmail);
// router.put("/posAndPerm", userController.updateUsersPositionAndPermission);
// router.put("/:id", authHandleUpdateUsers, userController.updateUser);
// router.put("/emailFrequency/:id", userController.updateUseremailFrequency);
// router.delete("/:id", authHandleUser, userController.deleteUser);
// router.post("/inviteUser", authHandleUser, userController.inviteUser);
// router.post("/forgotPassword", userController.postForgetPassword);
// router.post("/forgotPasswordEmail", userController.postForgetPasswordEmail);
// router.post("/sendSecurityCode", userController.postSendSecurityCode);
// router.post("/resendSecurityCode", userController.postResendSecurityCode);
// router.post(
//   "/changeAdmin/:id",
//   authHandleUser,
//   userController.postChangeIsAdmin
// );
// router.post(
//   "/verificationLink",
//   authHandleMailRequest,
//   userController.sendVerificationLink
// );
// router.get("/getClinicians/:id", auth, userController.getClinicians);
// router.post("/verifyLink/", userController.verifyForgotPasswordToken);

// // mail update
// router.post("/verifyMailUpdateLink/", userController.updateUserMailVerify);
// router.post("/mailUpdate/", userController.updateUserMail);
// router.post(
//   "/sendMailVerificationLink",
//   authHandleMailRequest,
//   userController.sendMailVerificationLink
// );
module.exports = router;
