import React from 'react';

import {
    Button, 
    Card, 
    CardBody, 
    CardTitle, 
    Table
} from 'reactstrap';

import moment from "moment";

import '../../../pages/Admin';


export default class confirmPhysicianCard extends React.Component {
    
    onClickedUpdate(id) {
    this.props.updatePhysicianDisplay(id)
    }

    onClickedRemove(id) {
        this.props.removePhysicianDisplay(id)
    }


    render () {
        return (

            <Card className="confirmPhysCardTableCard TableCard"style={{display: this.props.confirmPhysicianCard ? "block" : "none"}}>
                <CardBody className="confirmPhyCardTableBody TableBody">
                    <CardTitle className="confirmPhysCardTitle Title">Review Selected Physician</CardTitle>
                    <br />
                    <Table size="sm" className="confirmPhysCardTable Table">
                        <tbody>
                            <tr>
                                <td>Id Number: </td><td>{this.props.idNumber}</td>
                            </tr><tr>
                                <td>Name:  </td><td>{this.props.firstname}&nbsp;{this.props.lastname}</td>
                            </tr><tr>
                                <td>Date Added:  </td><td>{moment(this.props.dateAdded).format("MMMM Do YYYY")}</td>
                            </tr><tr>
                                <td>Office </td><td>{this.props.office}</td>
                            </tr><tr>
                                <td>E-mail: </td><td>{this.props.email}</td>
                            </tr><tr>
                                <td>Phone: </td><td>{this.props.phone}</td>
                            </tr>
                        </tbody>
                        
                    </Table>

                    <br />
                    <br />
                    <Button className="confirmPhysCardUpdateBtn UpdateBtn" onClick={(_id) => this.onClickedUpdate(this.props._id)}>Update Details</Button>
                    <Button className="confirmPhysCardCancelBtn CancelBtn" onClick={(_id) => this.onClickedRemove(this.props._id)}>Remove Physician</Button>
                    <a href="/admin">
                    <Button className="confirmPhysCardBackBtn BackBtn">Back</Button></a>

                </CardBody>
            </Card>

        )
    }
}