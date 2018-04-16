import React from 'react';

import {
    Button, 
    Card, 
    CardBody, 
    CardTitle, 
    Form, 
} from 'reactstrap';

import FormGroup3_9Name from "../FormGroup/formGroup3_9Name";
import FormGroup3_9Input from "../FormGroup/formGroup3_9Input";
import FormGroup3_9Contact from "../FormGroup/formGroup3_9Contact";

import '../../../pages/Admin';



export default class AddPhysicianCard extends React.Component {

    onClicked(event) {
        this.props.addPhysician(event)
    }

    onChanged(event) {
        this.props.handleInputChange(event)
    }


    render () {
        return (

            <Card className="addNewPhysTableCard TableCard" style={{display: this.props.addPhysicianCard ? "block" : "none"}}>
                <CardBody className="addNewPhysTableBody TableBody">
                    <CardTitle className="addNewPhysTitle Title">Add New Physician</CardTitle>
                        <br />
        
                        <Form className="addNewPhysForm Form">

                            <FormGroup3_9Name
                                nameFirstName = {"dr_firstname"} 
                                valueFirstName = {this.props.firstname}
                                nameLastName = {"dr_lastname"}
                                valueLastName= {this.props.lastname}
                                onChanged = {(event) => this.onChanged(event)}
                            />

                              <FormGroup3_9Input
                                label = {"Id number"}
                                placeholder = {"id1234"}
                                name = {"dr_idnum"}
                                value = {this.props.hospnum}
                                onChanged = {(event) => this.onChanged(event)}
                            />

                            <FormGroup3_9Input
                                label = {"Office"}
                                placeholder = {"office name & address"}
                                name = {"dr_office"}
                                value = {this.props.office}
                                onChanged = {(event) => this.onChanged(event)}
                            />

                            <FormGroup3_9Contact
                                labelEmail = {"Contact email"}
                                valueEmail = {this.props.email}
                                nameEmail = {"dr_email"}
                                labelPhone = {"Contact phone"}
                                valuePhone = {this.props.phone}
                                namePhone = {"dr_phone"}
                                onChanged = {(event) => this.onChanged(event)}
                            />

                            <br />
                            <Button className="addNewPhysAddBtn AddBtn"  onClick={(event) => this.onClicked(event)}>Add Physician</Button>
                            <a href="/admin">
                            <Button className="addNewphysCanelBtn CancelBtn">Cancel</Button></a>
                        </Form>
                    
                </CardBody>
            </Card>

        )
    }
}           