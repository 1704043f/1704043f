import React from 'react';

import {
    FormGroup, Input, Label,
    Card, CardBody, CardTitle, 
    Table,
    Button, 
} from 'reactstrap';

import '../../../pages/Admin';

const formulationsList = ["tablet", "capsule", "syrup", "liquid", "suspension", "injection", "infusion", "patch", "cassette"];
const routesList = ["oral", "buccal", "sub-lingual", "enteral", "sub-cut", "intravenous", "transdermal"];

export default class editMedicationCard extends React.Component {

    onClickedRemoveMedication() {
        this.props.removeMedicationConfirm(this.props.medicationId)
    }


    onClickedDeleteDose(index) {
        this.props.deleteMedicationDose(this.props.medicationId, this.props.medicationDoses[index])
    }


    onClickedAddDose() {

        this.props.addMedicationDose(this.props.medicationId)
    }


    onChanged(event) {
        this.props.handleInputChange(event)
    }
 

    render () {
        return (

            <Card className="confirmMedsCardTableCard TableCard" style={{display: this.props.editMedicationCard ? "block" : "none"}}>
                <CardBody className="confirmMedsCardBody TableBody">
                    <CardTitle className="confirmMedsCardTitle Title">Review and Edit Selected Medication</CardTitle>
                    <br />

                    <p style={{fontWeight: "bold"}}>{this.props.medicationName} - {this.props.medicationType}
                        <span style={{float: "right"}}>
                            <Button size="sm" className="confirmMedsCardDelMedBtn" onClick={() => this.onClickedRemoveMedication()}>Delete medication</Button>
                        </span>
                     </p>

                    <div >
                        <br />
                    
                        <Table size="sm" className="confirmMedsCardTable Table">
                            <tbody>
                                    {this.props.medicationDoses.map( (dose, index) => {
                                        return (
                                            <tr key={index}> 
                                                <td width="10"></td>
                                                <td style={{verticalAlign: "middle"}}>Dose / form / route:</td>
                                                <td style={{verticalAlign: "middle"}}>{dose.dose}&nbsp;/&nbsp;{dose.form}&nbsp;/&nbsp;{dose.route}</td>
                                                <td>
                                                    <span style={{float: "right"}}>
                                                        <Button size="sm" className="confirmMedsCardDelDoseBtn" onClick={() => this.onClickedDeleteDose(index)}>Delete dose</Button>
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </Table>
                        
                        <hr style={{marginTop: -15}} />
                        <br />
                        <br />

                        <Table size="sm" className="confirmMedsCardTable " >
                            <tbody>
                                <tr >
                                    <td width="10"></td>
                                    <td style={{verticalAlign: "middle"}}>
                                        <label style={{marginTop: 16}}>Add new:</label></td>
                                    <td> 
                                            <Label style={{marginBottom: 2}}>Dose</Label>
                                            <Input 
                                                type="text" 
                                                name="med_dose" 
                                                placeholder="000mg/mg/mcg"
                                                onChange={(event) => this.onChanged(event)}  
                                                style={{width: 180}}
                                            />  
                                    </td>
                                    <td style={{verticalAlign: "middle"}}>
                                            <Label style={{marginBottom: 2}}>Formulation</Label>
                                            <Input 
                                                type="select" 
                                                name="med_form" 
                                                onChange={(event) => this.onChanged(event)}
                                                style={{width: 130}}
                                                >
                                                    <option>Select</option>
                                                    {formulationsList.map(item => (
                                                        <option key={item._id} value={item._id}>
                                                            {item}
                                                        </option>
                                                ))}
                                            </Input>
                                    </td>
                                    <td style={{verticalAlign: "middle"}}>
                                            <Label style={{marginBottom: 2}}>Route</Label>
                                            <Input 
                                                type="select" 
                                                name="med_route" 
                                                onChange={(event) => this.onChanged(event)}
                                                style={{width: 130}}
                                                >
                                                    <option>Select</option>
                                                    {routesList.map(item => (
                                                        <option key={item._id} value={item._id}>
                                                            {item}
                                                        </option>
                                                ))}
                                            </Input>
                                    </td>
                                    <td width="100"></td>
                                    <td style={{verticalAlign: "middle"}}>
                                        <Button size="sm" style={{float: "right", marginTop: 14}} className="confirmMedsCardAddDoseBtn" onClick={(_id) => this.onClickedAddDose(this.props._id)}>Add dose</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                        <hr style={{marginTop: -15}} />

                        <br />
                        
                        <a href="/admin">
                        <Button className="confirmMedsCardBackBtn BackBtn">Finish</Button></a>
                        <a href="/admin">
                            <Button className="updatePatCancelBtn CancelBtn">Cancel</Button></a>

                    </div>

                </CardBody>
            </Card>

        )
    }
}