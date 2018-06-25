import React, { Component } from "react";
import './Admin.css';
import patientAPI from "../../utils/patientAPI";
import doctorAPI from "../../utils/doctorAPI";
import userAPI from "../../utils/userAPI";
import medicationAPI from "../../utils/medicationAPI";
import mailerAPI from "../../utils/nodemailerAPI";


import MenuCard from "../../components/Admin/MenuCard";
import DataMenuCard from "../../components/Admin/DataMenuCard";
import NotificationCard from "../../components/Admin/NotificationCard";

import ConfirmPatientCard from "../../components/Admin/ConfirmPatientCard";
import SelectPatientCard from "../../components/Admin/SelectPatientCard";
import AddPatientCard from "../../components/Admin/AddPatientCard";
import RegisterPatientCard from "../../components/Admin/RegisterPatientCard";
import SuccessPatientCard from "../../components/Admin/SuccessPatientCard";
import UpdatePatientCard from "../../components/Admin/UpdatePatientCard";
import UpdateEnrollStatusCard from "../../components/Admin/UpdateEnrollStatusCard";
import SuccessUpdatePatientCard from "../../components/Admin/SuccessUpdatePatientCard";
import ChangeAppointmentCard from "../../components/Admin/ChangeAppointmentCard";
import SuccessChangeAppointmentCard from "../../components/Admin/SuccessChangeAppointmentCard";

import SelectPhysicianCard from "../../components/Admin/SelectPhysicianCard";
import ConfirmPhysicianCard from "../../components/Admin/ConfirmPhysicianCard";
import AddPhysicianCard from "../../components/Admin/AddPhysicianCard";
import RegisterPhysicianCard from "../../components/Admin/RegisterPhysicianCard";
import SuccessPhysicianCard from "../../components/Admin/SuccessPhysicianCard";
import UpdatePhysicianCard from "../../components/Admin/UpdatePhysicianCard";
import SuccessUpdatePhysicianCard from "../../components/Admin/SuccessUpdatePhysicianCard";
import RemovePhysicianCard from "../../components/Admin/RemovePhysicianCard"
import SuccessRemovePhysicianCard from "../../components/Admin/SuccessRemovePhysicianCard"

import SelectMedicationCard from "../../components/Admin/SelectMedicationCard";
import EditMedicationCard from "../../components/Admin/EditMedicationCard";
import RemoveMedicationConfirmCard from "../../components/Admin/RemoveMedicationConfirmCard"
import AddMedicationCard from "../../components/Admin/AddMedicationCard";
import ConfirmAddMedicationCard from "../../components/Admin/ConfirmAddMedicationCard";
import Alert from 'react-s-alert';
import moment from 'moment';
import {  
    Container, 
    Row, 
    Col, 
    
} from 'reactstrap';

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    console.log("You have entered an invalid email address!")
    return (false)
}

function ValidateLetter(name){
    if (/^[a-zA-Z]+$/.test(name)){
        return (true)
    }
    console.log("You have entered an invalid email address!")
    return (false)
}

class Admin extends Component {
    constructor(props){
        super(props)
        this.getBackAlertIncident = this.getBackAlertIncident.bind(this);

    }
    state = {
        menuCard: true,
        dataMenuCard: true,
        notificationCard: true,
        
        confirmPatientCard: false,
        selectPatientCard: false,
        addPatientCard: false,
        registerPatientCard: false,
        successPatientCard: false,
        updatePatientCard: false,
        successUpdatePatientCard: false,
        changeAppointmentCard: false,
        successChangeAppointmentCard: false, 
        updateEnrollStatusCard: false,

        selectPhysicianCard: false,
        confirmPhysicianCard: false,
        addPhysicianCard: false,
        registerPhysicianCard: false,
        successPhysicianCard: false,
        updatePhysicianCard: false,
        successUpdatePhysicianCard: false,
        removePhysicianCard: false,
        successRemovePhysicianCard: false,

        selectMedicationCard: false,
        editMedicationCard: false,
        addMedicationCard: false,
        confirmAddMedicationCard: false,
        removeMedicationConfirmCard: false,

        patients: [],
        patient: {},
        patientActive: false,
        patientDetails: [],
        patientAppointment: [],
        patientEpisodes: [],
        patientEpisodesStart: [],
        recordsLastPatientEpisode: [],

        physicians: [],
        physician: [],
        physicianName: [],

        apptsList: [],
        numPatients: 0,
        patientsWeekList: [],
        patientsweekListLength: 0,

        pt_firstname: "",
        pt_lastname: "",
        pt_hospnum: "",
        pt_dob: "",
        pt_active: "",
        pt_appt: "",
        pt_newApptTime: "",
        pt_newApptDate: "",
        pt_email: "",
        pt_phone: "",   
        pt_username: "",
        pt_password: "", 
        pt_id: "",
        patient_name: "",
        patient_email: "",
        
        dr_firstname: "",
        dr_lastname: "",
        dr_idnum: "",
        dr_office: "",
        dr_dob: "",
        dr_email: "",
        dr_phone: "",
        dr_username: "",
        dr_password: "", 
        dr_id: "",
        physician_name: "",
        physician_email: "",

        medication: [],
        medicationDoses: [],

        alertIncident : this.props.alertIncident
    };

    getBackAlertIncident(alertIncident){
        this.setState({
            alertIncident : alertIncident
        })
    }

    // Call function to fetch data required for admin page when Admin component mounts
    componentDidMount() {
        this.loadData(); 
    };


