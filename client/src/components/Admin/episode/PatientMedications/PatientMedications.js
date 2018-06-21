import React from 'react';
import Select from 'react-select';
import medicationAPI from "../../../../utils/medicationAPI"
import PreviousMedication from "../PreviousMedication"
import Alert from 'react-s-alert';
import {
    Button, 
    Container, 
    Row, Col, 
    Card, 
    CardBody, 
    CardTitle, 
    CardText,
    Label
} from 'reactstrap';

import './PatientMedications.css';
import 'react-select/dist/react-select.css';
import '../../../../pages/Admin';

let ddlSelectedDoses = [];
const ddlTime = [
    {value: '0700', label: '7:00am'},
    {value: '0800', label: '8:00am'},
    {value: '0900', label: '9:00am'},
    {value: '1000', label: '10:00am'},
    {value: '1100', label: '11:00am'},
    {value: '1200', label: '12:00pm'},
    {value: '1300', label: '1:00pm'},
    {value: '1400', label: '2:00pm'},
    {value: '1500', label: '3:00pm'},
    {value: '1600', label: '4:00pm'},
    {value: '1700', label: '5:00pm'},
    {value: '1800', label: '6:00pm'},
    {value: '1900', label: '7:00pm'},
    {value: '2000', label: '8:00pm'},
    {value: '2100', label: '9:00pm'},
    {value: '2200', label: '10:00pm'},
    {value: '2300', label: '11:00pm'},
    {value: '0000', label: '12:00am'},
    {value: '0100', label: '1:00am' },
    {value: '0200', label: '2:00am' },
    {value: '0300', label: '3:00am' },
    {value: '0400', label: '4:00am' },
    {value: '0500', label: '5:00am' },
    {value: '0600', label: '6:00am' },
];



export default class PatientMedications extends React.Component {
    
    state= {
        patientMedications : {},
        selectedOption : "",
        selectedTime : [],
        drugType: "",
        drugDoses: [],
        ddlSelectedDoses : [],
        ddlPreviousSelectedDoses : [],
        allMedications : this.props.medications,
        allTime : ddlTime,
        changesMade : false
    }


    componentWillReceiveProps(newProp){
        this.setState({
            selectedPreviousDoses : this.props.medication,
            medication : this.props.medication,
            allMedications : this.props.allMedications,
            patientLastEpisodeMedications : this.props.patientLastEpisodeMedications,
            patientLastEpisodeMedicationsCopy : this.props.patientLastEpisodeMedications,
         })
    }


    onGenerateMedications= () => {
        console.log("this patient previous med: " , this.props.patientLastEpisodeMedications);
        console.log("all meds : ", this.props.medications);
        console.log("patient medication's state : ", this.state);
    }


    populateDoses = (item) => {
        medicationAPI
            .findOne(item)
            .then(med => {
                return med.data;
            })
            .catch(err => {
                console.log(err);
            })

    }


    /*
        Change medication value
    */
    handleMedicationChange = (item) => {
        this.setState({selectedOption: item.label},function(){
            this.setState({
                drugDoses : item.doses,
                drugType : item.type,
                chnagesMade : true
            }, function(){
                console.log(this.state);
                ddlSelectedDoses = [];
                this.state.drugDoses?
                    this.state.drugDoses.map((x,index) => {
                        const objSelectedDoses = {
                            value: "",
                            label: ""
                        }
                        objSelectedDoses.label = `${x.dose} ${x.route} ${x.form}  `;
                        objSelectedDoses.value = x.value;
                        console.log(objSelectedDoses);
                        ddlSelectedDoses.push(objSelectedDoses);
                        this.setState({ddlSelectedDoses})
                    })
                : null
            })
            
        });
        
    }


    handleNewChange = (selectedOption) => {
        this.setState({
            selectedOption: `${selectedOption.label}`,
            changesMade : true
        });
    }


    handleTimeChange = (selectedOption) => {
        this.setState({ selectedTime : selectedOption });
    }


    handlePreviousTimeChange = (selectedOption) => {
        this.setState({ selectedTime : selectedOption });
    }


    handleDosage = (selectedOption) =>{
        this.setState({ 
            selectedDosage : `${selectedOption.value}`,
            selectedDosageLabel : `${selectedOption.label}`
        }, function(){
            console.log(this.state.selectedDosageLabel);
        });
    }


