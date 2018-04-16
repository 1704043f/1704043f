import React from 'react';

import {
    Button, 
    Card, 
    CardBody, 
    CardTitle,
    Form, 
} from 'reactstrap';

import FormGroup3_9Input from "../FormGroup/formGroup3_9Input";

import '../../../pages/Admin';




export default class RegisterPhysicianCard extends React.Component {

    onClicked(event) {
        this.props.registerPhysician(event)
    }


    onChanged(event) {
        this.props.handleInputChange(event)
    }


    render () {
        return (

            <Card className="registPhyTableCard TableCard" style={{display: this.props.registerPhysicianCard ? "block" : "none"}}>
                <CardBody className="registPhysTableBody TableBody">
                    <CardTitle className="registPhysTitle Title">Add New Physician</CardTitle>
                        <br />
                        New physician: {this.props.physician_name} successfully enrolled.
                        <br /><br />
                        You can set a username and password now for this physician now or let the physician rgeister a username and password on first accessing the application. 
                        <br /><br />
    
                        <Form className="registPhysForm Form">
                            <FormGroup3_9Input
                                label = {"Username"}
                                placeholder = {"username"}
                                name = {"dr_username"}
                                value = {this.props.username}
                                onChanged = {(event) => this.onChanged(event)}
                            />
                            <FormGroup3_9Input
                                type = {"password"}
                                label = {"Password"}
                                placeholder = {"password"}
                                name = {"dr_password"}
                                value = {this.props.password}
                                onChanged = {(event) => this.onChanged(event)}
                            />

                            <br />
                            <Button className="registPhysRegisterBtn RegisterBtn" onClick={(event) => this.onClicked(event)}>Register</Button>
                            <a href="/admin"><Button className="registPhysCancelBtn CancelBtn">Cancel</Button></a>
                        </Form>
                
                </CardBody>
            </Card>

        )
    }
}      