    menuSelect = (menuItem) => {
        menuItem === "dash board" ? this.setState({notificationCard: true}): this.setState({notificationCard: false});
        menuItem === "select patient" ? this.setState({selectPatientCard: true}): this.setState({selectPatientCard: false});
        menuItem === "add patient" ? this.setState({addPatientCard: true}) : this.setState({addPatientCard: false});
        menuItem === "select physician" ? this.setState({selectPhysicianCard: true}) : this.setState({selectPhysicianCard: false});
        menuItem === "add physician" ? this.setState({addPhysicianCard: true}) : this.setState({addPhysicianCard: false});
        menuItem === "select medication" ? this.setState({selectMedicationCard: true}) : this.setState({selectMedicationCard: false});
        menuItem === "add medication" ? this.setState({addMedicationCard: true}) : this.setState({addMedicationCard: false});
        this.setState({confirmPatientCard: false});
        this.setState({registerPatientCard: false});
        this.setState({successPatientCard: false});
        this.setState({updatePatientCard: false});
        this.setState({successUpdatePatientCard: false});
        this.setState({changeAppointmentCard: false});
        this.setState({successChangeAppointmentCard: false});
        this.setState({updateEnrollStatusCard: false});
        this.setState({confirmPhysicianCard: false});
        this.setState({registerPhysicianCard: false});
        this.setState({successPhysicianCard: false});
        this.setState({updatePhysicianCard: false});
        this.setState({successUpdatePhysicianCard: false});
        this.setState({removePhysicianCard: false});
        this.setState({successRemovePhysicianCard: false});
        this.setState({editMedicationCard: false})
        this.setState({confirmAddMedicationCard: false})
        this.setState({removeMedicationConfirmCard: false})
    };


    loadData = () => {

        this.setState({ patients: [] });
        this.setState({ patient: {} });
        this.setState({ patientDetails: [] });
        this.setState({ patientAppointment: [] });
        this.setState({ patientEpisodes: [] });
        this.setState({ patientEpisodesStart: [] });
        this.setState({ recordsLastPatientEpisode: [] });

        this.setState({ physicians: [] });
        this.setState({ physician: [] });
        this.setState({ physicianName: [] });

        this.setState({ apptsList: [] });
        this.setState({ numPatients: 0 });
        this.setState({ patientsWeekList: [] });
        this.setState({ patientsweekListLength: 0 });

        this.setState({ pt_firstname: "" });
        this.setState({ pt_lastname: "" });
        this.setState({ pt_hospnum: "" });
        this.setState({ pt_dob: "" });
        this.setState({ pt_active: "" });
        this.setState({ pt_appt: "" });
        this.setState({ pt_email: "" });
        this.setState({ pt_phone: "" });   
        this.setState({ pt_username: "" });
        this.setState({ pt_password: "" }); 
        this.setState({ pt_id: "" });
        this.setState({ pt_physician: "" });
        this.setState({ pt_newApptTime: ""});
        this.setState({ pt_newApptDate: ""});
        this.setState({ patient_name: "" });
        this.setState({ patient_email: "" });

        this.setState({ dr_firstname: "" });
        this.setState({ dr_lastname: "" });
        this.setState({ dr_idnum: "" });
        this.setState({ dr_office: "" });
        this.setState({ dr_dob: "" });
        this.setState({ dr_email: "" });
        this.setState({ dr_phone: "" });
        this.setState({ dr_username: "" });
        this.setState({ dr_password: "" }); 
        this.setState({ dr_id: "" });
        this.setState({ physician_name: "" });
        this.setState({ physician_email: "" });

        this.setState({ med_name: "" });
        this.setState({ med_type: "" });
        this.setState({ med_dose: "" });
        this.setState({ med_form: "" });
        this.setState({ med_route: "" });
        this.setState({ med_doses: [] })

        patientAPI.findAll({})
            .then(res => { 
                this.setState({patients: res.data.patientsList}); 
                this.setState({apptsList: res.data.apptsList}); 
                this.setState({numPatients: this.state.patients.length});
                this.setState({patientsWeekList: res.data.patientsWeekList})
                this.setState({patientsWeekListLength: this.state.patientsWeekList.length})

                doctorAPI.findAll({})
                .then(res => {
                    this.setState({ physicians: res.data});
                })
        })
        .catch(err => console.log(err));
    };
    

    confirmPatient = (id) => {
       console.log("id is ", id);
        patientAPI.findPatientInfoForAdmin(id)
            .then(res => {
                console.log("found patient: ", res.data);
                this.setState({patient: res.data});
                this.setState({patientActive: this.state.patient.active})
                this.setState({patientDetails: this.state.patient.details})
                this.setState({patientAppointment: this.state.patient.appointment})
                this.setState({patientEpisodes: this.state.patient.episode})
                this.setState({patientEpisodesStart: this.state.patientEpisodes[this.state.patientEpisodes.length-1].start_date})
                this.setState({recordsLastPatientEpisode: this.state.patientEpisodes[this.state.patientEpisodes.length-1].record.length})
                this.setState({pt_id : res.data._id})
                
                this.setState({confirmPatientCard: true});
                this.setState({selectPatientCard: false});
                this.setState({notificationCard: false});
            })
            .catch(err => console.log(err));
    };


    validateNewPatientField = (hospitalNum, firstName, lastName, dob, email, phone, physician) =>{
        Alert.closeAll();
        console.log(firstName + lastName + dob + email + hospitalNum + phone + physician);
        let valid = true;
        if(!hospitalNum || !firstName || !lastName || !dob || !email || !phone|| !physician){
            valid = false;
            Alert.error("Empty field(s) detected, please fill the empty field(s).", {
                position : 'top',
                effect: 'stackslide',
            });
        } else if(!ValidateLetter(firstName)){
            valid = false;
            Alert.error("Invalid characters entered in first name field.", {
                position: 'top',
                effect: 'stackslide',
            });
        } else if (!ValidateLetter(lastName)){
            valid = false;
            Alert.error("Invalid characters entered in last name field.", {
                position: 'top',
                effect: 'stackslide',
            });
        } else if ((phone)) {
            phone = phone.replace(/-/g, "");
            phone = phone.replace(/\(/g, "");
            phone = phone.replace(/\)/g, "");
            if (isNaN(phone)) {
                valid = false;
                Alert.error("Invalid phone number", {
                    position: 'top',
                    effect: 'stackslide',
                });
            } else if (phone.length !== 10) {
                valid = false;
                Alert.error("Invalid length of phone number", {
                    position: 'top',
                    effect: 'stackslide',
                });
            }
            console.log("end phone validation");
        } else {
            if ((ValidateEmail(email))) {
                console.log("approve of email");
                //if email exist in our system
                patientAPI.findPatientEmail(email)
                    .then((res) => {
                        if (res.data.length > 0) {
                            valid = false;
                            Alert.error("Email address exists in our system", {
                                position: 'top',
                                effect: 'stackslide',
                            });
                        }
                    })
                    .catch(err => console.log(err));
            } else if (!ValidateEmail(email)) {
                valid = false;
                Alert.error("You have entered an invalid email address.", {
                    position: 'top',
                    effect: 'stackslide'
                });
            } else {
                Alert.closeAll();
            }
        }
       
        return valid;
    }


