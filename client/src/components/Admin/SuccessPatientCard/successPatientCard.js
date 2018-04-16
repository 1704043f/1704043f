import React from 'react';
import {
    Card, CardBody, CardTitle, CardText,
    Button
} from 'reactstrap';

import '../../../pages/Admin';

export default class SuccessPatientCard extends React.Component {

    render () {
        return (

            <Card className="successEnrollPatTableCard TableCard" style={{display: this.props.successPatientCard ? "block" : "none"}}>
            <CardBody className="successEnrollPatTableBody TableBody">
                    <CardTitle className="successEnrollPatTitle Title">Enroll A New Patient</CardTitle>
                <CardText>
                    <br />
                    New Patient: {this.props.patient_name} successfully enrolled and registered.
                    <br /><br />
                    An email has been sent to {this.props.patient_email} with their username and password so that they can log-in and use the application.
                    <br />              
                </CardText>
                    <br />
                    <a href="/admin">
                    <Button className="successEnrollPatFinishBtn FinishBtn">Finish</Button></a>
            </CardBody>
        </Card>
        
        )
    }
}