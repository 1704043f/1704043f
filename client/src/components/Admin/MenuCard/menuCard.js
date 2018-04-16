import React from 'react';
import {
    Card, CardBody, CardTitle,
} from 'reactstrap';
import './menuCard.css';

import '../../../pages/Admin';


export default class MenuCard extends React.Component {


    onClicked(selection) {
        this.props.menuSelect(selection)
    }


    render () {
        return (

            <Card className="actionTableCard TableCard" style={{display: this.props.menuCard ? "block" : "none"}}>
            <CardBody className="actionTableBody TableBody">
                <CardTitle className="actionTableTitle Title">Actions</CardTitle>

                    <div className="actTableDashboard" style={{fontWeight: this.props.notificationCard ? "bold" : ""}}><a onClick={() => this.onClicked("dash board")}>Dashboard</a></div>

                    <hr />
                    <div className="actTableSelPat" style={{fontWeight: this.props.selectPatientCard || this.props.confirmPatientCard || this.props.updatePatientCard || this.props.successUpdatePatientCard || this.props.changeAppointmentCard || this.props.successChangeAppointmentCard ? "bold" : ""}}><a onClick={() => this.onClicked("select patient")}>Select patient</a></div>

                    <div className="actTableEnrollNewPat" style={{fontWeight: this.props.addPatientCard || this.props.addPatientsDrCard || this.props.registerPatientCard || this.props.successPatientCard? "bold" : ""}}><a onClick={() => this.onClicked("add patient")}>Enroll new patient</a></div>

                    <hr />
                    <div className="actTableSelPhys" style={{fontWeight: this.props.selectPhysicianCard || this.props.confirmPhysicianCard || this.props.updatePhysicianCard || this.props.successUpdatePhysicianCard || this.props.removePhysicianCard || this.props.successRemovePhysicianCard ? "bold" : ""}}><a onClick={() => this.onClicked("select physician")}>Select physician</a></div>

                    <div className="actTableAddNewPhys" style={{fontWeight: this.props.addPhysicianCard || this.props.registerPhysicianCard ||this.props.successPhysicianCard ? "bold" : ""}}><a onClick={() => this.onClicked("add physician")}>Add new physician</a></div>
                    <hr />
  
                    <div className="actTableSelMed" style={{fontWeight: this.props.selectMedcationCard ? "bold" : ""}}>Select medication</div>
                    <div className="actTableAddNewMed" style={{fontWeight: this.props.addMedicationtCard ? "bold" : ""}}>Add new medication</div>
  
            </CardBody>
        </Card>



        )    
    }
}