    enrollPatient = event => {
        //hospitalNum, firstName, lastName, dob, email, phone
        event.preventDefault();

        if(this.validateNewPatientField(this.state.pt_hospnum, this.state.pt_firstname, this.state.pt_lastname, this.state.pt_dob, this.state.pt_email, this.state.pt_phone, this.state.pt_physician)){
            //capitalize the first letter of both first and last name.
            let patFirstName = this.state.pt_firstname.charAt(0).toUpperCase() + this.state.pt_firstname.slice(1);
            let patLastName = this.state.pt_lastname.charAt(0).toUpperCase() + this.state.pt_lastname.slice(1);
            let patDOB = moment(this.state.pt_dob, 'MM-DD-YYYY')
            patientAPI.createNewPatient ({

                date_created: new Date(),
                active: true,

                physician: this.state.pt_physician,

                details: {
                    patient_number: this.state.pt_hospnum,
                    first_name: patFirstName, 
                    last_name: patLastName,
                    dob:  patDOB,
                    email: this.state.pt_email,
                    phone: this.state.pt_phone,
                },            
                appointment: {
                    next_appt: new Date(),
                    comments: "tba",
                },
                episode: [{
                    episode_id: "000",
                    start_date: new Date(),
                    doctor: "my doctor",

                    medications: [{
                        medication: "tbc",
                    }],
                    record: [{
                        date: new Date(),
                        time: "1200",
                        meds_taken: true,
                        // can add more detailed record of medications taken and notes here if required
                    }],
                }],

               //  timestamps: {'created_at', 'updated_at' }
            })
            .then(res => {
                
                this.setState({
                    pt_id: res.data.insertedIds[0],
                    addPatientCard: false,
                    registerPatientCard : true,
                    patient_name: `${patFirstName} ${patLastName}`
                }, function(){
                    mailerAPI.sendToPatient({
                        subject : "MedMonitor - Patient Account Created",
                        name: `${this.state.patient_name}`,
                        email: `${this.state.pt_email}`,
                        message:
                            `
                            Dear  ${this.state.patient_name},
                                Welcome to MedMonitor, we have created an account for you, if you already have login credential set up please login to the application, 
                                otherwise you have to set up a new username and password in the registration in the homepage.

                                https://med-monitor.herokuapp.com

                                If you have any questions please contact the physician who enrolled you to use the application. 

                                Thank you for using MedMonitor!

                            From:

                            MedMonitor Team
                            `
                    })
                    .then(res => {
                        Alert.success("Patient successfully enrolled into our system and they have been allocated to a primary physician. ", {
                            position : 'top',
                            effect: 'stackslide',
                        });
                    })
                    .catch(err => {
                        console.log(err.response);
                    });

                })

            })
            .catch(err => console.log(err));
        }
        
    };


    validatePatientCredential = (username, password) => {
        let valid = true;
        if(!username || !password){
            Alert.error("Username or password fields cannot be empty", {
                position : 'top',
                effect: 'stackslide',
            });
        }else if(username){
            //if username exist in the system
            userAPI.findUserByUsername(username)
            .then((res) =>{
                if(res.data === 'username is ok for new account'){
                    Alert.clearAll();
                }else{
                    valid = false
                    Alert.error("Username has been taken, try a new username", {
                        position : 'top',
                        effect: 'stackslide',
                    });
                }
                console.log(res)
            })
            .catch(err =>{
                console.log(err);
            })
            
        }else{
            Alert.closeAll();
        }
        return valid;
    }


    registerPatient = event => {
        event.preventDefault();
        if(this.validatePatientCredential(this.state.pt_password, this.state.pt_username)) {
            userAPI.createAccount({
                username : this.state.pt_username,
                password : this.state.pt_password,
                email: this.state.pt_email,
                role : "Patient",
                patient_id: this.state.pt_id,
                doctor_id: "n/a"
            })
            .then(res => {
                Alert.success("Account created successfully!", {
                        position : 'top',
                        effect: 'stackslide',
                    });
                this.setState({registerPatientCard: false});
                this.setState({successPatientCard: true});
                this.setState({patient_name: `${this.state.pt_firstname} ${this.state.pt_lastname}`})
                this.setState({patient_email: this.state.pt_email})
            })
            .catch(err => {
                console.log(err)
                Alert.error("Invalid input field, please change the field accordingly", {
                        position : 'top',
                        effect: 'stackslide',
                    });
            });
        }
    }


    updatePatientDisplay = (id) => {
        this.setState({confirmPatientCard: false})
        this.setState({updatePatientCard: true})
        this.setState({pt_id: id})
     };


    validatePatientInput = (email, phone) =>{
        let valid = true;
        if ((ValidateEmail(email))) {
            console.log("approve of email");
            //if email exist in our system
            patientAPI.findPatientEmail(email)
                .then((res) => {
                    if (res.data.length > 0) {
                        valid = false;
                        Alert.error("Email address exists in our system", {
                            position: 'top',
                            effect: 'stackslide',
                        });
                    }
                })
                .catch(err => console.log(err));
        } else if (!ValidateEmail(email)) {
            valid = false;
            Alert.error("You have entered an invalid email address.", {
                position: 'top',
                effect: 'stackslide'
            });
        } else {
            Alert.closeAll();
        }
        if((phone)){
            phone = phone.replace(/-/g, "");
            phone = phone.replace(/\(/g, "");
            phone = phone.replace(/\)/g, "");
            if(isNaN(phone)){
                valid = false;
                Alert.error("Invalid phone number", {
                        position : 'top',
                        effect: 'stackslide',
                    });
            }else if(phone.length !== 10){
                valid = false;
                Alert.error("Invalid length of phone number", {
                    position: 'top',
                    effect: 'stackslide',
                });
            }
            else{
                Alert.closeAll();
            }
        }
        return valid
    }


