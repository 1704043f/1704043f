// import React, { Component } from "react";
// import medicationAPI from "../../utils/medicationAPI";
// import userAPI from "../../utils/userAPI";
// import googleAPI from "../../utils/googleAPI";
// import gapi from "gapi-client";
// import nodeMailerAPI from "../../utils/nodemailerAPI";
// import { Link } from "react-router-dom";
// import { Redirect } from 'react-router'
// import reactMoment from "react-moment";
// import moment from "moment";
// import {GoogleAPI } from 'react-google-login';
// import {CLIENT_ID, CLIENT_SECRET } from "../../config/config.js";
// import { Alert, Button, Form, FormGroup, Label, Input, FormText, Col, Row, Container, Navbar} from 'reactstrap';

// gapi.load('client:auth2', initClient);

// function initClient() {
//   gapi.client.init({
//     discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
//     clientId: CLIENT_ID,
//     scope: 'https://www.googleapis.com/auth/calendar'
//   }).then(function (data) {
//     // do stuff with loaded APIs 
//     console.log(data);
//     // reference : https://www.npmjs.com/package/gapi-client
    
//     console.log('it worked');
//   });
// }

// //console.log(url);

// let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// //let SCOPES = "https://www.googleapis.com/auth/calendar";


// const reminder = {
//     'summary': 'Google I/O 2018',
//   'location': '800 Howard St., San Francisco, CA 94103',
//   'description': 'A chance to hear more about Google\'s developer products.',
//   'start': {
//     'dateTime': '2018-04-11T09:00:00-07:00',
//     'timeZone': 'America/Los_Angeles',
//   },
//   'end': {
//     'dateTime': '2015-04-11T17:00:00-08:00',
//     'timeZone': 'America/Los_Angeles',
//   },
//    'reminders': {
//     'useDefault': false,
//     'overrides': [
//       {'method': 'email', 'minutes': 24 * 60},
//       {'method': 'popup', 'minutes': 10},
//     ],
//   },
// };


// class SK extends Component {
//     constructor(props){
//         super(props);
        
//         this.props.alertIncident.push("test");
//          this.getBackAlertIncident = this.getBackAlertIncident.bind(this);
//     }
//   state = {
//     drugName : "",
//     drugType : "",
//     dosage : "",
//     role : "visitor",
//     username: "",
//     password: "",
//     loginUsername: "",
//     loginPassword: "",
//     redirect : false,
//     messageCenter : "",
//     messageStatus : "",
//     contactEmail: "",
//     contactName : "",
//     contactMessage : "",
//     id : "",
//     name : "",
//     email : "", 
//     gender : "",
//     alertIncident : this.props.alertIncident

//   };

//   getBackAlertIncident(alertIncident){
//     console.log("getting back alert incident");
//     this.setState({
//       alertIncident : alertIncident
//     })
//     console.log("Alert incident : " , this.state.alertIncident);
//   }

//   componentDidMount() {
//     //this.loadBooks();
//   };

//   handleNewDrug  = event => {
//       event.preventDefault();
//       if(this.state.drugName && this.state.drugType && this.state.dosage){
//         medicationAPI.newDrug({
//           name : this.state.drugName,
//           type : this.state.drugType,
//           dose : this.state.dosage
//       })
//         .then(res => {
//             console.log("success!");
//             console.log(res);
//         })
//          .catch(err =>{ 

//             console.log(err);}); 
//       }
//   };


//   handleCreatePatient = event => {
//       event.preventDefault();
//       if(this.state.password && this.state.username){
//         userAPI.createAccount({
//             username : this.state.username,
//             password : this.state.password,
//             email: "mel.kopffh@doctor.com",
//             role : "Admin"
//         })
//         .then(res => {
//             console.log(res);
//             this.setState({
//                 messageCenter : "Account created successfully!",
//                 messageStatus: "success"
//             })
//         })
//         .catch(err => {
//             console.log("fail");
//             console.log("setting redirect to true");
//             console.log(err)
//             this.setState({ 
//                 messageCenter : "Invalid input field, please change the field accordingly",
//                 messageStatus : "danger"
//             });  
//         });
//       }
//   }
//   handleLogout = event => {
//     userAPI.logout()
//     .then(res =>{
//         console.log(res);
//         this.setState({
//             messageCenter: "Logout successfully!",
//             messageStatus: "success",
//             role : "visitor"
//         });
//         localStorage.removeItem("username");
//         localStorage.removeItem("email")
//         localStorage.removeItem("role");
//     })
//   }
  
