const router = require("express").Router();
const medicationController = require("../../controllers/medicationController");

// Matches with "/api/medication"
router.route("/")
  .get(medicationController.findAll)
  .post(medicationController.create);

// Matches with "/api/medication/dose/:id"
router
  .route("/dose/:id")
  .put(medicationController.updateDose)
  .delete(medicationController.removeDose);

// Matches with "/api/medication/:id"
router
    .route("/:id")
    .delete(medicationController.removeDrug);

router
    .route("/:name")
    .get(medicationController.findOne);

module.exports = router;
