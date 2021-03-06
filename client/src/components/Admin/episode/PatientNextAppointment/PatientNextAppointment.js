import React from 'react';

import {
    Label, 
    Input, 
    Button, 
    Container, 
    Card, 
    CardBody, 
    CardTitle, 
    CardText,
} from 'reactstrap';
import moment from "moment";
import mailerAPI from "../../../../utils/nodemailerAPI";
import Alert from 'react-s-alert';


import '../../../../pages/Admin';


export default class PatientNextAppointment extends React.Component {

    state = {
        next_appt : '',
        comments : '',
        date : "",
        time : ""

    }


    handleSubmit = () =>{
        if(this.validateDate(this.state.date, this.state.time)){
            this.setState({
                next_appt : moment(this.state.date + " " + this.state.time).format("dddd, MMMM Do YYYY h:mm a")
            },function(){
                this.props.handleApptCallback(this.state);
                this.props.confirmNewEpisodeDetails();
                mailerAPI.sendToPatient({
                    subject : "MedMonitor - Appointment Created",
                    name: this.props.first_name + ", " + this.props.last_name,
                    email: this.props.email,
                    message:
                        `
                        Dear ${this.props.first_name} ${this.props.last_name},
                        We have scheduled an appointment for you on ${this.state.next_appt} with Dr ${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}. 

                        These are the comment from your doctor: 
                        
                                ${this.state.comments}

                        As we are progressing through your health wealthness, we would like to remind you to keep track of your wellness frequently with our application.
                        If you need a reminder for medication time for current episode and appointment time, please visit the application. 
                        
                        From:

                        MedMonitor
                        `
                })
                    .then(res => {
                        Alert.success('Appointment has been scheduled.', {
                            position : 'top',
                            effect: 'stackslide',
                        });
                    })
                    .catch(err => {
                        console.log(err.response);
                    });
                })
        }
    }


    validateDate = (date, time) => {
        let valid = true
        if(date && time){
            if(moment(date).isAfter(moment())){
                this.setState({
                    next_appt : moment(date + " " + time).format("dddd, MMMM Do YYYY h:mm a")
                })
            }else{
                Alert.error('Date must be later than today.', {
                    position : 'top',
                    effect: 'stackslide',
                });
                valid = false;
            }
        }else{
            Alert.error('Date/time cannot be empty.', {
                position : 'top',
                effect: 'stackslide',
            });
            valid = false;
        }
        return valid;
    };

    
    // Form handlers
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };



    render () {
        return (
            <Card className="TableCard" style={{display: this.props.addNextAppointmentCard ? "block" : "none"}}>
                <CardBody>
                    <CardTitle className="TableTitle">Create New episode</CardTitle>
                
                    <CardText>
                        <br />
                        Enter the date and time of the patient's next appointment. You can also add notes for the patient to view when they log-in and use the app. 
                        <br />
                    </CardText>

                    <div style={{width: 300}}>
                        <Label style={{fontWeight: "bold"}}>Date:</Label>
                        <Input type='date' name='date' onChange={this.handleInputChange}/>

                        <Label style={{fontWeight: "bold"}}>Time:</Label>
                        <Input type='time' name='time' onChange={this.handleInputChange} /> 
                        <br />
                        
                    </div>

                        <Label style={{fontWeight: "bold"}}>Notes for patient:</Label>
                        <Input type="textarea" name='comments' onChange={this.handleInputChange} placeholder='reminder or notes for patient' />
                        <br />
                    

                    <a href={"/admin"}><Button color='secondary' className="admin-btn right-align" style={{marginRight: 6}}>Cancel</Button></a> 
                    <Button color='success' className="admin-btn right-align" onClick={() => this.handleSubmit()}>Next</Button>

                    

                </CardBody>
            </Card>
        )
    }
}