    updatePatientDetails = (id) => {
        if(this.validatePatientInput(this.state.pt_email, this.state.pt_phone)){
            patientAPI.updateContact(id, {
                email: this.state.pt_email ? this.state.pt_email : this.state.patientDetails.email,
                phone: this.state.pt_phone ? this.state.pt_phone : this.state.patientDetails.phone
                // timestamps: {'created_at', 'updated_at' }
            })
            .then(res => {
                Alert.success("Patient details updated successfully.", {
                        position : 'top',
                        effect: 'stackslide',
                    });
                this.setState({updatePatientCard: false});
                this.setState({successUpdatePatientCard: true});
                this.setState({patient_name: `${this.state.patientDetails.first_name} ${this.state.patientDetails.last_name}`})
            })
            .catch(err => console.log(err));
        }
    }


    patientEnrollStatusDisplay = (id) => {
        this.setState({updatePatientCard: false})
        this.setState({updateEnrollStatusCard: true})
        this.setState({pt_id: id})
    }


    updatePatientEnrollStatus = (id, status) => {
        patientAPI.updatePatientStatus(id, {
            status: status
        })
        .then(res => {
            this.setState({updatePatientCard: true})
            this.setState({updateEnrollStatusCard: false})
            this.setState({patientActive: !this.state.patientActive})
            this.setState({pt_id: id})
        })
        .catch(err => console.log(err));
    };

    

    updateAppointmentDisplay = (id) => {
        this.setState({confirmPatientCard: false})
        this.setState({changeAppointmentCard: true})
        this.setState({pt_id: id})
     };


     validateAppt = (apptDateTime, apptDate, apptTime) => {
         apptDateTime = String(apptDateTime._i);
         let valid = true;
         if(!apptDate || !apptTime){
            valid = false
            Alert.error("New appointment date time cannot be empty.", {
                        position : 'top',
                        effect: 'stackslide',
                    });
         }else if(moment(apptDateTime).isBefore(moment())){
            valid = false
            Alert.error("New appointment cannot be earlier than today.", {
                        position : 'top',
                        effect: 'stackslide',
                    });
         }else {
             Alert.closeAll();
         }
         return valid;
     };


    updateAppointment = (id) => {
         const newAppt = moment(`${this.state.pt_newApptDate} ${this.state.pt_newApptTime}`);
        if(this.validateAppt(moment(newAppt), this.state.pt_newApptDate, this.state.pt_newApptTime)){
            patientAPI.updateAppointment(id, {
                next_appt: newAppt,
                comments: this.state.pt_nextApptComment,
            })
            .then(res => {
                this.setState({changeAppointmentCard: false});
                this.setState({successChangeAppointmentCard: true});
                this.setState({patient_name: `${this.state.patientDetails.first_name} ${this.state.patientDetails.last_name}`}, function(){
                    mailerAPI.sendToPatient({
                        subject : "MedMonitor - Appointment Created",
                        name: `${this.state.patientDetails.first_name} ${this.state.patientDetails.last_name}`,
                        email: this.state.patientDetails.email,
                        message:
                            `
                            Dear ${this.state.patientDetails.first_name} ${this.state.patientDetails.last_name},
                            We have scheduled an appointment for you on ${moment(newAppt, "YYYY-MM-DDTHH:mm:ssZ").format("dddd, MMMM Do YYYY")}. with Dr ${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}. 

                            These are the comment from your doctor: 
                            
                                    ${this.state.pt_nextApptComment}

                            As we are progressing through your health wealthness, we would like to remind you to keep track of your wellness frequently with our application.
                            If you need a reminder for medication time for current episode and appointment time, please visit the application. 
                            
                            From:

                            MedMonitor
                            `
                    })
                    .then(res => {
                        Alert.success("Appointment has been scheduled.", {
                         position : 'top',
                        effect: 'stackslide',
                    });
                    })
                    .catch(err => {
                        console.log(err.response);
                    });
                })
            })
            .catch(err => console.log(err));
        }
    };


    confirmPhysician = (id) => {
        doctorAPI.findOne(id)
            .then(res => {
                this.setState({confirmPhysicianCard: true});
                this.setState({selectPhysicianCard: false});
                this.setState({physician: res.data});
                this.setState({physicianName: this.state.physician.name});
            })
            .catch(err => console.log(err));
    };


    validateNewPhysician = (firstName, lastName, id, office, email, phone) => {
        let valid = true;
        if(!firstName || !lastName || !id || !office || !email || !phone){
            valid = false;
            Alert.error("Empty field(s) detected, please fill the empty field(s).", {
                         position : 'top',
                        effect: 'stackslide',
                    });
        } else if (!ValidateLetter(firstName)) {
            valid = false;
            Alert.error("Invalid characters entered in first name field.", {
                position: 'top',
                effect: 'stackslide',
            });
        } else if (!ValidateLetter(lastName)) {
            valid = false;
            Alert.error("Invalid characters entered in last name field.", {
                position: 'top',
                effect: 'stackslide',
            });
        } else if ((phone)) {
            phone = phone.replace(/-/g, "");
            phone = phone.replace(/\(/g, "");
            phone = phone.replace(/\)/g, "");
            if (isNaN(phone)) {
                valid = false;
                Alert.error("Invalid phone number", {
                    position: 'top',
                    effect: 'stackslide',
                });
            } else if (phone.length !== 10) {
                valid = false;
                Alert.error("Invalid length phone number", {
                    position: 'top',
                    effect: 'stackslide',
                });
            }
            else {
                Alert.closeAll();
            }
        }else{
            if ((ValidateEmail(email))) {
                console.log("approve of email");
                //if email exist in our system
                patientAPI.findPatientEmail(email)
                    .then((res) => {
                        if (res.data.length > 0) {
                            valid = false;
                            Alert.error("Email address exists in our system", {
                                position: 'top',
                                effect: 'stackslide',
                            });
                        }
                    })
                    .catch(err => console.log(err));
            } else if (!ValidateEmail(email)) {
                valid = false;
                Alert.error("You have entered an invalid email address.", {
                    position: 'top',
                    effect: 'stackslide'
                });
            } else {
                Alert.closeAll();
            }
            Alert.closeAll();
        }

        
        return valid;
    }


