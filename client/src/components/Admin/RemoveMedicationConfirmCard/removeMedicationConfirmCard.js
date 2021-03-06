import React from 'react';

import {
    Card, CardBody, CardTitle, 
    Button, 
} from 'reactstrap';

import '../../../pages/Admin';

export default class removeMedicationConfirmCard extends React.Component {


    onClickedRemoveMedication() {
        console.log(this.props.medicationId)
        this.props.removeMedication(this.props.medicationId)
    }

    onClickedEditMedication() {
        console.log(this.props.medicationId)
        this.props.editMedication(this.props.medicationId)
    }

    render () {
        return (

            <Card className="TableCard" style={{display: this.props.removeMedicationConfirmCard ? "block" : "none"}}>
                <CardBody>
                    <CardTitle className="TableTitle">Review and Edit Selected Medication</CardTitle>
                    <br />

                    <p style={{fontWeight: "bold"}}>{this.props.medicationName} - {this.props.medicationType}</p>

                     <div>
                        <p>PERMENENTLY remove {this.props.medicationName}, from the list of available medications?</p>
                        <p>All associated information, such as doses and routes, of this drug will be delected as well</p>
                        <p>You can add this medication back into the list of available medications using the 'add medication' link on th amin menu, but this wil require you to re-enter all required medication information.</p>    
                       <br />
                       <br />
                            <Button size="sm" color="danger" className="admin-btn" onClick={() => this.onClickedRemoveMedication()}>Confirm delete</Button>

                            <Button size="sm" className="admin-btn" onClick={() => this.onClickedEditMedication(this.props.medicationId)}>Cancel</Button>
                    </div>

                </CardBody>
            </Card>

        )
    }
}