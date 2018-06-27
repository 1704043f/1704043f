import React from 'react';
import medicationAPI from "../../../utils/medicationAPI";
import {
    Card, 
    CardBody, 
    CardTitle, 
    Table
} from 'reactstrap';

import '../../../pages/Admin';


export default class SelectMedicationCard extends React.Component {

    state  = {
        medications: [],
        medicationsLength: 0,
    }

    componentDidMount() {
        this.loadData(); 
    };



    loadData = () => {
        medicationAPI.findAll({})
        .then(res => {
            this.setState({ medications: res.data });
            this.setState({ medicationsLength: this.state.medications.length })
        })
    .catch(err => console.log(err))
    };


    onClicked(id) {
        console.log(id);
        this.props.editMedication(id);
     }
    

    render () {
        return (

            <Card className="TableCard" style={{display: this.props.selectMedicationCard ? "block" : "none"}}>
                <CardBody>
                    <CardTitle className="TableTitle">Select Medication</CardTitle>

                    <br />
                        {this.state.medicationsLength ? (

                            <Table size="sm" className="TableText">
                                <tbody>
                                    {this.state.medications.map(med => (
                                            <tr key={med._id} className="TableHover"  onClick={() => this.onClicked(med._id)}>
                                                <td style={{width: 200}}>{med.name}</td>
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