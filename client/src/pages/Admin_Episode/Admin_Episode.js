import React, { Component } from "react";
// import Header from "../../components/Header";
import PatientDetails from "../../components/Admin/episode/PatientDetails"
import PatientMedications from "../../components/Admin/episode/PatientMedications"
import PatientNextAppointment from "../../components/Admin/episode/PatientNextAppointment"
import PatientConfirmEpisode from "../../components/Admin/episode/ConfirmEpisode" 
import PatientSuccessEpisode from "../../components/Admin/episode/SuccessEpisode" 
import '../Admin/Admin.css';
import patientAPI from "../../utils/patientAPI";
import moment from 'moment';
import medicationAPI from "../../utils/medicationAPI";
import {
    Container, Row, Col, 
} from 'reactstrap';

class Admin_Episode extends Component {
    state = { 
        patientId: "",

        patientDetailsCard: true,
        addEpisodeMedicationsCard: false,
        addNextAppointmentCard: false,
        successEpisodeCard: false,
        submitEpisodeCard: false,

        patients: [],
        patient: {},
        patientDoctor: [],
        patientDetails: [],
        patientAppointment: [],
        patientEpisodes: [],
        patientEpisodesStart: [],
        patientEpisodesMedications: [],

        medications : [],
        newEpisode: [],
        newAppt : []
    };
    
