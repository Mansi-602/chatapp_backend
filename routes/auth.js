const router = require("express").Router();

// const { routes } = require("../app");
const authController = require("../controllers/auth");



router.post("/register", authController.register, authController.sendOTP);
router.post("/login" , authController.login);

router.post("/send-otp", authController.sendOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;