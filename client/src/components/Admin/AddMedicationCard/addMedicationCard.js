import React from 'react';

import {
    Col,
    FormGroup, Input, Label,
    Card, CardBody, CardTitle, 
    Table,
    Button, 
} from 'reactstrap';
import '../../../pages/Admin';

const formulationsList = ["tablet", "capsule", "syrup", "liquid", "suspension", "injection", "infusion", "patch", "cassette"];
const routesList = ["oral", "buccal", "sub-lingual", "enteral", "sub-cut", "intravenous", "transdermal"];
const typesList = ["Dopamine agonist", "anticholinergic", "MAO-B inhibitor", "Anticholinesterase", "NMDA Antagonist", "COMT inhibitor", "other", "trial drug"]

export default class addMedicationCard extends React.Component {

    state = {
        doses: [],
    }

    onClickedConfirmMedication() {
        this.props.confirmNewMedication()
    }

    onClickedAddDose() {
        this.props.addNewMedicationDose()
    }

    onClickedDeleteDose(index) {
        console.log(index)
        this.props.deleteNewMedicationDose(index)
    }


    onChanged(event) {
        this.props.handleInputChange(event)
    }
 

    render () {
        return (

            <Card className="confirmMedsCardTableCard TableCard" style={{display: this.props.addMedicationCard ? "block" : "none"}}>
                <CardBody className="confirmMedsCardBody TableBody">
                    <CardTitle className="confirmMedsCardTitle Title">Add New Medication</CardTitle>
                    <br />

                        <FormGroup row>
                            <Label sm={3}>Name:</Label>
                            <Col sm={9}>
                                <Input
                                    placeholder = {"Tradename (generic name)"}
                                    name = {"med_name"}
                                    onChange = {(event) => this.onChanged(event)}
                                    style={{width: 380}}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label sm={3}>Type/class</Label>
                            <Col sm={9}>
                                <Input 
                                    type="select" 
                                    name="med_type" 
                                    onChange={(event) => this.onChanged(event)}
                                    style={{width: 380}}
                                    >
                                        <option>Select</option>
                                        {typesList.map(item => (
                                            <option key={item._id} value={item._id}>
                                                {item}
                                            </option>
                                    ))}
                                </Input>
                            </Col>
                        </FormGroup>

                        {this.props.newMedicationDoses ? 

                            <Table size="sm" className="confirmMedsCardTable Table">
                                <tbody>
                                        {this.props.newMedicationDoses.map( (dose, index) => {
                                            return (
                                                <tr key={index}> 
                                                    <td width="10"></td>
                                                    <td style={{verticalAlign: "middle"}}>Dose / form / route:</td>
                                                    <td style={{verticalAlign: "middle"}}>{dose.dose}&nbsp;/&nbsp;{dose.form}&nbsp;/&nbsp;{dose.route}</td>
                                                    <td>
                                                        <span style={{float: "right"}}>
                                                            <Button size="sm" className="confirmMedsCardDelDoseBtn bttn" onClick={() => this.onClickedDeleteDose(index)}>Delete dose</Button>
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </Table>

                        :

                            null
                        }

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
                                    <td width="88"></td>
                                    <td style={{verticalAlign: "middle"}}>
                                        <Button size="sm" style={{float: "right", marginTop: 14}} className="bttn confirmMedsCardAddDoseBtn" onClick={() => this.onClickedAddDose()}>Add dose</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                        <hr style={{marginTop: -15}} />

                        <br />
                        
                        <Button className="bttn confirmMedsCardBackBtn BackBtn" onClick={() => this.onClickedConfirmMedication()}>Finish</Button>
                        <a href="/admin">
                            <Button className="bttn updatePatCancelBtn CancelBtn">Cancel</Button></a>

                </CardBody>
            </Card>

        )
    }
}        