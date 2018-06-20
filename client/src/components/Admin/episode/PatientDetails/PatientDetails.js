import React from 'react';

import {
    Container, 
    Card, 
    CardBody, 
    CardTitle, 
    CardText,
    Button,
    Table
} from 'reactstrap';
import moment from 'moment';

import '../../../../pages/Admin';


export default class PatientDetails extends React.Component {
    constructor(props){
        super(props);
        this.enterEpisodeMedications = this.props.enterEpisodeMedications.bind(this);
    }

    render () {

        return (
            
            <Card className="TableCard" style={{display: this.props.patientDetailsCard ? "block" : "none"}}>
                <CardBody>
                    <CardTitle className="TableTitle">Review Patient Details</CardTitle>

                        <CardText>
                            <br />
                            <Table size="sm" className="TableText" >
                                <tbody>
                                <tr>
                                    <td>
                                        Hospital Number:
                                    </td>
                                    <td>
                                        {this.props.patient_number}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Name :
                                    </td>
                                    <td>
                                        {this.props.first_name}&nbsp;{this.props.last_name}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Date of Birth:
                                    </td>
                                    <td>
                                        {moment(this.props.dob).format("MMMM Do YYYY")}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Enrolled:
                                    </td>
                                    <td>
                                        {moment(this.props.date_created).format("MMMM Do YYYY")}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Enrollment status:
                                    </td>
                                    <td>
                                        {this.props.active ? "Active" : "Currently inactive"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        E-mail:
                                    </td>
                                    <td>
                                        {this.props.email}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Phone:
                                    </td>
                                    <td>
                                        {this.props.phone}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Episodes recorded:
                                    </td>
                                    <td>
                                        {this.props.length}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Last episode created:
                                    </td>
                                    <td>
                                        {moment(this.props.date_created).format("MMMM Do YYYY h:mm a")}
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                                <br />
                                <br />

                            { this.props.active ?  "" : 
                                "Note, this patient has been marked inactive.\nYou cannot create a new episode for inactive patients."
                            }
                            
                        </CardText>

                    <div style={{display: this.props.active ? "block" : "none"}}>
                        <Button color='success' className="admin-btn right-align" onClick={() => this.props.enterEpisodeMedications()}>Next</Button>
                        <a href={"/admin"}><Button color='secondary' className="admin-btn right-align">Cancel</Button></a> 
                    </div>

                    <div style={{display: !this.props.active ? "block" : "none"}}>
                        <a href={"/admin"}><Button color='secondary' className="admin-btn right-align">Back</Button></a> 
                    </div>

                </CardBody>
            </Card>
        )
    }
}