     addPhysician = event => {
        event.preventDefault();
        if(this.validateNewPhysician(this.state.dr_firstname, this.state.dr_lastname , this.state.dr_idnum, this.state.dr_office, this.state.dr_email, this.state.dr_phone)){
            let drFirstName = this.state.dr_firstname.charAt(0).toUpperCase() + this.state.dr_firstname.slice(1);
            let drLastName = this.state.dr_lastname.charAt(0).toUpperCase() + this.state.dr_lastname.slice(1);
            doctorAPI.create ({

                date_added: Date(),
                name: { 
                    first: drFirstName, 
                    last: drLastName 
                },
                id_number:  this.state.dr_idnum,
                office: this.state.dr_office,
                email: this.state.dr_email,
                phone: this.state.dr_phone,

                // timestamps: {'created_at', 'updated_at' }
            })
            .then(res => {
                
                this.setState({
                    addPhysicianCard: false,
                    registerPhysicianCard: true,
                    physician_name: `${drFirstName} ${drLastName}`,
                    dr_id: res.data.insertedIds[0]
                }, function() {
                    mailerAPI.sendToPatient({
                        subject : "MedMonitor - Physician Account Created",
                        name: `${this.state.physician_name}`,
                        email: `${this.state.dr_email}`,
                        message:
                            `
                            Dear Dr. ${this.state.physician_name},
                                Welcome to MedMonitor, we have created an account for you, if you already have login credential set up please login to the application, 
                                otherwise you have to set up a new username and password in the registration in the homepage.

                                https://med-monitor.herokuapp.com

                                Thank you for using MedMonitor!
                            From:

                            MedMonitor
                            `
                    })
                    .then(res => {
                        Alert.success("New physician successfully enrolled.", {
                            position : 'top',
                            effect: 'stackslide',
                        });
                    })
                    .catch(err => {
                        console.log(err.response);
                    });
                });
                
            })
            .catch(err => console.log(err));
        }
        
    };


    validatePhysicianCreds = (username, password) =>{
        let valid = true;
        if(!username || !password){
            valid = false;
            Alert.error("Empty field(s) detected, please fill the empty field(s).", {
                position : 'top',
                effect: 'stackslide',
            });
            this.props.getBackMessage("Empty field(s) detected, please fill the empty field(s).");
            this.props.getBackMessageStatus("danger");
        }else if(username){
            //username has been taken?
            userAPI.findUserByUsername(username)
            .then((res) =>{
                if(res.data === 'username is ok for new account'){
                    Alert.closeAll();
                }else{
                    valid = false
                    Alert.error("Username has been taken, try a new username", {
                        position : 'top',
                        effect: 'stackslide',
                    });
                }
                console.log(res)
            })
            .catch(err =>{
                console.log(err);
            })
        }
        return valid
    }


    registerPhysician = event => {
        event.preventDefault();
        if(this.validatePhysicianCreds(this.state.dr_username, this.state.dr_password)){
            if(this.state.dr_password && this.state.dr_username){
                userAPI.createAccount({
                    username : this.state.dr_username,
                    password : this.state.dr_password,
                    email: this.state.dr_email,
                    role : "Admin",
                    doctor_id: this.state.dr_id,
                    patient_id: "n/a"

                })
                .then(res => {
                    console.log(res);
                    Alert.success("Account created successfully!", {
                        position : 'top',
                        effect: 'stackslide',
                    });
                    this.setState({registerPhysicianCard: false});
                    this.setState({successPhysicianCard: true});
                    this.setState({physician_name: `${this.state.dr_firstname} ${this.state.dr_lastname}`})
                    this.setState({physician_email: this.state.dr_email})

                })
                .catch(err => {
                    console.log(err)
                    Alert.error("Invalid input field, please change the field accordingly", {
                        position : 'top',
                        effect: 'stackslide',
                    });
                });
            }
        }
    };


    updatePhysicianDisplay = (id) => {
        this.setState({confirmPhysicianCard: false})
        this.setState({updatePhysicianCard: true})
        this.setState({dr_id: id})
     };

     validatePhysicianPhone = (phone) => {
        let valid = true;
         if ((phone)) {
             phone = phone.replace(/-/g, "");
             phone = phone.replace(/\(/g, "");
             phone = phone.replace(/\)/g, "");
             if (isNaN(phone)) {
                 valid = false;
                 Alert.error("Invalid phone number", {
                     position: 'top',
                     effect: 'stackslide',
                 });
             } else if (phone.length !== 10) {
                 valid = false;
                 Alert.error("Invalid length of phone number", {
                     position: 'top',
                     effect: 'stackslide',
                 });
             }
             else {
                 Alert.closeAll();
             }
         }
        return valid;
     }


    updatePhysician = (id) => {
        if(this.validatePhysicianPhone(this.state.dr_phone)){
            doctorAPI.update (id, {
                office: this.state.dr_office ? this.state.dr_office : this.state.physician.office,
                email: this.state.dr_email ? this.state.dr_email : this.state.physician.email,
                phone: this.state.dr_phone ? this.state.dr_phone : this.state.physician.phone
                // timestamps: {'created_at', 'updated_at' }
            })
            .then(res => {
                Alert.success("Physician Details updated successfully", {
                    position : 'top',
                    effect: 'stackslide',
                });
                this.setState({updatePhysicianCard: false});
                this.setState({successUpdatePhysicianCard: true});
                this.setState({physician_name: `${this.state.physicianName.first} ${this.state.physicianName.last}`})
            })
            .catch(err => console.log(err));
        }
    };


