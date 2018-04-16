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
import '../../../pages/Admin';


export default class RemovePhysicianCard extends React.Component {

    onClicked(id) {
        this.props.removePhysician(id)
    }

        render () {
        return (

            <Card className="removePhysTableCard TableCard" style={{display: this.props.removePhysicianCard ? "block" : "none"}}>
                <CardBody className="removePhysTableBody TableBody">
                    <CardTitle className="removePhysTitle Title">Remove Physician</CardTitle>
                        <br />

                        <Form className="removePhysForm Form">
                              <FormGroup row>
                                <Label sm={3}>Physician Id</Label>
                                <Label sm={9}>{this.props.idNumber}</Label>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Name</Label>
                                <Label sm={9}>Dr. {this.props.firstname} {this.props.lastname}</Label>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>Office</Label>
                                <Label sm={9}>{this.props.office}</Label>
                            </FormGroup>
                            <br />
                            <br />
                            Click 'Remove' to PERMANENTLY remove this physician from using the application.
                            <br />
                            <br />
                            <Button className="removePhysRemoveBtn RemoveBtn" onClick={() => this.onClicked(this.props.dr_id)}>Remove</Button>
                            <a href="/admin">
                            <Button className="removePhysCancelBtn CancelBtn">Cancel</Button></a>
                        </Form>
                    
                </CardBody>
            </Card>

        )
    }
}           