//   handleLogin = event => {
//       event.preventDefault();
//       if(this.state.loginPassword &&  this.state.loginUsername){
//           userAPI.login({
//               username : this.state.loginUsername,
//               password : this.state.loginPassword
//           })
//           .then(res => {
//               console.log(res);
//               this.setState({
//                   messageCenter: "Login successfully!",
//                   messageStatus: "success"
//               });  
//               localStorage.setItem("username", res.data.username);
//               localStorage.setItem("email", res.data.email);
//               localStorage.setItem("role", res.data.role);
//               this.setState({
//                   role : res.data.role,
//                   email: res.data.email,
//                   username : res.data.username
//               })
//           })
//           .catch(err => {
//               console.log("fail");
//               console.log("setting redirect to true");
//               console.log(err.response)
//               this.setState({
//                   messageCenter: "Invalid username or password",
//                   messageStatus: "danger"
//               });  
//             }
//             );
//       }
//   }

//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//     console.log(event.target.value);
//   };

//   handleEmail = event => {
//       event.preventDefault();
//       nodeMailerAPI.sendMail({
//           name : this.state.contactName,
//           email : this.state.contactEmail,
//           message : this.state.contactMessage
//       })
//       .then(res =>{
//           console.log(res);
//           console.log("mail man work real hard!");
//       })
//       .catch(err => {
//           console.log(err);
//       })
//   }

//   handleCreateEvent = event => {
//       event.preventDefault();
//         var request = gapi.calendar.events.insert({
//             'calendarId': 'primary',
//             'resource': reminder
//         });
//         console.log("here");
//         return request.execute(function(resp) {
//         console.log(resp);
//         }); 
//   }

//   handleoAuth2TokenGet = event => {
//       event.preventDefault();
//   // TODO: First try to get the token from sessionStorage here

//   // Build the oauth request url
//   const responseType = 'token';
//   const clientId = CLIENT_ID;
//   const redirectUri = "http://localhost:3000/";
//   const scope = 'https://www.googleapis.com/auth/calendar';
//   const prompt = 'consent';
//   const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&prompt=${prompt}`;

//   // Open a new window
//   const win = window.open(url, 'name', 'height=600,width=450');
//   if (win) win.focus();

//   const pollTimer = window.setInterval(() => {
//     try {
//       if (!!win && win.location.href.indexOf(redirectUri) !== -1) {
//         window.clearInterval(pollTimer);

//         // Get the URL hash with your token in it
//         const hash = win.location.hash;
//         win.close();

//         // Parse the string hash and convert to object of keys and values
//         const result = hash.substring(1)
//           .split('&')
//           .map(i => i.split('='))
//           .reduce((prev, curr) => ({
//             ...prev,
//             [curr[0]]: curr[1],
//           }), {});

//         // Calculate when the token expires and store in the result object
//         result.expires_at = Date.now() + parseInt(hash.expires_in, 10);

//         console.log(result);
//         localStorage.setItem("access_token", result.access_token);

//         if(localStorage.getItem("access_token")){
//             console.log("event : ", reminder);
//            // googleAPI.createEvent(localStorage.getItem("access_token"), reminder);
//         }
        
        

        

//         //  TODO: Persist result in sessionStorage here
//       }
//     } catch (err) {
//       // do something or nothing if window still not redirected after login
//     }
//   }, 100);
// }

//   render() {
//     let getBackAlertIncident = this.props.getBackAlertIncident;

//     return (
//       <Container>
//         {console.log(this.state.children)}
//         {this.state.messageCenter ? 
//             <Alert color={this.state.messageStatus} className='text-center'>{this.state.messageCenter} </Alert> 
//         : 
//             null 
//         }

//         <Container>
//             <label><h1>Socket IO </h1></label>
//             <Alert>{this.state.alertIncident.map( x => <label>{x}</label> )}</Alert>
//         </Container>

