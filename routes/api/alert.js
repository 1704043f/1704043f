const router = require("express").Router();
const alertController = require("../../controllers/alertController");

// Matches with "/api/alert"
router.route("/")
  .get(alertController.findAll)
  .post(alertController.create);

module.exports = router;