    validateNewMed = (medication, dosage, times) =>{
        let valid = true;
        if(!medication || !dosage || !times){
            Alert.error('Medication, dosage and times cannot be empty.', {
                position : 'top',
                effect: 'stackslide',
            });
            valid = false;
        }
        this.props.patientLastEpisodeMedications.map((med) =>{
            if(med.medication === medication && med.label === this.state.selectedDosageLabel){
                Alert.error(`${medication} with dose ${this.state.selectedDosageLabel} has already been prescribed. If you wish to change the dose timings then simply update the existing prescription with the new times.`, {
                    position : 'top',
                    effect: 'stackslide',
                });
                
                valid = false;
            }
        })
        return valid
    }


    handleAddNewMed = () => {
        if(this.validateNewMed(this.state.selectedOption, this.state.selectedDosage, this.state.selectedTime)){
            const newPatientMedications = this.props.patientLastEpisodeMedications
            const objNewMed = {
                medication : "",
                dose : "",
                form : "",
                route : "",
                times : [],
                label : [],
                value : ""
            }
            objNewMed.medication = this.state.selectedOption
            objNewMed.times = this.state.selectedTime
            objNewMed.value = parseInt(this.state.selectedDosage)
            objNewMed.label = this.state.selectedDosageLabel
            console.log(objNewMed);
            this.props.medications.map((x) => {
                if(x.name === this.state.selectedOption){
                    objNewMed.dose = x.doses[this.state.selectedDosage].dose
                    objNewMed.form = x.doses[this.state.selectedDosage].form
                    objNewMed.route = x.doses[this.state.selectedDosage].route
                }
            })
            console.log("obj new med : " , objNewMed);
            newPatientMedications.push(objNewMed);
            this.props.handleMedCallback(newPatientMedications);
            console.log(newPatientMedications);
            this.setState({
                selectedOption : '',
                selectedTime : [],
                selectedDosage : '',
                selectedDosageLabel : '',
                drugType : "",
                drugDoses : [],
                changesMade: true

            })
        }
    }


    handleCancelNewMed = () => {
        this.setState({
            drugDoses : [],
            selectedOption : ''
        })
    }


    handleLastMedChange = (lastEpiMeds) =>{
        this.setState({changesMade: true})
        this.props.handleMedCallback(lastEpiMeds);
    }


    handleDoseChange = (dose, medName, lastEpiMeds) => {
        this.setState({changesMade: true})
        let newMedList = lastEpiMeds;
        console.log("Dose :", dose);
        console.log("Med name :", medName);
        newMedList.map( (x,index) => {
            if(x.name === medName){
                newMedList[index].item = dose;
            }
        });
        this.props.handleMedCallback(newMedList);
    }


    handleNextButton = () =>{
        this.props.handleMedCallback(this.props.patientLastEpisodeMedications);
        this.props.enterNextAppointment();
    }

    handleCancelChangesButton = () => {
        this.setState({changesMade : false})
        this.props.handleMedCallback(this.state.patientLastEpisodeMedicationsCopy);
    }



