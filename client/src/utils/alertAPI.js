import axios from "axios";
export default {

    findAll: function() {
        return axios.get("/api/alert");
    }, 
    create: function(alert){
        return axios.post("/api/alert", alert);
    }
};