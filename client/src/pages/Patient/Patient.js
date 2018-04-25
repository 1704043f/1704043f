import React, { Component } from "react";
import PatSurvey from "../../components/PatSurvey";
import PatMedDue from "../../components/PatMedDue";
import VideoUpload from "../../components/VideoUpload";
import patientAPI from "../../utils/patientAPI";
import { Route, Redirect } from 'react-router'
import moment from 'moment';
import './Patient.css';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';


class Patient extends Component {
    constructor(props){
        super(props);
        this.state = {
            finishedQuestion : false,
            next_appt : '',
            medication : [],
            details : {}
        }

    }
    componentDidMount() {
        if(localStorage.getItem("userId")){
            patientAPI.findPatientInfoForPatient(localStorage.getItem("userId").toString())
                .then(res => {
                    console.log("res data:", res.data);
                    this.setState({
                        next_appt: `${res.data.appointment.next_appt}`,
                        medication: res.data.episode[res.data.episode.length-1].medications,
                        details: res.data.details,
                        physician: `${res.data.physician.name.first} ${res.data.physician.name.last}`,
                        numRecords : res.data.episode[res.data.episode.length-1].record.length,
                        currentRecords : res.data.episode[res.data.episode.length-1].record,
                    }, function(){
                        let medTimes = [];
                        console.log("this state in patient: ", this.state);
                        for(let i =0; i< this.state.medication.length; i++){
                            console.log(this.state.medication[i]);
                            for(let j =0; j < this.state.medication[i].times.length; j++){
                                if(!medTimes.includes(this.state.medication[i].times[j])){
                                    medTimes.push(this.state.medication[i].times[j]);
                                }
                            }
                        }
                        medTimes.sort(function(a,b){
                            return a - b;
                        })


                        let pastMed = [];
                        let futureMed = [];
                        let medTimeDate = [];
                        let closestPastTime = '';
                        let foundPreviousTime = false;
                        let timeNow = moment();
                        console.log(medTimes);
                        
                        //keep track of data for the day. 
                        
                        if(medTimes && medTimes.length>0){
                            console.log("here");
                            medTimes.map(x => medTimeDate.push(moment(x, "HHmm").toISOString()));
                            
                            for (let i = 0; i < medTimes.length; i++) {
                                //if pass current time
                                if (moment(medTimeDate[i]).isBefore(timeNow)) {
                                    pastMed.push(moment(medTimes[i], "HHmm").format("HHmm"))
                                //still in the future
                                }else if (moment(medTimeDate[i]).isAfter(timeNow)) {
                                    futureMed.push(moment(medTimes[i], "HHmm").format("HHmm"))
                                }
                            }
                        }    
                        console.log("PastMed:" + pastMed);
                        console.log("FutureMed:" + futureMed);
/*
TODO : add logic wrote in the other notepad here
*/
                        if(pastMed.length === 0 ){
                            //get time from 
                            let medTime = moment(futureMed[futureMed.length-1], "HHmm").toISOString();
                            console.log("before -1", medTime);
                            medTime = moment(medTime).add(-1, "day").toISOString();
                            console.log("med time for yesterday : ", medTime);
                            for(let i = 0; i <this.state.currentRecords.length; i++){
                                if (moment(this.state.currentRecords[i].date_time).toISOString() === medTime){
                                    console.log("found prev med time: ");
                                    foundPreviousTime = true;
                                }
                            }
                            if(!foundPreviousTime){
                                closestPastTime = medTime
                            }
                        }else if(pastMed.length === 1){
                            let medTime = moment(pastMed[0], "HHmm").toISOString();
                            console.log("med time for today first dose : ", medTime);
                            for (let i = 0; i < this.state.currentRecords.length; i++){
                                if (moment(this.state.currentRecords[i].date_time).toISOString() === medTime){
                                    foundPreviousTime = true;
                                }
                            }
                            if(!foundPreviousTime){
                                closestPastTime = medTime
                            }
                        }else if(pastMed.length >= 2){
                            let medTime = moment(pastMed[pastMed.length-1], "HHmm").toISOString();
                            console.log("today after multiple dosage intake : ", medTime);
                            for (let i = 0; i < this.state.currentRecords.length; i++) {
                                if (moment(this.state.currentRecords[i].date_time).toISOString() === medTime) {
                                    foundPreviousTime = true;
                                }
                            }
                            if (!foundPreviousTime) {
                                closestPastTime = medTime
                            }
                        }                       
                        /* //if time is before now, take the last
                        if(moment(medTimes[0], "HHmm").isBefore(timeNow)){
                            console.log("is before:");
                            let choseMed = moment(futureMed[futureMed.length-1], "HHmm").add(-1, "days");
                            closestPastTime = choseMed;
                        }else if(moment(medTimes[0], "HHmm").isAfter(timeNow)){
                            console.log("is after:");
                            closestPastTime = moment(pastMed[pastMed.length-1], "HHmm").format();
                        }else if(numRecords === 0){
                            //look into previous episode, and the very last med intake time. 
                            let choseMed = moment(futureMed[futureMed.length-1], "HHmm").add(-1, "days");
                            closestPastTime = choseMed;
                        }else{
                            console.log("else");
                            closestPastTime = moment(pastMed[pastMed.length-1], "HHmm").format();
                        }
                        console.log("Closest past time : " , closestPastTime)
 */
                        console.log(medTimes);
                        this.setState({
                            medTimes, 
                            pastMed,
                            futureMed,
                            closestPastTime,
                            foundPreviousTime,
                        }, function(){
                            console.log(this.state);
                            console.log("here");
                            if(this.state.foundPreviousTime){
                                this.props.history.push('/appointment');
                            }
                            
                        });
                    })
                })
                .catch(err => console.log(err));
        }
    }
    handleFinishedCallback= () => {
        this.setState({
            finishedQuestion : true
        })
    }
    populateMedDueAndUpload= () =>{
        return(
            this.state.finishedQuestion === true || this.state.foundPreviousTime?
                this.props.history.push('/appointment')
            :null
        )
    }
    render(){
        return (
            <Container fluid>
                <Container>
                    <Row>
                        <Col size='md-12'>
                            {!this.state.foundPreviousTime ? 
                            <PatSurvey 
                                physician ={this.state.physician}
                                handleIncident={this.props.handleIncident} 
                                handleFinishedCallback={this.handleFinishedCallback} 
                                medTimes = {this.state.medTimes}
                                pastMed={this.state.pastMed}
                                closestPastTime={this.state.closestPastTime}
                                foundPreviousTime={this.state.foundPreviousTime}
                            />
                                : 
                                null
                            }
                        </Col>
                    </Row>
                    {this.populateMedDueAndUpload()}
                </Container>
            </Container>
        )
    }
}

export default Patient;