    render () {

        return (
            <div>
             
                        <Card className="TableCard" style={{display: this.props.addEpisodeMedicationsCard ? "block" : "none"}}>
                            <CardBody>

                                <CardTitle className="TableTitle">Create New Episode</CardTitle>
                            
                                <CardText>
                                    <br />
                                    Please review and update patient medications with any changes for the new episode. You may update the dose/route/formulation and the times each medication is taken or add and remove entire medications. Click 'Next' when you have made all required changes. If there are no changes to the patient's medications for the upcoming episode, you can click 'No changes' to go straight to the next screen.
                                    <br />
                                </CardText>

                                <br />
                                <h4 className="currentMedTitle">Current Medication(s)</h4>
                                <br />
                                
                                <Container>

                                    <table>
                                        <tr>
                                            <th width="275px"><Label><b>Medication</b></Label></th>
                                            <th width="25px"></th>
                                            <th width="350px"><Label><b>Edit dose, route and form</b></Label></th>
                                            <th width="25px"></th>
                                            <th width="400px"><Label><b>Edit times</b></Label></th>
                                            <th width="25px"></th>
                                            <th width="100px"></th>
                                        </tr>

                                        { 
                                            this.props.patientLastEpisodeMedications ?

                                                this.props.patientLastEpisodeMedications.map((x, index) => 
                                               
                                                    x.medication !=="tbc" ?
                                                        <tbody key={index}>
                                                            <br />
                                                                <PreviousMedication 
                                                                    patientLastEpisodeMedications={this.props.patientLastEpisodeMedications}
                                                                    key = {index}
                                                                    dose = {x.dose}
                                                                    form = {x.form}
                                                                    label = {x.label}
                                                                    medication = {x.medication}
                                                                    route = {x.route}
                                                                    times = {x.times}
                                                                    value = {x["value"]}
                                                                    handleNewChange = {this.handleNewChange}
                                                                    ddlDosage = {this.props.medications}
                                                                    handlePreviousTimeChange = {this.handlePreviousTimeChange}
                                                                    handleDosage = {this.handleDosage}
                                                                    allTime = {ddlTime}
                                                                    allMedications = {this.props.medications}
                                                                    handleDoseChange = {this.handleDoseChange}
                                                                    handleLastMedChange = {this.handleLastMedChange}
                                                                />                         
                                                        </tbody>
                                                    :
                                                        <td colspan="7">
                                                        <br />
                                                        This patient does not have any medications recorded yet. Start by adding each of their current medications below.
                                                        </td>
                                                )
                                            : 

                                                <td colspan="7">
                                                    <br />
                                                    This patient does not have any medications recorded yet. Start by adding each of their current medications below.
                                                </td>
                                        }

                                    </table>

                                </Container>

                                <br />
                                <br />
                                <h4>Add New Medication(s)</h4>
                                <br />

                                <Container>
                                    {this.props.medications ?   
                                    
                                        <div>

                                            {this.state.drugDoses && this.state.drugDoses.length > 0  ? null : 

                                                <div style={{width: 500}}>
                                                    <Select 
                                                        name= "medication-name"
                                                        placeholder = "new medication..."
                                                        value={this.state.selectedOption}
                                                        onChange = {this.handleMedicationChange}
                                                        options={this.props.medications}
                                                    />
                                                </div>

                                            }
                                            
                                            {
                                                this.state.drugDoses && this.state.drugDoses.length > 0 ? 

                                                    <div>

                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td width="275px"><Label><b>{this.state.selectedOption}</b></Label></td>
                                                                    <td width="25px"></td>
                                                                    <td width="350px">
                                                                        <Select
                                                                            name = "new-med-dosage"
                                                                            value={this.state.selectedDosage}
                                                                            placeholder = 'dose route form'
                                                                            onChange = {this.handleDosage}
                                                                            options = {ddlSelectedDoses}
                                                                         />
                                                                    </td>
                                                                    <td width="25px"></td>
                                                                    <td width="330px">
                                                                        <Select 
                                                                            name= "medication-intake-time"
                                                                            value={this.state.selectedTime}
                                                                            placeholder = 'times'
                                                                            onChange = {this.handleTimeChange}
                                                                            options= {ddlTime}
                                                                            multi= {true}
                                                                        /> 
                                                                    </td>
                                                                    <td width="25px"></td>
                                                                    <td width="175px" align="right" padding-right="none">
                                                                        <Button size="sm" color="success" style={{marginRight: 10}} onClick={this.handleAddNewMed}>Add</Button>
                                                                        <Button size="sm" color="secondary" onClick={this.handleCancelNewMed}>Cancel</Button>
                                                                       
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                
                                                    </div>
                                                : null 
                                            }
                                          
                                        </div>

                                        : null
                                    }

                                </Container>

                                <br />
                                <hr />
                        
                                    <a href={"/admin"}><Button color='secondary' className="admin-btn right-align">Back</Button></a>     
                                    
                                    { this.state.changesMade ? 
                                        <div>
                                             <Button className="admin-btn right-align" onClick={() => this.handleCancelChangesButton()}>Erase Changes</Button> 
                                             <Button color='success' className="admin-btn right-align" onClick={() => this.handleNextButton()}>Submit Changes</Button> 
                                           
                                        </div>
                                        : 
                                        <Button color='success' className="admin-btn right-align" onClick={() => this.handleNextButton()}>No changes</Button>
                                    }
                                    
                            </CardBody>
                        </Card>
            </div>
        )
    }
}