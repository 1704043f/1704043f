import axios from "axios";
export default {
    findAll: function() {
        return axios.get("/api/patient/all");
    },
    updateContact: function(id, objContact){
        return axios.put("/api/patient/contact/"+id, objContact);
    },
    createNewPatient: function(objPatient){
        return axios.post("/api/patient/new", objPatient);
    },
    inactivatePatient: function(id){
        return axios.put("/api/patient/inactivate/"+id);
    },
    updateAppointment : function(id, objAppointment){
        return axios.put("/api/patient/appointment/"+id, objAppointment);
    },
    findPatientInfoForAdmin :function(id){
        return axios.get("/api/patient/forAdmin/"+id);
    },
    findPatientInfoForPatient: function(id){
        return axios.get("/api/patient/forPatient/"+id);
    },
    createNewEpisode: function(id, objEpisode){
        return axios.put("/api/patient/forDoctor/episode/" +id, objEpisode);
    },
    findPatientMeds: function(id){
        return axios.get("/api/patient/forPatient/episode/"+id);
    },
    createNewRecord: function(id, objRecord){
        return axios.put("/api/patient/forPatient/episode/"+id, objRecord);
    },
    findPatientEmail: function(email){
        return axios.get('/api/patient/validateEmail/'+email);
    },
    updatePatientsDr: function(id, objPhysician){
        return axios.put('/api/patient/updateDr/'+id, objPhysician);
    }
};