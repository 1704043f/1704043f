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
            console.log(this.props);
            console.log("this props medication : " , this.props.medication);
            console.log("All medications : " , this.props.allMedications)
            const datavalue = this.props.allMedications.filter(x => x.name === this.props.medication)
            console.log("data value : " , datavalue);
            if(datavalue[0]){
                console.log("data value[0] : ", datavalue[0]);
                const labelvalue = datavalue[0].doses.filter(y => y.label === this.props.label)
                console.log("label of value : " , labelvalue);
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
        let newPatientLastEpisodeMedications = this.props.patientLastEpisodeMedications;
        console.log("this props medication : ", this.props.medication);
        console.log("On remove : " , newPatientLastEpisodeMedications);
        newPatientLastEpisodeMedications.map((med, index) =>{
            if(med.medication === this.props.medication){
                newPatientLastEpisodeMedications.splice(index, 1);
            }
        })
        console.log(newPatientLastEpisodeMedications);
        this.setState({
            toRemove: this.props.medication,
            patientLastEpisodeMedications : newPatientLastEpisodeMedications
        },function(){
            this.props.handleLastMedChange(newPatientLastEpisodeMedications);
            console.log(this.state);
        });
        
    }
    editMedicine = (e) => {
        e.preventDefault();
        this.setState({
        })
    }
    handleDosage = (selectedOption) => {
        const itemToSplit = selectedOption.label.split('|') //dose form route
        console.log(itemToSplit);
        console.log(selectedOption.value);
        console.log(selectedOption.label);
        this.setState({
            value : `${selectedOption.value}`,
            label: `${selectedOption.label}`,
            dose: itemToSplit[0],
            form: itemToSplit[1],
            route: itemToSplit[2]
        }, function(){
            let newMedList = this.props.patientLastEpisodeMedications;
            console.log("New med list : ", newMedList)
            newMedList.map((x, index) => {
                console.log("NewMedList[index]", newMedList[index]);
                console.log("This props of medication : ", this.props.medication);
                if (newMedList[index].medication === this.props.medication) {
                    newMedList[index].value = `${selectedOption.value}`;
                    newMedList[index].label = `${selectedOption.label}`;
                    newMedList[index].dose = itemToSplit[0];
                    newMedList[index].form = itemToSplit[1];
                    newMedList[index].route = itemToSplit[2];
                }
            })
            console.log(newMedList);
            this.props.handleLastMedChange(newMedList);
        //this.props.handleDoseChange(`${selectedOption.label}`, this.state.medication, this.state.patientLastEpisodeMedications);
        });
        
    }
    handlePreviousTimeChange = (selectedOption) => {
        const newSelectedOption = selectedOption
        this.setState({
            times : newSelectedOption
        })
        let newMedList = this.props.patientLastEpisodeMedications;
        newMedList.map((x, index) => {
            if (newMedList[index].medication === this.props.medication) {
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
        this.props.allMedications.map((med, index) =>{
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
                            {this.props.medication} 
                        </Col>

                        <Col size="md-4">
                            <Label>Dose | Form | Route</Label>
                            
                            <Select 
                                key = {this.props.medication}
                                name= {this.props.medication}
                                value = {this.state.value? this.state.value : this.props.value}
                                placeholder = 'previous medication dose'
                                onChange = {this.handleDosage}
                                options= {this.populateDropDown(this.props.medication)}
                            />

                        </Col>
                        <Col size="md-4">
                            <Label>Medication intake time:</Label>
                            <Select 
                                name= {`${this.props.medication}-times`}
                                value = {this.props.times}
                                placeholder = 'previous medication intake time'
                                onChange = {this.handlePreviousTimeChange}
                                options= {this.props.allTime}
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