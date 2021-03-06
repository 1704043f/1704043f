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

            <Card className="TableCard"style={{display: this.props.confirmPhysicianCard ? "block" : "none"}}>
                <CardBody>

                    <CardTitle className="TableTitle">Review Selected Physician</CardTitle>
                    <br />

                    <Table size="sm" className="TableText">
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
                    <Button color='success' className="admin-btn" onClick={(_id) => this.onClickedUpdate(this.props._id)}>Update Details</Button>
                    <Button color='danger' className="admin-btn" onClick={(_id) => this.onClickedRemove(this.props._id)}>Remove Physician</Button>
                    <a href="/admin"><Button className="admin-btn">Back</Button></a>

                </CardBody>
            </Card>

        )
    }
}