    componentDidMount() {
        this.loadPatient()
    };

handleLoadPatient = (e) => {
    e.preventDefault();

    this.loadPatient();
}
loadPatient = () => {
    // find patient data by id for Admin 
    patientAPI.findPatientInfoForAdmin(window.location.search.substring(4))
        .then(res => {
            let objMedication = {};
            objMedication = res.data
            res.data.episode.map((epi, epi_index) => {
                epi.medications.map((med, med_index) =>{
                     objMedication.episode[epi_index].medications[med_index].label = `${med.dose} | ${med.form} | ${med.route}`
                        objMedication.episode[epi_index].medications[med_index].value = med_index
                    
                })
            })
            this.setState({patientId : res.data._id})
            this.setState({patient: res.data});
            this.setState({patientDoctor: this.state.patient.doctor})
            this.setState({patientDetails: this.state.patient.details})
            this.setState({patientAppointment: this.state.patient.appointment})
            this.setState({patientEpisodes: this.state.patient.episode})
            this.setState({patientLastEpisode: this.state.patientEpisodes[this.state.patientEpisodes.length-1] })
            this.setState({patientEpisodesStart: this.state.patientLastEpisode.start_date})
            this.setState({patientLastEpisodeMedications: this.state.patientLastEpisode.medications})
            this.loadMedication()
        })
        .catch(err => console.log(err));
};
loadMedication = () => {
    medicationAPI.findAll()
    .then(res => {
        let objMedication = {}
        objMedication = res.data
        res.data.map((x,index)=>{
            objMedication[index].label = `${x.name}`
            objMedication[index].value = `${x.name}`
            x.doses.map((item,index2) =>{
                objMedication[index].doses[index2].label = `${item.dose} | ${item.form} | ${item.route}`
                objMedication[index].doses[index2].value = index2
            })
        })
        this.setState({
            medications: objMedication
        })
    })
    .catch(err => console.log(err));
}

enterEpisodeMedications = () => {
    this.setState({patientDetailsCard: false})
    this.setState({addEpisodeMedicationsCard: true});
}

enterNextAppointment = () => {
    this.setState({addEpisodeMedicationsCard: false});
    this.setState({addNextAppointmentCard: true})
}

confirmNewEpisodeDetails = () => {
    this.setState({confirmNewEpisodeDetailsCard: true})
    this.setState({patientDetailsCard: false});
    this.setState({addNextAppointmentCard: false})
    this.setState({addEpisodeMedicationsCard: false});
}

createNewEpisode= () => {
    // constructnewEpisode object and API call
    this.setState({confirmNewEpisodeDetailsCard: false})
    this.setState({successEpisodeCreatedCard: true})

    //send email, save data to database, and prompt success message
    this.prepDataToSave();
    

}

handleMedCallback = (lastEpiMeds) => {
    let newEpiMeds = [];
    for(let i=0 ; i< lastEpiMeds.length; i++){
        if(lastEpiMeds[i].medication !=='tbc'){
            newEpiMeds.push(lastEpiMeds[i]);
        }
    }
    this.setState({
        newEpisode: newEpiMeds
    });
}

handleApptCallback = (appt) =>{
    this.setState({
        newAppt: appt
    });
}

prepDataToSave = () =>{
    this.setState({
        newObj: this.state.newEpisode
    }, function () {
        let objToSubmit = {
            episode_id: "001",
            doctor: "",
            start_date: Date(),
            medications: []
        }
        objToSubmit.doctor = this.state.patient.episode[0].doctor
        objToSubmit.medications = this.state.newObj

        for (let i = 0; i < this.state.newObj.length; i++) {
            for (let j = 0; j < this.state.newObj[i].times.length; j++) {
                if (this.state.newObj[i].times[j].value) {
                    objToSubmit.medications[i].times.push(this.state.newObj[i].times[j].value);
                }
            }
        }
        for (let i = 0; i < objToSubmit.medications.length; i++) {
            for (let j = 0; j < objToSubmit.medications[i].times.length; j++) {
                let itemLength = objToSubmit.medications[i].times.length
                while (itemLength--) {
                    if (this.state.newObj[i].times[itemLength].value) {
                        objToSubmit.medications[i].times.splice(itemLength, 1);
                    }
                }
            }
        }
        patientAPI.createNewEpisode(window.location.search.substring(4),
            objToSubmit)
            .then(res => {
                let objAppointment = {
                    next_appt: moment(this.state.newAppt.next_appt, "dddd, MMMM Do YYYY h:mm a").format(),
                    comments: this.state.pt_nextApptComment 
                }
                patientAPI.updateAppointment(window.location.search.substring(4), 
                    objAppointment)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    )
}

populateState = () =>{
    this.setState({
        newObj : this.state.newEpisode
    }, function(){
            let objToSubmit = {
                episode_id: "001",
                doctor: "",
                medication: [
                ]
            }
    objToSubmit.doctor = this.state.patient.episode[0].doctor
    objToSubmit.medication = this.state.newObj
    
    for(let i = 0; i < this.state.newObj.length ; i++){
        for(let j =0; j < this.state.newObj[i].times.length; j++){
            if(this.state.newObj[i].times[j].value){
                objToSubmit.medication[i].times.push(this.state.newObj[i].times[j].value);
            }
        }
    }
        for (let i = 0; i < objToSubmit.medication.length; i++){
            for (let j = 0; j < objToSubmit.medication[i].times.length; j++) {
                let itemLength = objToSubmit.medication[i].times.length
                while (itemLength--){
                    if (this.state.newObj[i].times[itemLength].value) {
                        objToSubmit.medication[i].times.splice(itemLength, 1);
                    }
                }
            }
        }
    }
     
)  
}
    render() {
        return (
            <div>
                <Container fluid>
                    <Container className="clearfix">
                            <br />
                            <span  style={{fontWeight: "bold", float: "left"}}>Physician: Dr Rolando Soandso</span>
                            <span  style={{fontWeight: "bold", float: "right"}}>Monday 3rd Jun 2018</span>
                    </Container>
                    <br />
                    <Container>
                        <Row>
                            <Col size="md-12">
                                <PatientDetails 
                                    patientDetailsCard = {this.state.patientDetailsCard}
                                    patient_number = {this.state.patientDetails.patient_number}
                                    first_name = {this.state.patientDetails.first_name}
                                    last_name = {this.state.patientDetails.last_name}
                                    dob = {this.state.patientDetails.dob}
                                    date_created = {this.state.patient.date_created}
                                    active = {this.state.patient.active}
                                    email = {this.state.patientDetails.email}
                                    phone = {this.state.patientDetails.phone}
                                    length = {this.state.patientEpisodes.length}
                                    patientEpisodesStart = {this.state.patientEpisodesStart}
                                    enterEpisodeMedications = {this.enterEpisodeMedications}
                                />
                                <PatientMedications 
                                    medications = {this.state.medications}
                                    addEpisodeMedicationsCard = {this.state.addEpisodeMedicationsCard}
                                    patientLastEpisode = {this.state.patientLastEpisode}
                                    patientLastEpisodeMedications = {this.state.patientLastEpisodeMedications}
                                    enterNextAppointment = {this.enterNextAppointment}
                                    handleMedCallback={this.handleMedCallback}
                                    getBackMessage={this.props.getBackMessage} 
                                    getBackMessageStatus={this.props.getBackMessageStatus}
                                />
                                <PatientNextAppointment
                                    first_name={this.state.patientDetails.first_name}
                                    last_name={this.state.patientDetails.last_name}
                                    dob={this.state.patientDetails.dob}
                                    date_created={this.state.patient.date_created}
                                    active={this.state.patient.active}
                                    email={this.state.patientDetails.email}
                                    phone={this.state.patientDetails.phone}
                                    patientLastEpisode={this.state.patientLastEpisode}
                                    addNextAppointmentCard = {this.state.addNextAppointmentCard}
                                    confirmNewEpisodeDetails = {this.confirmNewEpisodeDetails}
                                    handleApptCallback={this.handleApptCallback}
                                    getBackMessage={this.props.getBackMessage} 
                                    getBackMessageStatus={this.props.getBackMessageStatus}

                                />
                                <PatientConfirmEpisode
                                    confirmNewEpisodeDetailsCard = {this.state.confirmNewEpisodeDetailsCard}
                                    createNewEpisode = {this.createNewEpisode}
                                    nextAppointment = {this.state.newAppt}
                                    newEpisode = {this.state.newEpisode}
                                />
                                <PatientSuccessEpisode 
                                    successEpisodeCreatedCard = {this.state.successEpisodeCreatedCard}
                                />
                            </Col>
                        </Row>
                    </Container> 
                </Container>
            </div>



        ) // close of render return

    } // Close of render

}; // co=lose of constructor

export default Admin_Episode;
