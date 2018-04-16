import React from 'react';
import {
    Card, CardBody, CardTitle,
    Table,
} from 'reactstrap';
import './selectPatientCard.css';

import '../../../pages/Admin';



export default class SelectPatientCard extends React.Component {

    onClicked(id) {
        this.props.confirmPatient(id);
    }
    

    render () {
        return (

            <Card className="selectPatTableCard TableCard" style={{display: this.props.selectPatientCard ? "block" : "none"}}>
                <CardBody className="selectPatTableBody TableBody">
                    <CardTitle className="selectPatTitle Title">Select Patient</CardTitle>

                    <br />
                        {this.props.patientsLength ? (

                            <Table className="selectPatTable Table">

                                <tbody className="selectPatTBody">
                                    {this.props.patients.map(item => (
                                            <tr key={item._id} className="selectPatDetail" onClick={() => this.onClicked(item._id)}>
                                                    <td style={{width: 100}}>{item.details.patient_number}</td>
                                                    <td style={{width: 150}}>{item.details.first_name}&nbsp;{item.details.last_name}</td> 
                                            </tr>
                                    ))} 
                                </tbody>
                            </Table>

                        ) : (
                        <h3>No Results to Display</h3>
                        )}
                      
                </CardBody>
            </Card> 

        )
    }
}