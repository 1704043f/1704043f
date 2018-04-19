import React from 'react';

import {
    Table,
    Card, CardBody, CardTitle, 
    Button, 
} from 'reactstrap';
import '../../../pages/Admin';

export default class updateEnrollStatusCard extends React.Component {

    onClickedUpdateStatus(id, status) {
        this.props.updatePatientEnrollStatus(id, status)
    }


    render () {
        return (

            <Card className="confirmMedsCardTableCard TableCard" style={{display: this.props.updateEnrollStatusCard ? "block" : "none"}}>
                <CardBody className="confirmMedsCardBody TableBody">
                    <CardTitle className="confirmMedsCardTitle Title">Update Patient Details</CardTitle>
                    <br />

                    {this.props.active ? 
                        <container>
                            <p style={{fontWeight: "bold"}}>This patient's enrollment status is currently: {this.props.active ? "Active" : "Inactive"}</p>
                            <p>You may want to change this patient's status to inactive if they are no longer under your care, no longer need care for their Parkinson's disease or don't want to further use the application. </p>
                            <p>Inactive patient's data is retained and can be accessed via the report page in the normal way. However, you will no longer be able to create a new episode for an inactive patient. Inactive patients can be reactivated at any time.</p>
                            <br />
                            <Button className="confirmMedsCardBackBtn BackBtn" onClick={() => this.onClickedUpdateStatus(this.props.pt_id, false)}>Make inactive</Button>
                            <Button className="confirmMedsCardBackBtn BackBtn" onClick={() => this.onClickedCancel(this.props.pt_id)}>No change</Button>
                    </container>
                    :
                    <container>
                        <p style={{fontWeight: "bold"}}>This patient's enrollment status is currently: {this.props.active ? "Active" : "Inactive"}</p>
                        <p>You may want to change this patient's status back to active if they have returned to your care for their Parkinson's disease and/or they wish to use the applicationn once again.</p>
                        <p>Once a patient's enrollment status is active you can create an episode for them and use the application. </p>
                        <br />
                        <Button className="confirmMedsCardBackBtn BackBtn" onClick={() => this.onClickedUpdateStatus(this.props.pt_id, true)}>Make active</Button> 
                        <Button className="confirmMedsCardBackBtn BackBtn" onClick={() => this.onClickedCancel(this.props.pt_id)}>No change</Button>   
                    </container>  
                    }     

                </CardBody>
            </Card>

        )
    }
}        