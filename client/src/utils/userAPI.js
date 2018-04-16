import axios from "axios";
export default {
    createAccount: function(objUser) {
        return axios.post("/api/user/register", objUser);
    },
    login : function(objUser){
        return axios.post("/api/user/login", objUser)
    },
    logout : function(){
        return axios.get("/api/user/logout");
    },
    isLoggedIn: function(){
        return axios.get("/api/user/isLoggedIn");
    },
    validateEmail: function(objUser){
        return axios.get("/api/user/validateEmail");
    },
    getUserByEmail  : function(email){
        return axios.get("/api/user/existingUser/" +email);
    },
    findUserByUsername : function(username){
        return axios.get("/api/user/existingUsername/" +username);
    }
}