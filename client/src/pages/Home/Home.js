import React, { Component } from "react";
import {withRouter} from "react-router-dom";

// import background from "./med_b.ground.jpg";

import SignInForm from "../../components/SignInForm";
import Registration from "../../components/Registration";
import { 
    Container, 
    TabContent,
    TabPane, 
    Nav, 
    NavItem, 
    NavLink, 
    Row, 
    Col
} from 'reactstrap';

import userAPI from '../../utils/userAPI';
import patientAPI from '../../utils/patientAPI';
import doctorAPI from '../../utils/doctorAPI';

import classnames from 'classnames';

import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {    
            password : "",
            messageCenter : null,
            messageStatus : "",
            username : this.props.username,
            role : this.props.role,
            email : this.props.email,
            patientID : "",
            newAccountEmail : "",
            activeTab: '1'
        }
        this.toggle = this.toggle.bind(this);
        
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    getBackEmail(newAccountEmail, patientID){
        this.setState({
        newAccountEmail : newAccountEmail,
        patientID : patientID
        })
    }
    validateLogin(username, password){
        let valid = true;
        if(!username || !password){
            valid = false;
            this.props.getBackMessage("Username or password cannot be empty!");
            this.props.getBackMessageStatus("danger");
        }else if(password.length < 6){
            valid = false;
            this.props.getBackMessage("Password length needs to be greater than 5 characters");
            this.props.getBackMessageStatus("danger");
        }
        return valid
    }
    
    handleLogin = event => {
        if(this.validateLogin(this.state.username, this.state.password)){
            if (this.state.password && this.state.username) {
            userAPI.login({
                username: this.state.username,
                password: this.state.password
            })
            .then(res => {
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("email", res.data.email);
                localStorage.setItem("role", res.data.role);
                if(res.data.patient_id && res.data.role.toLowerCase() === 'patient'){
                    localStorage.setItem("userId", res.data.patient_id);
                }else if(res.data.doctor_id && (res.data.role.toLowerCase() === 'admin' || res.data.role.toLowerCase() === 'doctor')){
                    localStorage.setItem("userId", res.data.doctor_id);
                }
                this.setState({
                    id : localStorage.getItem("userId"),
                    role: res.data.role,
                    email: res.data.email,
                    username: res.data.username,
                }, function(){
                    if(this.state.role.toLowerCase()==="patient"){
                        patientAPI.findPatientInfoForPatient(this.state.id)
                        .then(res => {
                            localStorage.setItem("firstName", res.data.details.first_name);
                            localStorage.setItem("lastName", res.data.details.last_name);
                            localStorage.setItem("patient_number", res.data.details.patient_number);
                            localStorage.setItem("patient_phone", res.data.details.phone);
                            this.props.getBackMessage(this.state.messageCenter);
                            this.props.getBackMessageStatus(this.state.messageStatus);
                            if(localStorage.getItem("role").toLowerCase()==="patient"){
                                this.props.history.push('/patient');      
                            } else if (localStorage.getItem("role").toLowerCase() === "admin" || localStorage.getItem("role").toLowerCase() === "doctor") {
                                this.props.history.push('/admin');   
                            }
                        })
                        .catch(err => console.log(err));

                    }else if(this.state.role.toLowerCase()==="admin" || this.state.role.toLower() ==="doctor"){
                        doctorAPI.findOne(this.state.id)
                        .then(res => {
                            localStorage.setItem("firstName", res.data.name.first);
                            localStorage.setItem("lastName", res.data.name.last);
                            localStorage.setItem("office", res.data.office);
                            localStorage.setItem("phone", res.data.phone);
                            this.props.getBackMessage(this.state.messageCenter);
                            this.props.getBackMessageStatus(this.state.messageStatus);
                            if(localStorage.getItem("role").toLowerCase()==="patient"){
                                this.props.history.push('/patient');      
                            } else if (localStorage.getItem("role").toLowerCase() === "admin" || localStorage.getItem("role").toLowerCase() === "doctor") {
                                this.props.history.push('/admin');   
                            }
                        })
                        .catch(err => console.log(err));
                    }
                })
            })
            .catch(err => {
                this.setState({
                    messageCenter: "Invalid username or password",
                    messageStatus: "danger"
                });
                localStorage.setItem("messageCenter", "Invalid username or password");
                localStorage.setItem("messageStatus", "danger");
                this.props.getBackMessage(this.state.messageCenter);
                this.props.getBackMessageStatus(this.state.messageStatus);
            }
            );
        }
        }
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    getBackRegisterMessage = messageCenter => {
        this.setState({
        messageCenter : messageCenter
        })
        this.props.getBackMessage(this.state.messageCenter);
        
    }

    getBackRegisterMessageStatus = messageStatus => {
        this.setState({
        messageStatus : messageStatus
        })
        this.props.getBackMessageStatus(this.state.messageStatus);
    }
    

    render() {
        
        return (
            <Container fluid>
            {/* className="bGroundContain"> */}
                    {/* <img className="med_b.ground" src={background} alt={"background"} /> */}

                <Container className="home-container">
                    

                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                            >
                                <h4 className="signInTab">Sign In</h4>
                             </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                            >
                                <h4 className="registerTab">Registration</h4>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <SignInForm onClick={this.handleLogin} onChange={this.handleInputChange} username={this.props.username} password={this.state.password} />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                   <Registration onCreateAccount={this.handleCreateAccount} getBackMessage={this.getBackRegisterMessage} getBackMessageStatus={this.getBackRegisterMessageStatus} onValidateEmail={this.handleValidateEmail} onChange={this.handleInputChange} newAccountEmail={this.state.newAccountEmail} newUsername = {this.state.newUsername} newUserPassword= {this.state.newUserPassword}  />
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>    
                </Container>
            </Container>
        );
    }
};

export default withRouter(Home);