import React from 'react';
import {
    Card, CardBody, CardTitle,
    Table,
    Form, FormGroup, Col, Input, Label
} from 'reactstrap';
import './selectPatientCard.css';
import '../../../pages/Admin';



export default class SelectPatientCard extends React.Component {

    state = {
        pt_numberselect: "",
        pt_nameselect: ""        
    }
    

    onClicked(id) {
        this.state.value = "";
        this.props.confirmPatient(id);
    }


    filterListByName(patient) {

        let str = "", nameA = "", nameB = "", nameInput = this.state.pt_nameselect;
        
        str = patient.first_name.toLowerCase().trim() + patient.last_name.toLowerCase().trim();

        if ( str.includes(nameInput.toLowerCase().trim() )) {return true} 

        if (nameInput.includes(" ")) {

            nameA = nameInput.slice(0, nameInput.indexOf(" ")).toLowerCase().trim()
            nameB = nameInput.slice(nameInput.indexOf(" ")).toLowerCase().trim()
            
            if (patient.first_name.toLowerCase().trim().includes(nameA) && (patient.last_name.toLowerCase().trim().includes(nameB))) {return true}
            if (patient.first_name.toLowerCase().trim().includes(nameB) && (patient.last_name.toLowerCase().trim().includes(nameA))) {return true}
        }

        if (nameInput.includes(",")) {

            nameA = nameInput.slice(0, nameInput.indexOf(",")).toLowerCase().trim().replace(/\W/g, "")
            nameB = nameInput.slice(nameInput.indexOf(",")+1).toLowerCase().trim().replace(/\W/g, "")

            if (patient.first_name.toLowerCase().trim().includes(nameA) && (patient.last_name.toLowerCase().trim().includes(nameB))) {return true}
            if (patient.first_name.toLowerCase().trim().includes(nameB) && (patient.last_name.toLowerCase().trim().includes(nameA))) {return true}
        } 

        return false
    } 


    filterListByNumber(patient) {
        let str = "";
        str = patient.patient_number.toLowerCase();
        if ( str.includes(this.state.pt_numberselect.toLowerCase().trim()) )  {return true} else {return false}
    }


    // Dynamic form input handlers
    onChanged = event => {
        const { name, value } = event.target;
        this.setState({
        [name]: value
        });
        //console.log(event.target.name + " " + event.target.value);
    };


    render () {
        return (

            <Card className="selectPatTableCard TableCard" style={{display: this.props.selectPatientCard ? "block" : "none"}}>
                <CardBody className="selectPatTableBody TableBody">
                    <CardTitle className="selectPatTitle Title">Select Patient</CardTitle>

                        <FormGroup row>
                           <Label sm={3} style={{fontWeight: "bold"}}>By name: </Label>
                           <Col sm={9}>
                               <Input 
                                   id="name"
                                   type="text"
                                   name="pt_nameselect"
                                   placeholder="Any format"
                                   value={this.state.value}
                                   onChange={(event) => this.onChanged(event)}  
                               />  
                           </Col>
                        </FormGroup> 

                        <FormGroup row>
                            <Label sm={3} style={{fontWeight: "bold"}}>By hospital number: </Label>
                            <Col sm={9}>
                                <Input 
                                    id="number"
                                    type="text"
                                    name="pt_numberselect"
                                    placeholder="H123456"
                                    value={this.state.value}
                                    onChange={(event) => this.onChanged(event)}  
                                />  
                            </Col>
                        </FormGroup> 

                    <span style={{fontWeight: "bold"}}>Then/or select from list below: </span>
                    <br />
                    <br />

                        {this.props.patientsLength ? (

                            <Table className="selectPatTable Table">

                                <tbody className="selectPatTBody">
                                    {this.props.patients.map(item => (

                                        this.filterListByNumber(item.details) && this.filterListByName(item.details) ? 
                                            <tr key={item._id} className="selectPatDetail" onClick={() => this.onClicked(item._id)}>
                                                    <td style={{width: 100}}>{item.details.patient_number}</td>
                                                    <td style={{width: 150}}>{item.details.first_name}&nbsp;{item.details.last_name}</td> 
                                            </tr>
                                         
                                        : 
                                            
                                        null 
                                                                                                                        
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