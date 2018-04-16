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

import FormGroup3_9Name from "../FormGroup/formGroup3_9Name";
import FormGroup3_9Input from "../FormGroup/formGroup3_9Input";
import FormGroup3_9Contact from "../FormGroup/formGroup3_9Contact";

import '../../../pages/Admin';

import moment from "moment";

export default class ChangeAppointmentCard extends React.Component {


    //YYYY-MM-DDTHH:mm:ss.sssZ
    //this.setState({newAppt: `${this.state.newApptDate}T${this.state.newApptTime}.000Z`})
    onClicked(id) {
       this.props.updateAppointment(id)
    }


    onChanged(event) {
        this.props.handleInputChange(event)
    }


    render () {
        return (

            <Card className="updatePatDetailTableCard TableCard" style={{display: this.props.changeAppointmentCard ? "block" : "none"}}>
                <CardBody className="updatePatDetailTableBody TableBody">
                    <CardTitle className="updatePatDetailTitle Title">Update Patient Details </CardTitle>
                        <br />
                        <Form className="updatePatDetailForm Form">

                            <FormGroup row>
                                <Label sm={3}>Hospital number</Label>
                                <Label sm={9}>{this.props.patientNumber}</Label>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Name</Label>
                                <Label sm={9}>{this.props.firstname} {this.props.lastname}</Label>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Enrollment Status</Label>
                                <Label sm={9}>{this.props.active ? "Active" : "Currently inactive"}</Label>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Next appointment currently on: </Label>
                                <Label sm={9}>{moment(this.props.nextAppt).format("dddd, MMMM Do YYYY")} at  {moment(this.props.nextAppt).format("h:mm a")}</Label>
                            </FormGroup>

                            <FormGroup3_9Input
                                type="date"
                                label = {"New appointment date: "}
                                placeholder = {this.props.nextAppt}
                                name = "pt_newApptDate"
                                onChanged = {(event) => this.onChanged(event)}
                            />  
                            
                            <FormGroup3_9Input
                                type="time"
                                label = {"New appointment time: "}
                                placeholder = {this.props.nextAppt}
                                name = "pt_newApptTime"
                                onChanged = {(event) => this.onChanged(event)}
                            />

                             <FormGroup3_9Input
                                type="textarea"
                                label = {"Comments for patient: "}
                                placeholder = {this.props.nextApptComment}
                                name = "pt_nextApptComment"
                                onChanged = {(event) => this.onChanged(event)}
                            /> 



                            <br />
                            <Button className="updatePatDetailUpdateBtn UpdateBtn" onClick={() => this.onClicked(this.props.pt_id)}>Update</Button>
                            <a href="/admin">
                            <Button className="updatePatDetailCancelBtn CancelBtn">Cancel</Button></a>
                        </Form>
                    
                </CardBody>
            </Card>

        )
    }
}           