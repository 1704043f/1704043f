import React from 'react';
import {
    Button, 
    Card, CardBody, CardTitle,
    Table
} from 'reactstrap';
import moment from "moment";

import '../../../pages/Admin';


export default class ConfirmPatientCard extends React.Component {


    onClickedDetails(id) {
        this.props.updatePatientDisplay(id)
    }

    onClickedAppt(id) {
        this.props.updateAppointmentDisplay(id)
    }

    onChanged(event) {
        this.props.handleInputChange(event)
    }


    render () {
        return (

            <Card className="TableCard" style={{display: this.props.confirmPatientCard ? "block" : "none"}}>
                <CardBody>
                    <CardTitle className="TableTitle">Review Selected Patient</CardTitle>

                        <br />
                        <Table className="TableText" size="sm">
                        <tbody>
                            <tr>
                                <td>Hospital Number:</td><td>{this.props.patientNumber}</td>
                            </tr><tr>
                                <td>Name:</td><td>{this.props.firstname}&nbsp;{this.props.lastname}</td>
                            </tr><tr>
                                <td>Date of Birth:</td><td>{moment(this.props.dob).format("MMMM Do YYYY")}</td>
                            </tr><tr>
                                <td>Enrolled:</td><td>{moment(this.props.dateCreated).format("MMMM Do YYYY")}</td>
                            </tr><tr>
                                <td>Enrollment Status:</td><td>{this.props.active ? "active" : "currently inactive"}</td>
                            </tr><tr>
                                <td>Next Appointment:</td><td>{moment(this.props.nextAppt).format("dddd, MMMM Do YYYY")} at {moment(this.props.nextAppt).format("h:mm a")}</td>
                            </tr><tr>
                                <td>E-mail:</td><td>{this.props.email}</td>
                            </tr><tr>
                                <td>Phone:</td><td>{this.props.phone}</td>
                            </tr><tr>
                                <td>Total Episodes:</td><td>{this.props.patientEpisodesLength}</td>
                            </tr><tr>
                                <td>Start of Current Episode:</td><td>{moment(this.props.patientEpisodesStart).format("MMMM Do YYYY")}  ({moment(this.props.patientEpisodesStart).format("h:mm a")})</td>
                            </tr><tr>
                                <td>Records in Current Episode:</td><td>{this.props.recordsLastPatientEpisode}</td>
                            </tr>
                        </tbody>
                        </Table>

                    <br />
                    <br />
                    <a href={`/admin/Episode?id=${ this.props.patientId }`}><Button className="admin-btn">Create New Episode</Button></a>
                    <a href={`/admin/Report?id=${ this.props.patientId }`}><Button className="admin-btn">Report</Button></a>
                    <Button className="admin-btn" onClick={(_id) => this.onClickedDetails(this.props._id)}>Update details</Button>
                    <Button className="admin-btn" onClick={(_id) => this.onClickedAppt(this.props._id)}>Update appointment</Button>
                    <a href="/admin"><Button className="admin-btn">Close</Button></a>

                </CardBody>
            </Card>

        )
    }
}