import axios from "axios";
export default {

    findAll: function () {
        return axios.get("/api/video");
    },

    findOne: function (id) {
        return axios.get("/api/video", id);
    },

    create: function (alert) {
        return axios.post("/api/video", alert);
    }
};