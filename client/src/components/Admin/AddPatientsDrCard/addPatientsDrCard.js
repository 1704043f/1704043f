import React from 'react';
import {
    Button, 
    Card, CardBody, CardTitle, 
    Form
} from 'reactstrap';

import FormGroup3_9Select from "../FormGroup/formGroup3_9Select";

import '../../../pages/Admin';


export default class AddPatientCard extends React.Component {


    onClicked(event) {
        this.props.enrollPatientWithDr(event)
    }

    onChanged(event) {
        this.props.handleInputChange(event)
    }


    render () {
        return (

            <Card className="enrollNewPatTableCard TableCard" style={{display: this.props.addPatientsDrCard ? "block" : "none"}}>
                <CardBody className="enrollNewPatTableBody TableBody">
                    <CardTitle className="enrollNewPatTitle Title">Enroll A New Patient</CardTitle>

                        <br />
        
                        <Form className="enrollNewPatForm Form">

                            <FormGroup3_9Select

                                label="Select patient's primary physician:"
                                firstOption="select physician"
                                name = "pt_physician"
                                selectList={this.props.physicians}
                                onChanged = {(event) => this.onChanged(event)}
                            />

                            <br />

                            <Button className="enrollNewPatEnrollBtn AddBtn" onClick={(event) => this.onClicked(event)}>Enroll</Button>
                            <a href="/admin"><Button className="enrollNewPatCanelBtn CancelBtn">Cancel</Button></a>

                        </Form>
                    
                </CardBody>
            </Card>

        )
    }
}  