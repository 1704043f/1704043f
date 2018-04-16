const router = require("express").Router();
const doctorRoutes = require("./doctor");
const patientRoutes = require("./patient");
const userRoutes = require("./user");
const mailerRoutes = require("./mailer");
const medicationRoutes = require("./medication");
const alertRoutes = require("./alert");
const videoRoutes = require("./video");

//  routes
router.use("/doctor", doctorRoutes);
router.use("/patient", patientRoutes);
router.use("/medication", medicationRoutes);
router.use("/user", userRoutes);
router.use("/mailer", mailerRoutes);
router.use("/alert", alertRoutes);
router.use("/video", videoRoutes)
module.exports = router;
