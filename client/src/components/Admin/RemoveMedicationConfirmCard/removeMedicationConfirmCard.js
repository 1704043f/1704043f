import React from 'react';

import {
    FormGroup, Input, Label,
    Card, CardBody, CardTitle, 
    Table,
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

            <Card className="confirmMedsCardTableCard TableCard" style={{display: this.props.removeMedicationConfirmCard ? "block" : "none"}}>
                <CardBody className="confirmMedsCardBody TableBody">
                    <CardTitle className="confirmMedsCardTitle Title">Review and Edit Selected Medication</CardTitle>
                    <br />

                    <p style={{fontWeight: "bold"}}>{this.props.medicationName} - {this.props.medicationType}</p>

                     <div>
                        <p>PERMENENTLY remove {this.props.medicationName}, from the list of available medications?</p>
                        <p>All associated information, such as doses and routes, of this drug will be delected as well</p>
                        <p>You can add this medication back into the list of available medications using the 'add medication' link on th amin menu, but this wil require you to re-enter all required medication information.</p>    
                       <br />
                       <br />
                            <Button style={{margin: 6}} size="sm" className="bttn confirmMedsCardDelDoseBtn" onClick={() => this.onClickedRemoveMedication()}>Confirm delete</Button>

                            <Button size="sm" className="bttn confirmMedsCardDelDoseBtn" onClick={() => this.onClickedEditMedication(this.props.medicationId)}>Cancel</Button>
                    </div>

                </CardBody>
            </Card>

        )
    }
}