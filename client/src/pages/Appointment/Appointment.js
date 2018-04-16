import React, { Component } from "react";
import './Appointment.css';
// import Header from "../../components/Header";
import UpcomingApp from "../../components/UpcomingApp";
import PhysInfo from "../../components/PhysInfo";
import patientAPI from "../../utils/patientAPI";
import moment from 'moment';
import {CLIENT_ID} from "../../config/config.js";
import googleAPI from "../../utils/googleAPI";

import {
    Container,
    Row,
    Col,
} from 'reactstrap';

class Appointment extends Component {
    state = {
        appointment : {},
        physician : {}
    };
    componentDidMount() {
        patientAPI.findPatientInfoForPatient(localStorage.getItem("userId"))
        .then((res)=>{
            this.setState({
                appointment : res.data.appointment,
                physician : res.data.physician,
                address : "2447 Imagine Ln",
                city : "Cleveland, OH 44113",
                officePhone : "216-115-55088",
                
            }, function(){
                
                if(this.state.physician){
                    this.setState({
                        physicianFirstName : res.data.physician.name.first,
                        physicianLastName : res.data.physician.name.last,
                        dateTime : moment(this.state.appointment.next_appt, "YYYY-MM-DDTHH:mm:ssZ").format()
                    }, function() {
                    })
                }                
                
            })
        })
        .catch((err) =>{console.log("err", err)})

    }

/*     handleCreateEvent = event => {
      event.preventDefault();
        gapi.client.load('calendar', 'v3', function(){
          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': reminder
          });
          console.log("here");
          return request.execute(function (resp) {
            console.log(resp);
          }); 
        });
  } */

   handleoAuth2TokenGet = event => {
       event.preventDefault();
   // TODO: First try to get the token from sessionStorage here
   // Build the oauth request url
   const responseType = 'token';
   const clientId = CLIENT_ID;
   const redirectUri = "https://med-monitor.herokuapp.com";
   const scope = 'https://www.googleapis.com/auth/calendar';
   const prompt = 'consent';
   const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&prompt=${prompt}`;
   // Open a new window
   const reminder = {
'summary': `Doctor Appointment with ${this.state.physicianFirstName}, ${this.state.physicianLastName}`,
'location': `${this.state.address} ${this.state.city}`,
'description': `Doctor appointment`,
'start': {
'dateTime': `${this.state.dateTime}` ,
'timeZone': 'America/New_York'
},
'end': {
'dateTime': `${moment(this.state.dateTime, "YYYY-MM-DDTHH:mm:ssZ").add(1, "hour").format()}` ,
'timeZone': 'America/New_York'
},
'reminders': {
'useDefault': false,
'overrides': [
    { 'method': 'email', 'minutes': 24 * 60 },
    { 'method': 'popup', 'minutes': 10 }
]
}
};

   const win = window.open(url, 'name', 'height=600,width=450');
   if (win) win.focus();
   const pollTimer = window.setInterval(() => {
     try {
       if (!!win && win.location.href.indexOf(redirectUri) !== -1) {
         window.clearInterval(pollTimer);
         // Get the URL hash with your token in it
         const hash = win.location.hash;
         win.close();
         // Parse the string hash and convert to object of keys and values
         const result = hash.substring(1)
           .split('&')
           .map(i => i.split('='))
           .reduce((prev, curr) => ({
             ...prev,
             [curr[0]]: curr[1],
           }), {});
         // Calculate when the token expires and store in the result object
         result.expires_at = Date.now() + parseInt(hash.expires_in, 10);
         localStorage.setItem("access_token", result.access_token);
         if(localStorage.getItem("access_token")){
             googleAPI.createEvent(localStorage.getItem("access_token"), reminder);
         }
      
      
      
         //  TODO: Persist result in sessionStorage here
       }
     } catch (err) {
         console.log(err);
       // do something or nothing if window still not redirected after login
     }
   }, 100);
 }
    render() {
        return (
            <Container fluid>
                {/* <Header /> */}
                <Container>
                    <Row>
                        <Col size='md-6'>
                            <UpcomingApp 
                                date={moment(this.state.appointment.next_appt).format("dddd, MMMM Do YYYY")} 
                                time={moment(this.state.appointment.next_appt).format("h:mm a")} 
                                comments = {this.state.appointment.comments}
                                doctorFirstName= {this.state.physicianFirstName}
                                doctorLastName = {this.state.physicianLastName}
                                address = "2447 Imagine Ln"
                                city = "Cleveland, OH 44113"
                                officePhone = "216-115-55088"
                                remindHandler = {this.handleoAuth2TokenGet}
                            />
                        </Col>
                        <Col size='md-6'>
                            <PhysInfo 
                                doctorFirstName= {this.state.physicianFirstName}
                                doctorLastName = {this.state.physicianLastName}
                                office = {this.state.physician.office}
                                phone = {this.state.physician.phone}
                                email = {this.state.physician.email}
                                officeDay = "Monday - Saturday"
                                officeHour = "Weekday 8:00am - 6:00pm, Sat 9:00am-2:00pm"
                            />
                        </Col>
                    </Row>
                </Container>
            </Container>
        )
    }
}

export default Appointment;
