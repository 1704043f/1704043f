import React from 'react';
import {
    Button, 
    Card, CardBody, CardTitle, 
    Form, FormGroup, Label, 
} from 'reactstrap';
import FormGroup3_9Contact from "../FormGroup/formGroup3_9Contact";

import '../../../pages/Admin';


export default class UpdatePatientCard extends React.Component {

    
    onClicked(id) {
        this.props.updatePatient(id)
    }

    onChanged(event) {
        this.props.handleInputChange(event)
    }

    render () {
        return (

            <Card className="updatePatTableCard TableCard" style={{display: this.props.updatePatientCard ? "block" : "none"}}>
                <CardBody className="updatePatTableBody TableBody">
                    <CardTitle className="updatePatTitle Title">Update Patient Details </CardTitle>
                        <br />

                        <Form className="updatePatForm Form">
                            <FormGroup row>
                                <Label sm={3}>Hospital number</Label>
                                <Label sm={9}>{this.props.patientNumber}</Label>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Name</Label>
                                <Label sm={9}>{this.props.firstname ? this.props.firstname.charAt(0).toUpperCase() + this.props.firstname.slice(1) : null } {this.props.lastname? this.props.lastname.charAt(0).toUpperCase() + this.props.lastname.slice(1) : null}</Label>
                            </FormGroup>

                            <FormGroup3_9Contact
                                labelEmail = {"Contact email"}
                                placeholderEmail = {this.props.email}
                                nameEmail = {"pt_email"}
                                //valueEmail = {this.props.email}

                                labelPhone = {"Contact phone"}
                                placeholderPhone = {this.props.phone}
                                namePhone = {"pt_phone"}
                                //valuePhone = {this.props.phone}
                                
                                onChanged = {(event) => this.onChanged(event)}
                            />

                            <br />
                            <Button className="updatePatUpdateBtn UpdateBtn" onClick={() => this.onClicked(this.props.pt_id)}>Update</Button>
                            <a href="/admin">
                            <Button className="updatePatCancelBtn CancelBtn">Cancel</Button></a>
                        </Form>
                    
                </CardBody>
            </Card>

        )
    }
}           