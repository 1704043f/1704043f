import React from 'react';
import Select from 'react-select';
import medicationAPI from "../../../../utils/medicationAPI"
import 'react-select/dist/react-select.css';
import PreviousMedication from "../PreviousMedication"
import './PatientMedications.css';
import Alert from 'react-s-alert';
import '../../../../pages/Admin';

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
        allTime : ddlTime
    }
    componentWillReceiveProps(newProp){
        this.setState({
            selectedPreviousDoses : this.props.medication,
            medication : this.props.medication,
            allMedications : this.props.allMedications,
            patientLastEpisodeMedications : this.props.patientLastEpisodeMedications
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
                drugType : item.type
            }, function(){
                console.log(this.state);
                ddlSelectedDoses = [];
                this.state.drugDoses?
                    this.state.drugDoses.map((x,index) => {
                        const objSelectedDoses = {
                            value: "",
                            label: ""
                        }
                        objSelectedDoses.label = `${x.dose} | ${x.form} | ${x.route}`;
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
            selectedOption: `${selectedOption.label}`
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
            console.log(this.state);
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
            if(med.medication === medication){
                Alert.error(`${medication} has already been prescribed.`, {
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
                selectedDosageLabel : ''
            })
        }
    }
    handleLastMedChange = (lastEpiMeds) =>{
        this.props.handleMedCallback(lastEpiMeds);
    }
    handleDoseChange = (dose, medName, lastEpiMeds) => {
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

    render () {

        return (
            <Container fluid>
                <Row>
                    <Col className='md-12'>
                        <Card className="patMedTableCard TableCard" style={{display: this.props.addEpisodeMedicationsCard ? "block" : "none"}}>
                            <CardBody className="patMedTableBody TableBody">
                                <CardTitle className="patMedTitle Title">Enter Patient Medications</CardTitle>
                            
                                <CardText>
                                    Enter each Parkinsons medication with doses, and times that the patient will take during the next episode.
                                </CardText>
                                <h4 className="currentMedTitle">Current Medication(s)</h4>
                                    <Container>
                                        <Row>
                                            <Col size='md-3'><Label><b>Medication</b></Label></Col>
                                            <Col size='md-3'><Label><b>Dose | Form | Route</b></Label></Col>
                                            <Col size='md-3'><Label><b>Suggested intake time:</b></Label></Col>
                                            <Col size='md-3'></Col>
                                        </Row>
                                    </Container>
                                
                                { this.props.patientLastEpisodeMedications ?
                                    
                                    this.props.patientLastEpisodeMedications.map((x, index) => 
                                        x.medication !=="tbc" ?
                                            <Container key={index}>
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
                                                        value= {x["value"]}
                                                        handleNewChange = {this.handleNewChange}
                                                        ddlDosage = {this.props.medications}
                                                        handlePreviousTimeChange = {this.handlePreviousTimeChange}
                                                        handleDosage = {this.handleDosage}
                                                        allTime = {ddlTime}
                                                        allMedications = {this.props.medications}
                                                        handleDoseChange={this.handleDoseChange}
                                                        handleLastMedChange={this.handleLastMedChange}
                                                    />                         
                                            </Container>
                                        :
                                            null
                                    )
                                    : null
                                }

                                <h4 className="newMedTitle">New Medication(s)</h4>
                                <Container>
                                {this.props.medications ? 
                                    <Container>
                                    Medication: 
                                    <Select 
                                        name= "medication-name"
                                        placeholder = "new medication..."
                                        value={this.state.selectedOption}
                                        onChange = {this.handleMedicationChange}
                                        options={this.props.medications}
                                    />
                                    
                                    {
                                        this.state.drugDoses && this.state.drugDoses.length > 0 ? 
                                        <div>
                                            Type : {this.state.drugType}
                                            
                                            Dose :<br />
                                            <Select
                                                name = "new-med-dosage"
                                                value={this.state.selectedDosage}
                                                placeholder = 'medication dosage'
                                                onChange = {this.handleDosage}
                                                options = {ddlSelectedDoses}
                                            />
                                        </div>
                                        : null 
                                    }
                                    Medication intake time:
                                    <Select 
                                        name= "medication-intake-time"
                                        value={this.state.selectedTime}
                                        placeholder = 'medication intake time'
                                        onChange = {this.handleTimeChange}
                                        options= {ddlTime}
                                        multi= {true}
                                    />
                                    <br /> 
                                    <Button className="addMedBtn" color="success" onClick={this.handleAddNewMed}>Add Medication</Button>
                                    </Container>
                                    : null}
                                </Container>
                                <br /><br />
                                <Button className="bttn newMedNextBtn NextBtn" onClick={() => this.handleNextButton()}>Next</Button>
                                <a href={"/admin"}> 
                                <Button className="bttn newMedCanelBtn CancelBtn">Cancel</Button></a> 

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}