import axios from "axios";
export default {

    findAll: function() {
        return axios.get("/api/doctor");
    }, 
    findOne: function(id){
        return axios.get("/api/doctor/"+id);
    },
    create: function(doctorInfo){
        return axios.post("/api/doctor", doctorInfo);
    },
    remove: function(id){
        return axios.delete("/api/doctor/"+id);
    },
    update: function(id, doctorInfo){
        return axios.put("/api/doctor/"+id, doctorInfo);
    },
    findDoctorEmail: function(email){
        return axios.get('/api/doctor/validateEmail/'+email);
    }
};