import React from 'react';
import patientAPI from '../../utils/patientAPI';
import doctorAPI from '../../utils/doctorAPI';
import userAPI from "../../utils/userAPI";
import mailerAPI from "../../utils/nodemailerAPI";
import "./Registration.css";
import {
    Input,
    Form,
    FormGroup,
    Label,
    Button,
    Container
} from 'reactstrap';


export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            newAccountEmail : "",
            patientID : "",
            doctorID : "",
            username : "",
            password : "",
            confirmPassword : ""
        }
        
    };
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    validateAccountInfo = (user, password, confirmPassword) =>{
        let valid = true;
        if(!user || !password || !confirmPassword){
            valid = false;
            this.props.getBackMessage(`user or password field(s) cannot be empty.`);
            this.props.getBackMessageStatus("danger");
        }else if(password !== confirmPassword){
            valid = false;
            this.props.getBackMessage(`password and confirm password are not identical`);
            this.props.getBackMessageStatus("danger");
        }else if(password.length < 6){
            valid = false;
            this.props.getBackMessage(`password length has to be greater than 6 characters`);
            this.props.getBackMessageStatus("danger");
        }
        return valid
    }
    handleCreateAccount = e => {

        //more needs to be done here, validation of password, 
        e.preventDefault();
        if(this.validateAccountInfo(this.state.username, this.state.password, this.state.confirmPassword)){
            if(this.state.username && this.state.password && this.state.confirmPassword){
                userAPI.createAccount({
                username : this.state.username,
                password : this.state.password,
                email: this.state.newAccountEmail,
                role : this.state.role,
                patient_id : this.state.patientID ? this.state.patientID : "n/a",
                doctor_id : this.state.doctorID ? this.state.doctorID : "n/a"
            }).then(res => {
                this.props.getBackMessage(`Account created successfully! Please sign in to access to all the awesome features this application offers!`);
                this.props.getBackMessageStatus("success");
                if(this.state.role === "patient"){
                    mailerAPI.sendToPatient({
                        name : this.state.username,
                        email : this.state.newAccountEmail,
                        message : `Account created successfully! Please sign in to access to all the awesome features this application offers!`
                    })
                    .then(res =>{
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }else{
                    mailerAPI.sendToDoctor({
                        name : this.state.username,
                        email : this.state.newAccountEmail,
                        message : `Account created successfully! Please sign in to access to all the awesome features this application offers!`
                    })
                    .then(res =>{
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
                
            }).catch(err => {
                console.log(err)
                this.setState({ 
                    messageCenter : "Something bad happened while creating your account",
                    messageStatus : "danger"
                });  
            });
            }
        }
    }
    validateEmail = (email) => {
        let valid = true
        if(!email){
            valid=false;
            this.props.getBackMessage(`Email address cannot be empty`);
            this.props.getBackMessageStatus("danger");
        }
        return valid;
    }
    handleValidateEmail = (email, e) => {
        e.preventDefault();
        if(this.validateEmail(this.state.newAccountEmail)){
        userAPI.getUserByEmail(email).then(res =>{
            if(res.data === 'email is ok for new account'){
                if(this.state.newAccountEmail){
                    patientAPI.findPatientEmail(email,{}).then(res =>{
                        if(res.data.length > 0){
                            this.setState({
                                patientID: res.data[0]._id,
                                newAccountEmail : res.data[0].details.email,
                                role : "patient"
                            })
                            this.props.getBackMessage(`Found email address '${this.state.newAccountEmail}' !`);
                            this.props.getBackMessageStatus("success");
                        }else{
                            //provide to find doctor.. 
                            doctorAPI.findDoctorEmail(email, {}).then(res => {
                                if(res.data.length > 0){
                                    this.setState({
                                        doctorID : res.data[0]._id,
                                        newAccountEmail : res.data[0].email,
                                        role : "doctor"
                                    })
                                    this.props.getBackMessage(`Found email address '${this.state.newAccountEmail}' !`);
                                    this.props.getBackMessageStatus("success");
                                }else{
                                    this.props.getBackMessage("Sorry, we couldn't find your email address from our system, please contact the admin for more information");
                                    this.props.getBackMessageStatus("danger");        
                                }
                            })
                        }
                    })
                }
            }else{
                this.props.getBackMessage("Sorry, this user name has already exist in our system, perhaps you lost your password? Please contact admin for more information");
                this.props.getBackMessageStatus("danger");   
            }
        })
    }
    }

    render() {
        const role = this.state.role;
        return (
            <Container>
                {!role ? (
                    <Form className="validation-form col-md-12">
                        <Container>
                            <h2 className="signInMessage">Email Address Validation</h2>
                        </Container>
                        <Container>
                            <FormGroup row className="signInName">
                                <Label size="lg">Email address</Label>
                                <Input className="Emailplaceholder" type="text" name="newAccountEmail" placeholder="Please enter email address here.. " bsSize="lg" value={this.state.newAccountEmail} onChange={this.handleInputChange} />
                            </FormGroup>
                            <Button className="submit-button" size="lg" color="success" onClick={(event) => this.handleValidateEmail(this.state.newAccountEmail, event)}> VALIDATE EMAIL</Button>{' '}
                        </Container>
                    </Form>
                )
                :(
                    <Form className="registration-form col-md-12">
                        <Container>
                            <h2 className="registerMessage">Register Your Account</h2>
                        </Container>
                        <Container>
                            <FormGroup row className="RegisterUserName">
                                <Label size="lg">User Name</Label>
                                <Input type="text" name="username" id="enterUser" placeholder="user name" bsSize="lg" value={this.state.username} onChange={this.handleInputChange} />
                            </FormGroup>
                            <FormGroup row className="registerPassword">
                                <Label className="register-label" size="lg">Password</Label>
                                <Input type="password" name="password" placeholder="password" bsSize="lg" value={this.state.password} onChange={this.handleInputChange} />
                            </FormGroup>
                            <FormGroup row className="registerPassword">
                                <Label className="register-label" size="lg">Confirm Password</Label>
                                <Input type="password" name="confirmPassword" placeholder="password" bsSize="lg" value={this.state.confirmPassword} onChange={this.handleInputChange} />
                            </FormGroup>
                            <Button className="submit-button" size="lg" color="success" onClick={(event) => this.handleCreateAccount(event)}> SUBMIT</Button>{' '}
                        </Container>
                    </Form>
                )}
            </Container>

        );
    }
}
