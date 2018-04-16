import React from 'react';

import {
    Card, 
    CardBody, 
    CardTitle, 
    CardText,
    Button,
} from 'reactstrap';

import '../../../pages/Admin';



export default class SuccessChangeAppointmentCard extends React.Component {

    render () {
        return (

            <Card className="succesChangAppTableCard TableCard" style={{display: this.props.successChangeAppointmentCard ? "block" : "none"}}>
            <CardBody className="successChangAppTableBody TableBody">
                <CardTitle className="successChangAppTitle Title">Update Next Appointment</CardTitle>
                <CardText>
                    <br />
                    Patient, {this.props.patient_name}, next appointment has been successfully updated.
                    <br /><br /> <br />      
                </CardText>

                <a href="/admin">
                <Button className="successChangAppFinshBtn FinishBtn">Finish</Button></a>
            </CardBody>
        </Card>
        
        )
    }
}