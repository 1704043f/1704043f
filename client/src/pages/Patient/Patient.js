import React, { Component } from "react";
import patientAPI from "../../utils/patientAPI";
import PatSurvey from "../../components/PatSurvey";
import {Redirect } from 'react-router';
import moment from 'moment';
import './Patient.css';

import {
    Label,
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardBody
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
                        lastEpisode : res.data.episode[res.data.episode.length-1],
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
                        let closestPastTimeIndex = '';
                        let foundPreviousTime = false;
                        let timeNow = moment();
                        let timeDiff = '';
                        let percentDiff = '';
                        let durationDiff = '';
                        console.log(medTimes);
                        
                        //keep track of data for the day. 
                        
                        if(medTimes && medTimes.length>0){
                            medTimes.map(x => medTimeDate.push(moment(x, "HHmm").toISOString()));
                            
                            for (let i = 0; i < medTimes.length; i++) {
                                if (timeDiff === '' || timeDiff > Math.abs(moment().diff(moment(medTimeDate[i]), "minutes") )){
                                    timeDiff = Math.abs(moment().diff(moment(medTimeDate[i]), "minutes"));
                                    closestPastTime = medTimeDate[i];
                                    closestPastTimeIndex = i;
                                }
                                //if pass current time
                                if (moment(medTimeDate[i]).isBefore(timeNow)) {
                                    pastMed.push(moment(medTimes[i], "HHmm").format("HHmm"))
                                //still in the future
                                }else if (moment(medTimeDate[i]).isAfter(timeNow)) {
                                    futureMed.push(moment(medTimes[i], "HHmm").format("HHmm"))
                                }
                            }
                        }    
                        
                        if(closestPastTimeIndex === 0 && this.state.currentRecords.length >= 1){
                            let yesterdayLastMed = moment(medTimeDate[medTimeDate.length - 1]).add(-1, "day").toISOString()
                            durationDiff = moment(medTimeDate[closestPastTimeIndex]).diff(yesterdayLastMed, 'minutes')
                            percentDiff = timeDiff/moment(medTimeDate[closestPastTimeIndex]).diff(yesterdayLastMed, 'minutes')*100;

                        }else if(this.state.currentRecords === 0 ){
                            //if it is first record, don't let 
                            foundPreviousTime = true;
                        }
                        else{
                            durationDiff = moment(medTimeDate[closestPastTimeIndex]).diff(medTimeDate[closestPastTimeIndex-1], "minutes")
                            percentDiff = timeDiff/Math.abs(moment(medTimeDate[closestPastTimeIndex]).diff(medTimeDate[closestPastTimeIndex-1], "minutes"))*100;
                        }

                        if(percentDiff > (-25)){
                            foundPreviousTime = false;
                        }
                        for (let i = 0; i < this.state.currentRecords.length; i++) {
                            if (moment(this.state.currentRecords[i].date_time).toISOString() === closestPastTime) {
                                foundPreviousTime = true;
                            }
                        }
                        
                        let episodeStartDate = moment(this.state.lastEpisode.start_date).format("YYYY MM DD");
                        let episodeEndDate = moment(this.state.next_appt).format("YYYY MM DD");
                        
                        let arrThisEpisode = [];
                        let arrThisEpisodeUntilToday = [];
                        for(let m = moment(episodeStartDate); moment(m).isBefore(episodeEndDate); m.add(1,'days')){
                            for (let i = 0; i < medTimes.length; i ++){
                                arrThisEpisode.push(moment(m.format("YYYY-MM-DD") + " " + medTimes[i], "YYYY-MM-DD HHmm").toISOString())
                            }
                        }
                        for(let i = 0; i< arrThisEpisode.length; i ++){
                            if(moment(arrThisEpisode[i]).isBefore(moment())){
                                arrThisEpisodeUntilToday.push(arrThisEpisode[i])
                            }
                        }
                        for(let i = 0; i < arrThisEpisodeUntilToday.length; i++){
                            let existInRecords = false;
                            for(let j=0; j < this.state.currentRecords.length; j++){
                                if(arrThisEpisodeUntilToday[i] === this.state.currentRecords[j].date_time){
                                    existInRecords = true;
                                }
                            }    
                            if(!existInRecords){
                                let objAnswers = {
                                    date_time: moment(arrThisEpisodeUntilToday[i]).toISOString(),
                                    has_record: false,
                                }
                                console.log(objAnswers);
                                patientAPI.createNewRecord(localStorage.getItem("userId"), objAnswers)
                                    .then(res => console.log(res))
                                    .catch(err => console.log(err));
                                console.log("this data doesn't exist : ", arrThisEpisodeUntilToday[i]);
                            }
                        }
                        /* for (let i = 0; i < this.state.currentRecords.length; i++) {
                            console.log("current record of " + i + ", " +this.state.currentRecords[i].date_time);
                            if (!arrThisEpisodeUntilToday.includes(this.state.currentRecords[i].date_time)) {

                                console.log("update database with patient_data with med_taken = false at : " + this.state.currentRecords[i].date_time);
                            }else{
                                console.log("yay")
                            }
                        }*/

                        //console.log(arrThisEpisode);

                        console.log("finalized time diff : ", timeDiff);
                        console.log("PastMed:" + pastMed);
                        console.log("FutureMed:" + futureMed);
                        console.log(medTimes);
                        this.setState({
                            medTimes, 
                            pastMed,
                            futureMed,
                            closestPastTime,
                            foundPreviousTime,
                            durationDiff
                        }, function(){
                            console.log("State in patient: ", this.state);
                            if(this.state.foundPreviousTime){
                                this.props.history.push('/appointment');
                            }
                            
                        });
                    })
                })
                .catch(err => console.log("Error: " + err));
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


    render() {
        return (
            <Container fluid>
                
                <Container>
                    <Row>
                        <Col size='md-12'>

                        
                            {!this.state.foundPreviousTime && this.state.durationDiff ? 
                                <div>
                                    <Label>{moment(this.state.closestPastTime).format("YYYY-MM-DD hh:mm A")}</Label>
                                    <PatSurvey 
                                        physician ={this.state.physician}
                                        handleIncident={this.props.handleIncident} 
                                        handleFinishedCallback={this.handleFinishedCallback} 
                                        medTimes = {this.state.medTimes}
                                        pastMed={this.state.pastMed}
                                        closestPastTime={this.state.closestPastTime}
                                        foundPreviousTime={this.state.foundPreviousTime}
                                        durationDiff = {this.state.durationDiff}
                                    />
                                </div>

                                : 
                                    
                                    <Container fluid className="patSurvey">
                                    <br />
                                    <br />

                                        <Card classname = "tableCard"> 
                                            <CardBody>
                                                <CardTitle tag="h4">Patient survey not available.</CardTitle>
                                                <br />
                                                
                                                <p>You cannot fill out the patient survey yet as your account has not yet been set up by your physician to accept data. </p>
                                                <p>Please contact the physician who enrolled you in the application and ask them to create an episode for you so that you can complete the patient surveys as well as be remineded of when to take your medication and of clinic apointments. </p>
                                                <br />
                                                <p> The MedMonitor Team </p>
                                                </CardBody>
                                        </Card>

                                    </Container>
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