    removePhysicianDisplay = (id) => {
        this.setState({confirmPhysicianCard: false})
        this.setState({removePhysicianCard: true})
        this.setState({dr_id: id})
     };


    removePhysician = (id) => {
        doctorAPI.remove(id)
        .then(res => {
            Alert.success("Physician has been removed from the system.", {
                    position : 'top',
                    effect: 'stackslide',
                });
            this.setState({removePhysicianCard: false});
            this.setState({successRemovePhysicianCard: true});
            this.setState({physician_name: `${this.state.physicianName.first} ${this.state.physicianName.last}`})
            this.setState({physician_email: this.state.physician.email})
        })
        .catch(err => console.log(err));
    };


    editMedication = (id) => {
        medicationAPI.findOne(id)
        .then(res => {
            this.setState({editMedicationCard: true});
            this.setState({selectMedicationCard: false});
            this.setState({removeMedicationConfirmCard: false});
            this.setState({medication: res.data[0]});
            this.setState({medicationDoses: this.state.medication.doses});
        })
        .catch(err => console.log(err));
    };


    addMedicationDose = (id) => {
        if(this.validateDose(this.state.med_dose, this.state.med_form, this.state.med_route)) {
            medicationAPI.newDose (id, {
                dose: this.state.med_dose.toLowerCase(),
                form: this.state.med_form,
                route: this.state.med_route
            })
            .then(res => {
                Alert.success("New medication dose successfully added.", {
                    position : 'top',
                    effect: 'stackslide',
                });
                this.editMedication(id)
            })
                .catch(err => console.log(err));
         };
     };


    deleteMedicationDose = (id, dose) => {
        console.log(dose.dose)
        medicationAPI.deleteDose(id, {
            dose: dose.dose,
            form: dose.form,
            route: dose.route
        })
        .then(res => {
            Alert.success("Medication dose has been removed from the system.", {
                    position : 'top',
                    effect: 'stackslide',
                });
            this.editMedication(id);
        })
    };


    removeMedicationConfirm = (id) => {
        this.setState({editMedicationCard: false})
        this.setState({removeMedicationConfirmCard: true})
    };


    removeMedication = (id) => {
        console.log(id)
        medicationAPI.deleteMedication(id)
        .then(res => {
            Alert.success("Medication has been removed from the system.", {
                    position : 'top',
                    effect: 'stackslide',
                });
            window.location="/admin";
        })
        .catch(err => console.log(err))
    };


    confirmNewMedication = () => {
        if(this.validateMedication(this.state.med_name, this.state.med_type, this.state.med_doses)) {
            this.setState({addMedicationCard: false})
            this.setState({confirmAddMedicationCard: true})
        };
    };


    validateMedication = (name, type, doses) =>{
        let valid = true;
        if(!name || !type || !doses){
            valid = false;
            Alert.error("Empty field(s) detected, please fill the empty field(s).", {
                position : 'top',
                effect: 'stackslide',
            });
        }else{
            Alert.closeAll();
        }
        return valid
    }


    addNewMedication = () => {
            medicationAPI.newDrug({
                name: this.state.med_name.charAt(0).toUpperCase() + this.state.med_name.slice(1),
                type: this.state.med_type,
                doses: this.state.med_doses
            })
            .then(res => {
                Alert.success("New medication successfully added.", {
                    position : 'top',
                    effect: 'stackslide',
                });                
                window.location="/admin";
            })
            .catch(err => console.log(err))
    };


    validateDose = (dose, form, route) =>{
        let valid = true;
        let unit = false;
        if(!dose || !form || !route) {
            valid = false;
            Alert.error("Empty field(s) detected, please fill the empty field(s).", {
                position : 'top',
                effect: 'stackslide',
            });  
        } else if (!dose.match(/\d+/g)) {
            valid = false;
            Alert.error("It looks like you have entered an incorrect dose. Doses must have a number and a unit (e.g. 100mg or 20mg/200mg).", {
                position : 'top',
                effect: 'stackslide',
            });  
        } else {
            const units=["mcg","mg","g","micrograms", "milligrams","g", "ml", "millilitres", "dl", "l", "litres", "units", "u","iu","cassette"];
            for(let i=0;i<units.length;i++) {
                if (dose.toLowerCase().indexOf(units[i]) > 0) {unit = true}
            }
            if (unit === false) {
                valid = false;
                Alert.error("It looks like you have entered an incorrect dose. Doses must have a number and a recognised unit (e.g. 100mg or 20mg/200mg).", {
                    position : 'top',
                    effect: 'stackslide',
                });  
            }else{
                Alert.closeAll();
            }
        }

        return valid
    }


    addNewMedicationDose = () => {
        if(this.validateDose(this.state.med_dose, this.state.med_form, this.state.med_route)) {
            let obj = {
                dose: this.state.med_dose.toLowerCase(),
                form: this.state.med_form,
                route: this.state.med_route
            }

        this.setState({ med_doses: [...this.state.med_doses, obj] })
        };
    };


    deleteNewMedicationDose = (index) => {
        console.log("admin " + index)
        const array = this.state.med_doses;
        array.splice(index, 1);
        this.setState({med_doses:  array });
    };


