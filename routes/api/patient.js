const router = require("express").Router();
const patientController = require("../../controllers/patientController");

// Matches with "/api/patient/all" A
router.route("/all")
  .get(patientController.findAll)

// Matches with "/api/patient/contact/:id" A
router
    .route('/contact/:id')
    .put(patientController.updateContact)

// Matches with "/api/patient/new" A
router
    .route('/new')
    .post(patientController.create)

// Matches with "/api/patient/inactivate/:id" A
router
    .route('/inactivate/:id')
    .put(patientController.updateInactivate)

// Matches with "/api/patient/appointment/:id" A
router
    .route('/appointment/:id')
    .put(patientController.updateAppointment)

// Matches with "/api/patient/forDoctor/:id"
router
    .route("/forAdmin/:id")
    .get(patientController.findByIdForAdmin) //A

// Matches with "/api/patient/forPatient/:id" A
router 
    .route('/forPatient/:id')
    .get(patientController.findByIdForPatient);

// Matches with "/api/patient/forDoctor/episode/:id" 
    router 
    .route('/forDoctor/episode/:id')
    .put(patientController.updateEpisode); //A

// Matches with "/api/patient/forPatient/episode/:id" 
    router
    .route('/forPatient/episode/:id')
    .get(patientController.patientMeds) //A
    .put(patientController.addRecord); //A

// Matches with "/api/patient/validateEmail
    router
    .route('/validateEmail/:email')
    .get(patientController.validateEmail);

// Matches with "/api/patient/updateDr"
    router
    .route('/updateDr/:id')
    .put(patientController.updatePatientsDr);
module.exports = router;
