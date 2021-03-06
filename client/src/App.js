import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Privacy from "./pages/PrivacyPolicy";
import Appointment from "./pages/Appointment";
import Patient from "./pages/Patient";
import Admin from "./pages/Admin";
import Discover from "./pages/Discover";
import NoMatch from "./pages/NoMatch";
import Admin_Report from "./pages/Admin_Report";
import Admin_Episode from "./pages/Admin_Episode";
import userAPI from "./utils/userAPI";
import mailerAPI from "./utils/nodemailerAPI";
import openSocket from 'socket.io-client';
import moment from 'moment';

import Alert from 'react-s-alert';
// mandatory
import 'react-s-alert/dist/s-alert-default.css';
 
// optional - you can choose the effect you want
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import "./App.css";


const socket = openSocket();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      role: "",
      email: "",
      messageCenter: "",
      messageStatus: "",
      alertIncident : [],
    }
    this.getBackMessage = this.getBackMessage.bind(this);
    this.getBackMessageStatus = this.getBackMessageStatus.bind(this);
    this.getBackAlertIncident = this.getBackAlertIncident.bind(this);
    
    socket.on("alertAdmin", message =>{
        const newAlertIncident = this.state.alertIncident;
        newAlertIncident.push(message);
        this.setState({
            alertIncident : newAlertIncident
        })
    })
    }
  getBackMessage(messageCenter){
    this.setState({
      messageCenter : messageCenter
    })
    
  }

  getBackMessageStatus(messageStatus){
    this.setState({
      messageStatus : messageStatus
    })
  }

  getBackAlertIncident(alertIncident){
    this.setState({
      alertIncident : alertIncident
    })
  }
  removeMessage = () =>{
    this.setState({
      messageCenter : null,
      messageStatus : null      
    })
  }

  PrivatePatientRoute = ({ component: Component, ...rest }) => (
    <Route { ...rest} render={(props) => (
      localStorage.getItem("role")!== null && localStorage.getItem("role").toLowerCase() === "patient"
        ? (
          localStorage.removeItem("messageCenter"),
          localStorage.removeItem("messageStatus"),
          <Component {...props} test='hi there' getBackAlertIncident = {this.getBackAlertIncident} handleIncident = {this.handleIncident} getBackMessage={this.getBackMessage} getBackMessageStatus={this.getBackMessageStatus}/>
        )
        : (
          localStorage.setItem("messageCenter", "You do not have the proper credential to access that page."),
          localStorage.setItem("messageStatus", "danger"),
          this.setState({
            messageCenter: "You do not have the proper credential to access that page.",
            messageStatus: "danger"
          }),
          <Redirect to={{
            pathname: '/notfound'
          }} />
        )
    )} />
  )
  PrivateAdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem("role")!== null && (localStorage.getItem("role").toLowerCase() === "doctor" || localStorage.getItem("role").toLowerCase() === "admin")
        ? <Component {...props} alertIncident={this.state.alertIncident} getBackMessage={this.getBackMessage} getBackMessageStatus={this.getBackMessageStatus} />
        : (
          localStorage.setItem("messageCenter", "You do not have the proper credential to access that page."),
          localStorage.setItem("messageStatus", "danger"),
          this.setState({
            messageCenter: "You stumble upon a page where you do not have access to...",
            messageStatus: "danger"
          }),
          <Redirect to={{
            pathname: '/notfound'
          }} />
        )
    )} />
  )
  
  componentDidMount(){
    userAPI.isLoggedIn().then( res => {
      console.log("res user!");
      console.log(res);
      console.log(res.data);
      if(res.user){
        localStorage.setItem("username", res.user.username);
        localStorage.setItem("role", res.user.role);
        localStorage.setItem("email", res.user.email);
        this.setState({
          username: res.user.username, 
          role: res.user.role,
          email: res.user.email});
      }
    })
    .catch(err => {
      console.log(err.response);
      localStorage.clear()
      this.setState({
        username: "",
        role: "",
        email : "",
        messageCenter : "",
        messageStatus : "",
      })
    })
  }
  
  handleIncident =  (emergencies, patientNumber) => {
      //get rid of the dangling comma
      emergencies = emergencies.slice(0,-1);
      socket.emit('alertAdmin', {'name' : localStorage.getItem("firstName") +  " " + localStorage.getItem("lastName"),
                                  'hospitalNum' : patientNumber,
                                  'emergencies' : emergencies,
                                  'date' : moment().format("dddd, MMMM Do YYYY hh:mm A")
                                });
      //send email to doctor
      userAPI.isLoggedIn().then( res => {
      console.log("res in isloggedin");
      console.log(res.data.email);
      if(res.data.email){
        console.log("is logged in : ");
        console.log(res.data.email);
        mailerAPI.sendToDoctor({
                    name : this.state.username,
                    subject : `MedMonitor : Urgent incident from  ${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`,
                    email : this.state.newAccountEmail,
                    message : `
                              Your patient ${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")} has reported risky emergencies ${emergencies}! 
                              Please log on to the application to review the patient information and schedule the earliest possible appointment for him.
                              From
                              Team MedMonitor`
                })
                .then(res =>{
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
      }
    }).catch(err => {
        console.log(err.response);
        console.log(err.response.data);
        Alert.error("You do not have proper credential to perform this action.", {
            position: 'top',
            effect: 'stackslide'
        });
    });
      
  }

  render(){
  return(
  <Router>

      <div> 
      <div className='backgroundContain'  />
  
      <Header username = {this.state.username} role={this.state.role} />
        <Alert className="text-center" timeout={5000}/>
       
      <div className="wrapper" >
      <Switch>
        <Route exact path="/" render={props => <Home getBackMessage={this.getBackMessage} getBackMessageStatus={this.getBackMessageStatus}> </Home>} />
        <Route exact path="/home" render={props => <Home getBackMessage={this.getBackMessage} getBackMessageStatus={this.getBackMessageStatus}> </Home>} />
        <this.PrivatePatientRoute exact path="/patient" component={Patient} />
        <this.PrivateAdminRoute exact path="/admin" component={Admin} />
        <this.PrivateAdminRoute exact path="/admin/report" component={Admin_Report} />
        <this.PrivateAdminRoute exact path="/admin/episode" component={Admin_Episode} />
        <this.PrivatePatientRoute exact path="/appointment" component={Appointment} />
        <Route exact path="/discover" component={Discover} />
        <Route exact path="/privacy_policy" component={Privacy} />
        <Route exact path="/notfound" component={NoMatch} />
        <Route component={NoMatch} />
      </Switch>
      <div style={{height : '155px'}}></div>
      </div>
      <Footer />    
    </div>
    
  </Router>
  )
  }
}

export default App;