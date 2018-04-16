import React from 'react';
import Select from 'react-select';
import {
    Label,
    Button, 
    Container, Row, Col
} from 'reactstrap';
import './PreviousMedication.css';

export default class PreviousMedication extends React.Component {
    constructor(props){
        super(props);
        this.state = ({
            patientLastEpisodeMedications : [],
            selectedPreviousDoses : [],
            medication : "",
            times : [],
            allMedications : [],
            allPreviousDoses : [],
            dosageValue : "",
            dosageLabel : ""
        })
    }
    componentDidMount(newProp){
        //first we need to assign doses value to the state
        if(this.props.medication !== "tbc"){
            const datavalue = this.props.allMedications.filter(x => x.name === this.props.medication)
            if(datavalue[0]){
                const labelvalue = datavalue[0].doses.filter(y => y.label === this.props.label)
                this.setState({
                    medication : this.props.medication,
                    times : this.props.times,
                    allMedications : this.props.allMedications,
                    allTime : this.props.allTime,
                    value: labelvalue[0] && labelvalue[0].value? labelvalue[0].value : 0,
                    label : this.props.label,
                    dose : this.props.dose,
                    form : this.props.form,
                    route : this.props.route,
                    patientLastEpisodeMedications: this.props.patientLastEpisodeMedications
                })
            }
            
        }
        
    }

    removeMedicine = (e) =>{
        e.preventDefault();
        let newPatientLastEpisodeMedications = this.state.patientLastEpisodeMedications;
        newPatientLastEpisodeMedications.map((med, index) =>{
            if(med.medication === this.state.medication){
                newPatientLastEpisodeMedications.splice(index, 1);
            }
        })
        
        this.setState({
            toRemove: this.props.medication,
            patientLastEpisodeMedications : newPatientLastEpisodeMedications
        });
        this.props.handleLastMedChange(newPatientLastEpisodeMedications);
    }
    editMedicine = (e) => {
        e.preventDefault();
        this.setState({
        })
    }
    handleDosage = (selectedOption) => {
        const itemToSplit = selectedOption.label.split('|') //dose form route
        this.setState({
            value : `${selectedOption.value}`,
            label: `${selectedOption.label}`,
            dose: itemToSplit[0],
            form: itemToSplit[1],
            route: itemToSplit[2]
        });
        let newMedList = this.state.patientLastEpisodeMedications;
        newMedList.map((x,index) =>{
            if(newMedList[index].medication === this.state.medication){
                newMedList[index].value = `${selectedOption.value}`;
                newMedList[index].label = `${selectedOption.label}`;
                newMedList[index].dose = itemToSplit[0];
                newMedList[index].form = itemToSplit[1];
                newMedList[index].route = itemToSplit[2];
            }
        })
        this.props.handleLastMedChange(newMedList);
        //this.props.handleDoseChange(`${selectedOption.label}`, this.state.medication, this.state.patientLastEpisodeMedications);
    }
    handlePreviousTimeChange = (selectedOption) => {
        const newSelectedOption = selectedOption
        this.setState({
            times : newSelectedOption
        })
        let newMedList = this.state.patientLastEpisodeMedications;
        newMedList.map((x, index) => {
            if (newMedList[index].medication === this.state.medication) {
                newMedList[index].times = newSelectedOption;
            }
        })
        this.props.handleLastMedChange(newMedList);
    }
    showState = () => {
        console.log("Show state: " , this.state);
    }
    renderState = (value, label) =>{
        this.setState({
            selectedValue : value,
            selectedLabel : label
        })
    }

    populateDropDown = (item) => {
        let ddlDosage = [];
        this.state.allMedications.map((med, index) =>{
            if(med.name === item){
                ddlDosage = med.doses;
            }
        } )
        return(ddlDosage)
    }


    render(){

            return(
                <Container>
                    <Row>
                        <Col size="md-4">
                            {this.state.medication} 
                        </Col>

                        <Col size="md-4">
                            <Label>Dose | Form | Route</Label>

                            <Select 
                                key = {this.state.medication}
                                name= {this.state.medication}
                                value = {this.state.value}
                                placeholder = 'previous medication doses'
                                onChange = {this.handleDosage}
                                options= {this.populateDropDown(this.state.medication)}
                            />
                        </Col>
                        <Col size="md-4">
                            <Label>Medication intake time:</Label>
                            <Select 
                                name= {`${this.state.medication}-times`}
                                value = {this.state.times}
                                placeholder = 'previous medication intake time'
                                onChange = {this.handlePreviousTimeChange}
                                options= {this.state.allTime}
                                multi= {true}
                            />
                        </Col>
                    </Row>
                        <br />
                        <Button color="danger" onClick={(e)=>this.removeMedicine(e)}>Remove Medication</Button>

                    <br /><br /><hr />
                </Container>
            
        )
        
    }
}