import axios from "axios";

export default {
    createEvent: function(token,objEvent) {
        return axios.post("https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token=" + token, objEvent)
    }
}