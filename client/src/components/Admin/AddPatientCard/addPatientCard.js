import React from 'react';
import {
    Button, 
    Card, CardBody, CardTitle,
    Form 
} from 'reactstrap';
import FormGroup3_9Name from "../FormGroup/formGroup3_9Name";
import FormGroup3_9Input from "../FormGroup/formGroup3_9Input";
import FormGroup3_9Contact from "../FormGroup/formGroup3_9Contact";
import FormGroup3_9Select from "../FormGroup/formGroup3_9Select";

import '../../../pages/Admin';



export default class AddPatientCard extends React.Component {

    onClicked(event) {
        this.props.enrollPatient(event)
    }

    onChanged(event) {
        this.props.handleInputChange(event)
    }


    render () {
        return (

            <Card className="TableCard" style={{display: this.props.addPatientCard ? "block" : "none"}}>
                <CardBody>
                    <CardTitle className="TableTitle">Enroll A New Patient</CardTitle>
                        <br />
        
                        <Form className="Form">

                            <FormGroup3_9Name
                                nameFirstName = {"pt_firstname"}
                                valueFirstName = {this.props.firstname}
                                nameLastName = {"pt_lastname"}
                                valueLastName= {this.props.lastname}
                                onChanged = {(event) => this.onChanged(event)}
                            />

                              <FormGroup3_9Input
                                label = {"Hospital number"}
                                placeholder = {"hosp1234"}
                                name = {"pt_hospnum"}
                                value = {this.props.hospnum}
                                onChanged = {(event) => this.onChanged(event)}
                            />

                            <FormGroup3_9Input
                                label = {"Date of birth"}
                                placeholder = {"mm-dd-yyyy"}
                                name = {"pt_dob"}
                                value = {this.props.dob}
                                onChanged = {(event) => this.onChanged(event)}
                            />

                            <FormGroup3_9Contact
                                labelEmail = {"Contact email"}
                                nameEmail = {"pt_email"}
                                valueEmail = {this.props.email}
                                labelPhone = {"Contact phone"}
                                namePhone = {"pt_phone"}
                                valuePhone = {this.props.phone}
                                onChanged = {(event) => this.onChanged(event)}
                            />

                            <FormGroup3_9Select

                                label="Primary physician:"
                                firstOption="select physician"
                                name = "pt_physician"
                                selectList={this.props.physicians}
                                onChanged = {(event) => this.onChanged(event)}
                            />

                            <br />
                            <Button color='success' className="admin-btn right-align" onClick={(event) => this.onClicked(event)}>Enroll</Button>
                            <Button className="admin-btn right-align">Cancel</Button>
                        </Form>
                    
                </CardBody>
            </Card>

        )
    }
}           