    // Dynamic form input handler
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
        [name]: value
        });
        console.log(event.target.value);
    };


    render() {
        
        return (

            <Container fluid>

                <Container className="clearfix">

                    <br />
                        <span  style={{fontWeight: "bold", float: "left", fontSize: 15}}>
                            Physician: Dr.&nbsp;

                                {localStorage.getItem("firstName")[0].toUpperCase()}{localStorage.getItem("firstName").slice(1)} &nbsp;
                                {localStorage.getItem("lastName")[0].toUpperCase()}{localStorage.getItem("lastName").slice(1)}
                            
                        </span>
                        <span  style={{fontWeight: "bold", float: "right", fontSize: 15}}>
                            {`${Date().toString().slice(0,15)} at ${Date().toString().slice(16,21)}`}
                        </span>
                </Container>

                    <br />

                <Container>
                    <Row>
                        <Col sm="3">
                        
                            <MenuCard
                                menuCard = {this.state.menuCard}
                                dataMenuCard = {this.state.dataMenuCard}
                                notificationCard = {this.state.notificationCard}

                                selectPatientCard = {this.state.selectPatientCard}
                                confirmPatientCard = {this.state.confirmPatientCard}
                                addPatientCard = {this.state.addPatientCard}
                                addPatientsDrCard = {this.state.addPatientsDrCard}
                                registerPatientCard = {this.state.registerPatienttCard}
                                successPatientCard = {this.state.successPatientCard}
                                updatePatientCard = {this.state.updatePatientCard}
                                successUpdatePatientCard = {this.state.successUpdatePatientCard}
                                changeAppointmentCard = {this.state.changeAppointmentCard}
                                successChangeAppointmentCard = {this.state.successChangeAppointmentCard}
                                updateEnrollStatusCard = {this.state.updateEnrollmentCard}

                                selectPhysicianCard = {this.state.selectPhysicianCard}
                                confirmPhysicianCard = {this.state.confirmPhysicianCard}
                                updatePhysicianCard = {this.state.updatePhysicianCard}
                                successUpdatePhysicianCard = {this.state.successUpdatePhysicianCard}
                                addPhysicianCard = {this.state.addPhysicianCard}
                                registerPhysicianCard = {this.state.registerPhysicianCard}
                                successPhysicianCard = {this.state.successPhysicianCard}
                                removePhysicianCard = {this.state.removePhysicianCard}
                                successRemovePhysicianCard = {this.state.successRemovePhysicianCard}

                                selectMedicationCard = {this.state.selectMedicationCard}
                                editMedicationCard = {this.state.editMedicationCard}
                                removeMedicationConfirmCard = {this.state.removeMedicationConfirmCard}
                                addMedicationCard = {this.state.addMedicationCard}
                                confirmAddMedicationCard = {this.state.confirmAddMedicationCard}
                                
                                menuSelect = {(selection) => this.menuSelect(selection)}
                             />

                            <DataMenuCard
                                dataMenuCard = {this.state.dataMenuCard}
                            />

                        </Col>
            
                        <Col sm="9">

                            <NotificationCard
                                notificationCard = {this.state.notificationCard}
                                numPatients = {this.state.numPatients}
                                apptsList = {this.state.apptsList}
                                patientsWeekList = {this.state.patientsWeekList}
                                patientsWeekListLength = {this.state.patientsWeekListLength}
                                confirmPatient = {(id) => this.confirmPatient(id)}
                            />   

                            <SelectPatientCard 
                                selectPatientCard = {this.state.selectPatientCard}
                                patientsLength = {this.state.patients.length}
                                patients = {this.state.patients}
                                confirmPatient = {(id) => this.confirmPatient(id)}
                            />

                            <ConfirmPatientCard 
                                confirmPatientCard = {this.state.confirmPatientCard}
                                patientNumber = {this.state.patientDetails.patient_number}
                                firstname = {this.state.patientDetails.first_name}
                                lastname = {this.state.patientDetails.last_name}
                                dob = {this.state.patientDetails.dob}
                                dateCreated = {this.state.patient.date_created}
                                active = {this.state.patient.active}
                                nextAppt = {this.state.patientAppointment.next_appt}
                                email = {this.state.patientDetails.email}
                                phone = {this.state.patientDetails.phone} 
                                patientEpisodesLength = {this.state.patientEpisodes.length}
                                patientEpisodesStart = {this.state.patientEpisodesStart}
                                recordsLastPatientEpisode = {this.state.recordsLastPatientEpisode} 
                                patientId = {this.state.pt_id}
                                updatePatientDisplay = {(id) => this.updatePatientDisplay(id)}
                                updateAppointmentDisplay = {(id) => this.updateAppointmentDisplay(id)}
                            />

                            <AddPatientCard
                                addPatientCard = {this.state.addPatientCard}
                                physicians = {this.state.physicians}
                                handleInputChange = {(event) => this.handleInputChange(event)}
                                enrollPatient = {(event) => this.enrollPatient(event)}
                            />

                            <RegisterPatientCard
                                registerPatientCard = {this.state.registerPatientCard}
                                patient_name = {this.state.patient_name}
                                handleInputChange = {(event) => this.handleInputChange(event)}
                                registerPatient = {(event) => this.registerPatient(event)}
                            />

                            <SuccessPatientCard
                                successPatientCard = {this.state.successPatientCard}
                                patient_name = {this.state.patient_name}
                                patient_email = {this.state.patient_email}
                            />

                            <UpdatePatientCard
                                updatePatientCard = {this.state.updatePatientCard}
                                patientNumber = {this.state.patientDetails.patient_number}
                                firstname = {this.state.patientDetails.first_name}
                                lastname = {this.state.patientDetails.last_name}
                                email = {this.state.patientDetails.email}
                                phone = {this.state.patientDetails.phone} 
                                active = {this.state.patientActive}
                                pt_id = {this.state.patient._id}
                                handleInputChange = {(event) => this.handleInputChange(event)}
                                updatePatientDetails = {(id) => this.updatePatientDetails(id)}
                                patientEnrollStatusDisplay = {(id) => this.patientEnrollStatusDisplay()}
                            />

                            <UpdateEnrollStatusCard
                                updateEnrollStatusCard = {this.state.updateEnrollStatusCard}
                                active = {this.state.patientActive}
                                pt_id = {this.state.patient._id}
                                updatePatientEnrollStatus = {(id, status) => this.updatePatientEnrollStatus(id, status)}
                            />

                            <SuccessUpdatePatientCard
                                successUpdatePatientCard = {this.state.successUpdatePatientCard}
                                patient_name = {this.state.patient_name}
                            />

                             <ChangeAppointmentCard
                                changeAppointmentCard = {this.state.changeAppointmentCard}
                                patientNumber = {this.state.patientDetails.patient_number}
                                firstname = {this.state.patientDetails.first_name}
                                lastname = {this.state.patientDetails.last_name}
                                active = {this.state.patient.active}
                                nextAppt = {this.state.patientAppointment.next_appt}
                                nextApptComment = {this.state.patientAppointment.comments}
                                pt_id = {this.state.patient._id}
                                handleInputChange = {(event) => this.handleInputChange(event)}
                                updateAppointment = {(id) => this.updateAppointment(id)}
                            />

                            <SuccessChangeAppointmentCard
                                successChangeAppointmentCard = {this.state.successChangeAppointmentCard}
                                patient_name = {this.state.patient_name}
                            />

                            <SelectPhysicianCard 
                                selectPhysicianCard = {this.state.selectPhysicianCard}
                                physicians = {this.state.physicians}
                                physiciansLength = {this.state.physicians.length}
                                confirmPhysician = {(id) => this.confirmPhysician(id)}
                            />

                            <ConfirmPhysicianCard 
                                confirmPhysicianCard = {this.state.confirmPhysicianCard}
                                idNumber = {this.state.physician.id_number}
                                firstname = {this.state.physicianName.first}
                                lastname = {this.state.physicianName.last}
                                office = {this.state.physician.office}
                                dateAdded = {this.state.physician.date_added}
                                email = {this.state.physician.email}
                                phone = {this.state.physician.phone} 
                                updatePhysicianDisplay = {(id) => this.updatePhysicianDisplay(id)}
                                removePhysicianDisplay = {(id) => this.removePhysicianDisplay(id)}
                            />

                            <UpdatePhysicianCard
                                updatePhysicianCard = {this.state.updatePhysicianCard}
                                idNumber = {this.state.physician.id_number}
                                firstname = {this.state.physicianName.first}
                                lastname = {this.state.physicianName.last}
                                office = {this.state.physician.office}
                                email = {this.state.physician.email}
                                phone = {this.state.physician.phone} 
                                dr_id = {this.state.physician._id}
                                handleInputChange = {(event) => this.handleInputChange(event)}
                                updatePhysician = {(id) => this.updatePhysician(id)}
                            />

                            <SuccessUpdatePhysicianCard
                                successUpdatePhysicianCard = {this.state.successUpdatePhysicianCard}
                                physician_name = {this.state.physician_name}
                            />

                            <AddPhysicianCard
                                addPhysicianCard = {this.state.addPhysicianCard}
                                handleInputChange = {(event) => this.handleInputChange(event)}
                                addPhysician = {(event) => this.addPhysician(event)}
                            />

                            <RegisterPhysicianCard
                                registerPhysicianCard = {this.state.registerPhysicianCard}
                                Physician_name = {this.state.Physician_name}
                                handleInputChange = {(event) => this.handleInputChange(event)}
                                registerPhysician = {(event) => this.registerPhysician(event)}
                            />

                             <SuccessPhysicianCard
                                successPhysicianCard = {this.state.successPhysicianCard}
                                physician_name = {this.state.physician_name}
                                physician_email = {this.state.physician_email}
                            />    

                            <RemovePhysicianCard
                                removePhysicianCard = {this.state.removePhysicianCard}
                                idNumber = {this.state.physician.id_number}
                                firstname = {this.state.physicianName.first}
                                lastname = {this.state.physicianName.last}
                                office = {this.state.physician.office}
                                dr_id = {this.state.physician._id}
                                removePhysician = {(id) => this.removePhysician(id)}
                            />

                            <SuccessRemovePhysicianCard
                                successRemovePhysicianCard = {this.state.successRemovePhysicianCard}
                                physician_name = {this.state.physician_name}
                                physician_email = {this.state.physician_email}
                            /> 

                            <SelectMedicationCard 
                                selectMedicationCard = {this.state.selectMedicationCard}
                                editMedication = {(id) => this.editMedication(id)}
                            />

                            <AddMedicationCard
                                addMedicationCard = {this.state.addMedicationCard}
                                newMedicationDoses = {this.state.med_doses}
                                handleInputChange = {(event) => this.handleInputChange(event)}
                                addNewMedicationDose = {() => this.addNewMedicationDose()}
                                deleteNewMedicationDose = {(index) => this.deleteNewMedicationDose(index)}
                                confirmNewMedication = {() => this.confirmNewMedication()}
                                
                            />

                            <ConfirmAddMedicationCard
                                confirmAddMedicationCard = {this.state.confirmAddMedicationCard}
                                newMedicationName = {this.state.med_name ? this.state.med_name.charAt(0).toUpperCase() + this.state.med_name.slice(1) : this.state.med_name}
                                newMedicationType = {this.state.med_type}
                                newMedicationDoses = {this.state.med_doses}
                                addNewMedication = {() => this.addNewMedication()}
                            />

                            <EditMedicationCard 
                                editMedicationCard = {this.state.editMedicationCard}
                                medicationId = {this.state.medication._id}
                                medicationName = {this.state.medication.name}
                                medicationType = {this.state.medication.type}
                                medicationDoses = {this.state.medicationDoses}
                                handleInputChange = {(event) => this.handleInputChange(event)}
                                addMedicationDose = {(id) => this.addMedicationDose(id)}
                                deleteMedicationDose = {(id, dose) => this.deleteMedicationDose(id, dose)}
                                removeMedicationConfirm = {(id) => this.removeMedicationConfirm(id)}
                            />

                            <RemoveMedicationConfirmCard
                                removeMedicationConfirmCard = {this.state.removeMedicationConfirmCard}
                                medicationName = {this.state.medication.name}
                                medicationType = {this.state.medication.type}
                                medicationId = {this.state.medication._id}
                                removeMedication = {(id) => this.removeMedication(id)}
                                editMedication = {(id) => this.editMedication(id)}

                            />

                        </Col>
                    </Row>
                </Container>

                <Container className="panicAlertNotice">
                {this.state.alertIncident.length > 0? 
                    this.state.alertIncident.map((x,index) =>{
                        return(
                        <Alert key={index} className="panicAlertMessage" color="danger">{x}</Alert>
                        )
                    })
                    : 
                    null
                }
                </Container>

            </Container>
        


        ) // render return

    } // close of render

} //close of class constructor

export default Admin;
