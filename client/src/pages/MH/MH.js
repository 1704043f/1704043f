import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import medicationAPI from "../../utils/medicationAPI";
import doctorAPI from "../../utils/doctorAPI";
import patientAPI from "../../utils/patientAPI";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import moment from "moment";



class Books extends Component {
    state = {
    id: "5ac93b9bbddfdc49cc7e66d5", // test id only

    patient: {},
    patientDetails: [],
    patientAppt: [],
    patientEpisodes: [],

    patientLastEpisode: [],
    patientLastEpisodeStart: "",
    patientLastEpisodeMeds: [],

    patientLastEpisodeRecords: [],
    patientLastEpisodeNumRecords: 0,

    };

    componentDidMount() {
        this.loadAllDoctors();
    }


    // -----------------------
    // Medications route tests
    // -----------------------

    // load all drugs
    loadAllDrugs = () => {
        medicationAPI.findAll({})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // add a new drug
    addNewDrug = event => {
        event.preventDefault();
        medicationAPI.newDrug({
            name: "Sinemet",
            type: "dopamine agonist",
            doses: {
                dose: "10/150mg",
                form: "tablet",
                route: "oral"
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // delete a drug
    deleteDrug = event => {
        event.preventDefault();
        medicationAPI.deleteMedication(this.state.id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // add new dose to existing medication
    addNewDose = event => {
        event.preventDefault();
        medicationAPI.newDose(this.state.id, {
            dose: "100/10mg",
            form: "tablet",
            route: "oral"
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

    };

    // delete a dose from existing medication
    // note dose object must exactly match the dose object to be deleted fromt the document
    deleteDose = event => {
        event.preventDefault();
        medicationAPI.deleteDose(this.state.id, {
            dose: "100/10mg",
            form: "tablet",
            route: "oral"
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // --------------------
    // Doctor routes tests
    // --------------------

    // load all doctors
    loadAllDoctors = () => {
        doctorAPI.findAll({})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // find doctor by id
    findDoctor = event => {
        event.preventDefault();
        doctorAPI.findOne(this.state.id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // Delete doctor by id
    deleteDoctor = event => {
        event.preventDefault();
        doctorAPI.remove(this.state.id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // add a new doctor
    addNewDoctor = event => {
        event.preventDefault();
        doctorAPI.create({
            name: {
                first: "Peter",
                last: "Willis",
            },
            office: "Clevealnd Clinic, Downtown plaza 1",
            email: "peter@thegreat.com",
            phone: "254-456-8254"
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // update a doctors details 
    updateDoctor = event => {
        event.preventDefault();
        doctorAPI.update(this.state.id, {
            name: {
                first: "General",
                last: "Mo",
            },
            office: "UH, Downtown  1",
            email: "Mo@mo.com",
            phone: "254-456-11111"
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    // ------------------------
    // Patient_data route tests
    // ------------------------


    // load personal details of all patients (alphabetical by last name) ^^
    loadAllPatients = () => {
        patientAPI.findAll({})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // find patient data by id for Admin ^^
    // findPatientInfoForAdmin = event => {
    //     event.preventDefault();
    //     patientAPI.findPatientInfoForAdmin(this.state.id)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    // };

    // find patient data by id for Patient use ^^
    findPatientInfoForPatient = event => {
        event.preventDefault();
        patientAPI.findPatientInfoForPatient(this.state.id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // fetch patient medications ^^
    findPatientMeds = event => {
        event.preventDefault();
        patientAPI.findPatientMeds(this.state.id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // make patient inactive (leaves care of doctor) ^^
    recordPatientInactive = event => {
        event.preventDefault();
        patientAPI.inactivatePatient(this.state.id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // update patient details (email and phone) ^^
    updatePatientContactDetails = event => {
        event.preventDefault();
        patientAPI.updateContact(this.state.id, {
            email: "patientemail@patient.com",
            phone: "123-456-7890"
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // update next appointment
    updatePatientAppointment = event => {
        event.preventDefault();
        patientAPI.updateAppointment(this.state.id, {
            next_appt: Date(),
            comments: "dont be late"
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // create a new patient record with data entered by patient
    createNewRecord = event => {
        event.preventDefault();
        patientAPI.createNewRecord(this.state.id, {

            date_time: Date,
            meds_taken: Boolean,
            // can add more detailed record of medications taken and notes here if required 
            
            emergencies: {
                falls: Boolean,
                freezing: Boolean,
                choking: Boolean,
                hallucination: Boolean,
            },

            symptoms: {
                kickin: Number,
                wearoff: Number,
                movement: Number,
                sleepy: Number,
                offtime: Number,
                tremor: Number,
                walking: Number,
                balance: Number,
            },

            side_effects: {
                sickness: Number,
                dizziness: Number,
                headaches: Number,
                drymouth: Number,
            },

            notes: String,
        })

            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // create a new episode by doctor
    createNewEpisode = event => {
        event.preventDefault();
        patientAPI.createNewEpisode(this.state.id, {

            episode_id: "001",
            start_date: Date(),
            doctor: "my doctor",

            medications: [{
                medication: "Sinemet",
                dose: "100mg/10mg",
                form: "tablet",
                route: "oral",
                times: ["0800", "1600", "2000"]
            }],

            record: [{
                date_time: Date,
            meds_taken: Boolean,
            // can add more detailed record of medications taken and notes here if required 
            
            emergencies: {
                falls: Boolean,
                freezing: Boolean,
                choking: Boolean,
                hallucination: Boolean,
            },

            symptoms: {
                kickin: Number,
                wearoff: Number,
                movement: Number,
                sleepy: Number,
                offtime: Number,
                tremor: Number,
                walking: Number,
                balance: Number,
            },

            side_effects: {
                sickness: Number,
                dizziness: Number,
                headaches: Number,
                drymouth: Number,
            },

            notes: String,

            }],

        })

            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    // add a new patient
    addNewPatient = event => {
        event.preventDefault();
        patientAPI.createNewPatient ({

            date_created: Date(),
            active: true,
            //doctor: to be populated with _id from doctors collection,

            details: {
                patient_number: "hosp0017",
                first_name: "Billy", 
                last_name: "Thekid",
                dob:  "02/30/1965",
                email: "billytk@what.com",
                phone: "258-562-8765",
            },            
            
            appointment: {
                next_appt: Date(),
                comments: "next appt fixed",
                },

            episode: [{
                episode_id: "000",
                start_date: Date(),
                doctor: "my doctor",

                medications: [{
                    medication: "tbc",
                }],

                record: [{
                    date: Date(),
                    time: "1200",
                    meds_taken: true,
                    // can add more detailed record of medications taken and notes here if required
                }],

            }],
            // timestamps: {'created_at', 'updated_at' }
        })

        .then(res => console.log(res))
        .catch(err => console.log(err));
    };    
    
    
    // Form handlers
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
        [name]: value
        });
        console.log(event.target.value);
    };





    // find patient data by id for Admin ^^
    findPatientInfoForAdmin = event => {
        event.preventDefault();
        patientAPI.findPatientInfoForAdmin("5ac93b9bbddfdc49cc7e66d5")
            .then(res => {

                console.log(res.data)

                this.setState({patient: res.data});
                this.setState({patientDetails: this.state.patient.details})
                this.setState({patientAppt: this.state.patient.appointment})
                this.setState({patientEpisodes: this.state.patient.episode})

                this.setState({patientLastEpisode: this.state.patientEpisodes[this.state.patientEpisodes.length-1] })
                this.setState({patientLastEpisodeStart: this.state.patientLastEpisode.start_date})
                this.setState({patientLastEpisodeMeds: this.state.patientLastEpisode.medications})

                this.setState({patientLastEpisodeRecords: this.state.patientLastEpisode.record})
                this.setState({patientLastEpisodeNumRecords: this.state.patientLastEpisodeRecords.length})

                let record = [];
                let currentRecordDate = "";
                let previousRecordDate = "";
                let recordTime = "";

                let kickin = []; 
                let wearoff = []; 
                let movement = [];
                let sleepy = [];
                let offtime = [];
                let tremor = [];
                let walking = [];
                let balance = [];
                let sickness = [];
                let dizziness = [];
                let headache = [];
                let drymouth = [];
                let timePoint = [];

                let kickinAverages = []; 
                let wearoffAverages = []; 
                let movementAverages = [];
                let sleepyAverages = [];
                let offtimeAverages = [];
                let tremorAverages = [];
                let walkingAverages = [];
                let balanceAverages = [];
                let sicknessAverages = [];
                let dizzinessAverages = [];
                let headacheAverages = [];
                let drymouthAverages = [];

                let timePoints = [];
                let chartData = [];


                let i=0, j=-1;

                for (i=0; i<6; i++) {

                    kickin.push( [] ); 
                    wearoff.push( [] ); 
                    movement.push( [] );
                    sleepy.push( [] );
                    offtime.push( [] );
                    tremor.push( [] );
                    walking.push( [] );
                    balance.push( [] );
                    sickness.push( [] );
                    dizziness.push( [] );
                    headache.push( [] );
                    drymouth.push( [] );
            }
                
                for (i=0; i<this.state.patientLastEpisodeNumRecords; i++) {
                    
                    record = this.state.patientLastEpisodeRecords[i];
                    //console.log(record)
                    currentRecordDate = record.date_time.slice(0,10); 

                    
                    j<1 || currentRecordDate == previousRecordDate ? j++ : j=0;

                        
                    let recordTime = record.date_time.slice(11,16);

                    timePoints[j] = recordTime;


                    kickin[j].push(record.symptoms.kickin);
                    wearoff[j].push(record.symptoms.wearoff);
                    movement[j].push(record.symptoms.movement);
                    sleepy[j].push(record.symptoms.sleepy);
                    offtime[j].push(record.symptoms.offtime);
                    tremor[j].push(record.symptoms.tremor);
                    walking[j].push(record.symptoms.walking);
                    balance[j].push(record.symptoms.balance);

                    sickness[j].push(record.side_effects.sickness);
                    dizziness[j].push(record.side_effects.dizziness);
                    headache[j].push(record.side_effects.headache);
                    drymouth[j].push(record.side_effects.drymouth);
                        
                    previousRecordDate = currentRecordDate;
                }

                let array = []; 
                for (i=0; i<timePoints.length; i++) {

                    kickinAverages[i] = (kickin[i].reduce((a, b) => a + b)/ kickin[i].length).toFixed(1);
                    wearoffAverages[i] = (wearoff[i].reduce((a, b) => a + b) / wearoff[i].length).toFixed(1)
                    movementAverages[i] = (movement[i].reduce((a, b) => a + b) / movement[i].length).toFixed(1)
                    sleepyAverages[i] = (sleepy[i].reduce((a, b) => a + b) / sleepy[i].length).toFixed(1)
                    offtimeAverages[i] = (offtime[i].reduce((a, b) => a + b) / offtime[i].length).toFixed(1)
                    tremorAverages[i] = (tremor[i].reduce((a, b) => a + b) / tremor[i].length).toFixed(1)
                    walkingAverages[i] = (walking[i].reduce((a, b) => a + b) / walking[i].length).toFixed(1)
                    balanceAverages[i] = (balance[i].reduce((a, b) => a + b) / balance[i].length).toFixed(1)

                    sicknessAverages[i] = (sickness[i].reduce((a, b) => a + b) / sickness[i].length).toFixed(1)
                    dizzinessAverages[i] = (dizziness[i].reduce((a, b) => a + b) / dizziness[i].length).toFixed(1)
                    headacheAverages[i] = (headache[i].reduce((a, b) => a + b) / headache[i].length).toFixed(1)
                    drymouthAverages[i] = (drymouth[i].reduce((a, b) => a + b) / drymouth[i].length).toFixed(1)
                }
                
                let obj = {};
                for (i=0; i<timePoints.length; i++) {

                    obj = {
                        name: timePoints[i], 
                        kickin: kickinAverages[i], 
                        movement: movementAverages[i], 
                        sleepy: sleepyAverages[i],
                        offtime: offtimeAverages[i],
                        tremor: tremorAverages[i],
                        walking: walkingAverages[i],
                        balance: balanceAverages[i],
                        sickness: sicknessAverages[i],
                        dozziness: dizzinessAverages[i],
                        headache: headacheAverages[i],
                        drymouth: drymouthAverages[i]
                        };

                    chartData.push(obj) 
                }
            
                console.log(chartData)



                

            
            
            })
            .catch(err => console.log(err));
    };

    



    // ------
    // Render
    // ------

    render() {
        return (

            <Container>
                <Form>
                    <br />
                    <Button onClick={this.findPatientInfoForAdmin}>loadall</Button>
                    {/* <Button onClick={this.createNewRecord}>record</Button>
                    <Button onClick={this.createNewEpisode}>episode</Button>
                    <Button onClick={this.addNewPatient}>add pt</Button>
                    <Button onClick={this.recordPatientInactive}>findOne</Button> */}


                </Form>

            </Container>
        )
    };
};

export default Books;
