import React from 'react';
import {
    Card, 
    CardBody, 
    CardTitle, 
    CardText,
    Button,
} from 'reactstrap';

import '../../../pages/Admin';



export default class SuccessUpdatePatientCard extends React.Component {

    render () {
        return (

            <Card className="successUpdatePatTableCard TableCard" style={{display: this.props.successUpdatePatientCard ? "block" : "none"}}>
            <CardBody className="successUpdatePatTableBody TableBody">
                <CardTitle className="successUpdatePatTitle Title">Update Patient Details</CardTitle>
                <CardText>
                    <br />
                    Patient, {this.props.patient_name}, details have been successfully updated.
                    <br /><br /> <br />      
                </CardText>

                <a href="/admin">
                <Button className="successUpdatePatFinishBtn FinishBtn">Finish</Button></a>
            </CardBody>
        </Card>
        
        )
    }
}