//         <Container>
//             <label><h1>Google Authentication:</h1></label>

//             <Button onClick={this.handleoAuth2TokenGet}>Authorize from Google</Button>
//             <Button onClick={this.handleCreateEvent}>Create Event</Button>
            
//         </Container>
//         <Container>
//         <label><h1>Node Mailer</h1></label>
//             <Form>
//                 <FormGroup>
//                     <Label>Contact Name</Label>
//                     <Input type="text" name="contactName" placeholder="Name" onChange={this.handleInputChange} value={this.state.contactName} />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label>Email Address: </Label>
//                         <Input type="text" name="contactEmail" placeholder="Email" onChange={this.handleInputChange} value={this.state.contactEmail} />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label>Message: </Label>
//                     <Input type="text" name="contactMessage" placeholder="Message.. " onChange={this.handleInputChange} value={this.state.contactMessage} />
//                 </FormGroup>
//                 <Button onClick={this.handleEmail}>Submit Message</Button>
//             </Form>
//         </Container>

//         <Container>
//             <Label><h1>Register:</h1></Label>
//                 <br />March-24-18
//                 <br /> 👨🏽‍💻 Notes from SK:<br />
//                 <label>Temporarily it is requesting only user name and password, there will be validation that needed to happen here. <br />
//                     I hardcoded email address and role temporarily before sending the data to POST route, cuz im lazy. 🙄 </label>

//             <Form>
//                 <FormGroup>
//                     <Label>UserName</Label>
//                     <Input type="text" name="username" placeholder="username" onChange={this.handleInputChange} value={this.state.username} />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label>Password</Label>
//                     <Input type="text" name="password" placeholder="password" onChange={this.handleInputChange} value={this.state.password} />
//                 </FormGroup>            
//                 <Button onClick={this.handleCreatePatient}>Create Account</Button>
//             </Form>
//         </Container>
//         <hr />
//         {this.state.role == "visitor" ? 
//             <Container>
//                     < Label ><h1> Login :</h1></Label>
//                     <br />March-24-18
//                     <br /> 👨🏽‍💻 Notes from SK:  <br />
//                     <label>
//                         This part is slightly tricky, I am still trying to figure out the best way to error handle invalid return from res. <br />
//                         If user login successfully, we change the role state to "patient/admin" accordingly,<br/>
//                         then login container will get replaced by a single logout button, but... <br />
//                         when there is an error.., open up element inspector, and you will see an UnAuthorized Error.. 😕 <br />
//                         but I manage to use setState to throw an Alert message
//                     </label>

//                 <Form>
//                     <FormGroup>
//                         <Label>UserName</Label>
//                         <Input type="text" name="loginUsername" placeholder="username" onChange={this.handleInputChange} value= {this.state.loginUsername} />
//                     </FormGroup>
//                     <FormGroup>
//                         <Label>Password</Label>
//                         <Input type="text" name="loginPassword" placeholder="password" onChange={this.handleInputChange} value={this.state.loginPassword} />
//                     </FormGroup>            
//                     <Button onClick={this.handleLogin}>Login</Button>
//                 </Form>
//             </Container>
//         :
//             <Container>
//                     <Button onClick={this.handleLogout}>Logout</Button>
//             </Container>
//         }
//             <hr />
//         Add new med: 
//         <Form>
//             <FormGroup>
//                 <Label >Drug name: </Label>
//                 <Input type="text" name="drugName" placeholder="drug name" onChange={this.handleInputChange} value={this.state.drugName}  />
//             </FormGroup>
//             <FormGroup>
//                 <Label> Drug Type: </Label>
//                 <Input type="text" name="drugType" placeholder="drug type" onChange={this.handleInputChange}  value={this.state.drugType} />
//             </FormGroup>
//             <FormGroup>
//                 <Label>Dosage: </Label>
//                 <Input type="text" name="dosage" placeholder="dosage" onChange={this.handleInputChange} value={this.state.dosage} />
//             </FormGroup>
//             <Button onClick={this.handleNewDrug}>Submit</Button>
//         </Form>

//       </Container>
//     );
//   }
// }

// export default SK;
