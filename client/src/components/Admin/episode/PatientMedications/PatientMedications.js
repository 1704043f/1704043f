import React from 'react';
import Select from 'react-select';
import medicationAPI from "../../../../utils/medicationAPI"
import 'react-select/dist/react-select.css';
import PreviousMedication from "../PreviousMedication"
import './PatientMedications.css';

import '../../../../pages/Admin';

import {
    Button, 
    Container, 
    Row, Col, 
    Card, 
    CardBody, 
    CardTitle, 
    CardText,
} from 'reactstrap';

let ddlSelectedDoses = [];
const ddlTime = [
    {value: '0000', label: '12:00am'},
    {value: '0100', label: '1:00am'},
    {value: '0200', label: '2:00am'},
    {value: '0300', label: '3:00am'},
    {value: '0400', label: '4:00am'},
    {value: '0500', label: '5:00am'},
    {value: '0600', label: '6:00am'},
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
    {value: '2300', label: '11:00pm'}
];

export default class PatientMedications extends React.Component {
    constructor(props){
        super(props);   
        this.state= {
            patientMedications : {},
            selectedOption : "",
            selectedTime : [],
            drugType: "",
            drugDoses: [],
            ddlSelectedDoses : [],
            ddlPreviousSelectedDoses : [],
            allMedications : [],
            allTime : ddlTime
        }

        
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

    handleChange = (item) => {
        this.setState({selectedOption: item.label},function(){
            this.setState({
                drugDoses : item.doses,
                drugType : item.type
            }, function(){
                ddlSelectedDoses = [];
                this.state.drugDoses?
                    this.state.drugDoses.map((x,index) => {
                        const objSelectedDoses = {
                            value: "",
                            label: ""
                        }
                        objSelectedDoses.label = `${x.dose} | ${x.form} | ${x.route}`;
                        objSelectedDoses.value = index;
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
        });
    }
    validateNewMed = (medication, dosage, times) =>{
        let valid = true;
        if(!medication || !dosage || !times){
            this.props.getBackMessage("Medication, dosage and times cannot be empty.");
            this.props.getBackMessageStatus("danger");
            valid = false;
        }
        this.state.patientLastEpisodeMedications.map((med) =>{
            if(med.medication === medication){
                this.props.getBackMessage(`${medication} has already been prescribed.`);
                this.props.getBackMessageStatus("danger");
                valid = false;
            }
        })
        if(valid){
            this.props.getBackMessage(null);
            this.props.getBackMessageStatus(null);
        }
        return valid
    }
    handleAddNewMed = () => {
        if(this.validateNewMed(this.state.selectedOption, this.state.selectedDosage, this.state.selectedTime)){
            const newPatientMedications = this.state.patientLastEpisodeMedications
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
            objNewMed.value = this.state.selectedDosage
            objNewMed.label = this.state.selectedDosageLabel
            this.props.medications.map((x) => {
                if(x.name === this.state.selectedOption){
                    objNewMed.dose = x.doses[this.state.selectedDosage].dose
                    objNewMed.form = x.doses[this.state.selectedDosage].form
                    objNewMed.route = x.doses[this.state.selectedDosage].route
                }
            })
            newPatientMedications.push(objNewMed);
            this.setState({
                patientLastEpisodeMedications : newPatientMedications
            })
        }
    }
    handleLastMedChange = (lastEpiMeds) =>{
        this.setState({
            patientLastEpisodeMedications : lastEpiMeds
        });
    }
    handleDoseChange = (dose, medName, lastEpiMeds) => {
        let newMedList = lastEpiMeds;
        newMedList.map( (x,index) => {
            if(x.name === medName){
                newMedList[index].item = dose;
            }
        });
        this.setState({
            patientLastEpisodeMedications: newMedList
        })
    }
    handleNextButton = () =>{
        this.props.handleMedCallback(this.state.patientLastEpisodeMedications);
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
                                <h5 className="currentMedTitle">Current Medication(s)</h5>
                                { this.state.patientLastEpisodeMedications ?
                                    this.state.patientLastEpisodeMedications.map((x, index) => 
                                        x.medication !=="tbc" ?
                                            <Container key={index}>
                                                <br />
                                                    <PreviousMedication 
                                                        patientLastEpisodeMedications={this.state.patientLastEpisodeMedications}
                                                        key = {index}
                                                        dose = {x.dose}
                                                        form = {x.form}
                                                        label = {x.label}
                                                        medication = {x.medication}
                                                        route = {x.route}
                                                        times = {x.times}
                                                        value= {x.value}
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

                                <h5 className="newMedTitle">New Medication(s)</h5>
                                <Container>
                                {this.props.medications ? 
                                    <Container>
                                    Medication: 
                                    <Select 
                                        name= "medication-name"
                                        placeholder = "new medication..."
                                        value = {this.state.selectedOption}
                                        onChange = {this.handleChange}
                                        options= {this.props.medications}
                                    />
                                    
                                    {
                                       this.state.drugDoses && this.state.drugDoses.length > 0 ? 
                                       <div>
                                            Type : {this.state.drugType}
                                            
                                            Dose :<br />
                                            <Select
                                                name = "new-med-dosage"
                                                value = {this.state.selectedDosage}
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
                                        value = {this.state.selectedTime}
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
                                <Button className="newMedNextBtn NextBtn" onClick={() => this.handleNextButton()}>Next</Button>
                                <a href={"/admin"}> 
                                <Button className="newMedCanelBtn CancelBtn">Cancel</Button></a> 

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}