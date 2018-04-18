import React from 'react';

import {
    Table,
    Card, CardBody, CardTitle, 
    Button, 
} from 'reactstrap';
import '../../../pages/Admin';

export default class confirmAddMedicationCard extends React.Component {

    onClickedAddMedication() {
        this.props.addNewMedication()
    }

    render () {
        return (

            <Card className="confirmMedsCardTableCard TableCard" style={{display: this.props.confirmAddMedicationCard ? "block" : "none"}}>
                <CardBody className="confirmMedsCardBody TableBody">
                    <CardTitle className="confirmMedsCardTitle Title">Add New Medication</CardTitle>
                    <br />

                    <p>Review new medication details and click Confirm to save. Click Back to correct details without saving.</p>

                    <Table>
                        <tr>
                            <td>Name: </td><td>{this.props.newMedicationName}</td>
                        </tr><tr>
                            <td>Type: </td><td>{this.props.newMedicationType}</td>
                        </tr>
                        
                             {this.props.newMedicationDoses ? 
                               
                                this.props.newMedicationDoses.map( (dose, index) => {
                                    return (
                                        <tr>
                                            <td><span style={{display: !index ? "block" : "none"}}>Dose / form / routes:</span></td> 
                                            <td key={index} style={{verticalAlign: "middle"}}>
                                                {dose.dose.toLowerCase()}&nbsp;/&nbsp;{dose.form}&nbsp;/&nbsp;{dose.route}
                                            </td>
                                        </tr>
                                    )
                                })
                            : 
                            null
                            }

                    </Table>
                        
                    <br />

                    <Button className="confirmMedsCardBackBtn BackBtn" onClick={() => this.onClickedAddMedication()}>Confirm & Save</Button>

                    <a href="/admin">
                    <Button className="confirmMedsCardBackBtn BackBtn">Back</Button></a>

                    
                </CardBody>
            </Card>

        )
    }
}        