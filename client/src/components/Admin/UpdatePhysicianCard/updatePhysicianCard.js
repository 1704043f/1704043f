import React from 'react';

import {
    Button, 
    Card, 
    CardBody, 
    CardTitle, 
    Form, 
    FormGroup, 
    Label, 
} from 'reactstrap';
import FormGroup3_9Input from "../FormGroup/formGroup3_9Input";
import FormGroup3_9Contact from "../FormGroup/formGroup3_9Contact";

import '../../../pages/Admin';



export default class UpdatePhysicianCard extends React.Component {

    onClicked(id) {
        this.props.updatePhysician(id)
    }


    onChanged(event) {
        this.props.handleInputChange(event)
    }


    render () {
        return (

            <Card className="TableCard" style={{display: this.props.updatePhysicianCard ? "block" : "none"}}>
                <CardBody className="TableBody">

                    <CardTitle className="TableTitle">Update Physician Details </CardTitle>
                    <br />

                    <Form className="Form">
                        <FormGroup row>
                            <Label sm={3}>Physician Id</Label>
                            <Label sm={9}>{this.props.idNumber}</Label>
                        </FormGroup>

                        <FormGroup row>
                            <Label sm={3}>Name</Label>
                            <Label sm={9}>Dr. {this.props.firstname} {this.props.lastname}</Label>
                        </FormGroup>

                        <FormGroup3_9Input
                            label = {"Office"}
                            placeholder = {this.props.office}
                            name = {"dr_office"}
                            onChanged = {(event) => this.onChanged(event)}
                        />

                        <FormGroup3_9Contact
                            labelEmail = {"Contact email"}
                            placeholderEmail = {this.props.email}
                            nameEmail = {"dr_email"}

                            labelPhone = {"Contact phone"}
                            placeholderPhone = {this.props.phone}
                            namePhone = {"dr_phone"}
                            
                            onChanged = {(event) => this.onChanged(event)}
                        />
                        <br />

                        <Button color='success' className="admin-btn" onClick={() => this.onClicked(this.props.dr_id)}>Update</Button>
                        <a href="/admin"><Button className="admin-btn">Cancel</Button></a>

                    </Form>
                    
                </CardBody>
            </Card>

        )
    }
}           