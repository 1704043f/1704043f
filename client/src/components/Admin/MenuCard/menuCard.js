import React from 'react';
import {
    Card, CardBody, CardTitle,
} from 'reactstrap';

import '../../../pages/Admin';


export default class MenuCard extends React.Component {


    onClicked(selection) {
        this.props.menuSelect(selection)
    }


    render () {
        return (

            <Card className="TableCard" style={{display: this.props.menuCard ? "block" : "none"}}>
            <CardBody>
                <CardTitle className="TableTitle">Actions</CardTitle>

                    <div className="MenuHover" style={{fontWeight: this.props.notificationCard ? "bold" : ""}}><a onClick={() => this.onClicked("dash board")}>Dashboard</a></div>

                    <hr />
                    <div className="MenuHover" style={{fontWeight: this.props.selectPatientCard || this.props.confirmPatientCard || this.props.updatePatientCard || this.props.successUpdatePatientCard || this.props.changeAppointmentCard || this.props.successChangeAppointmentCard || this.props.updateEnrollStatusCard ? "bold" : ""}}><a onClick={() => this.onClicked("select patient")}>Select patient</a></div>

                    <div className="MenuHover"style={{fontWeight: this.props.addPatientCard || this.props.registerPatientCard || this.props.successPatientCard ? "bold" : ""}}><a onClick={() => this.onClicked("add patient")}>Enroll new patient</a></div>

                    <hr />
                    <div className="MenuHover"style={{fontWeight: this.props.selectPhysicianCard || this.props.confirmPhysicianCard || this.props.updatePhysicianCard || this.props.successUpdatePhysicianCard || this.props.removePhysicianCard || this.props.successRemovePhysicianCard ? "bold" : ""}}><a onClick={() => this.onClicked("select physician")}>Select physician</a></div>

                    <div className="MenuHover"style={{fontWeight: this.props.addPhysicianCard || this.props.registerPhysicianCard ||this.props.successPhysicianCard ? "bold" : ""}}><a onClick={() => this.onClicked("add physician")}>Add new physician</a></div>
                    <hr />
  
                    <div className="MenuHover" style={{fontWeight: this.props.selectMedicationCard || this.props.editMedicationCard || this.props.removeMedicationConfirmCard ? "bold" : ""}}><a onClick={() => this.onClicked("select medication")}>Select medication</a></div>
                    
                    <div className="MenuHover"style={{fontWeight: this.props.addMedicationCard || this.props.confirmAddMedicationCard ? "bold" : ""}}><a onClick={() => this.onClicked("add medication")}>Add new medication</a></div>
  
            </CardBody>
        </Card>



        )    
    }
}