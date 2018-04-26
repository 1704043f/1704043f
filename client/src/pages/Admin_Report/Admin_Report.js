import React, { Component } from "react";
import '../Admin/Admin.css';
import patientAPI from "../../utils/patientAPI";
import videoAPI from "../../utils/videoAPI";
import moment from 'moment'
import {
    Button,
    Container,
    Row, 
    Col
} from 'reactstrap';
import Chart from "../../components/Admin/Report/Chart";
import Video from "../../components/Admin/Report/Video";
import EpisodeInfo from "../../components/Admin/Report/EpisodeInfo";
import ReportHeader from "../../components/Admin/Report/Header";
import Medication from "../../components/Admin/Report/Medication";
import PatientInfo from "../../components/Admin/Report/PatientInfo";

import './Admin_Report.css';


class Admin_Report extends Component {
    state = { 
        patientId: "",

        patient: {},
        patientDetails: [],
        patientAppt: [],
        patientEpisodeDates: [],
        patientNumEpisodes: 0,
        episodeNumber: 1,
        
        patientEpisodeMeds: [],
        patientEpisodeNumRecords: 0,
        timePoints: [],
        lineChartData: [],
        barChartData: [],
        medsToolTips: [],

        episodesAllDates: [],
        episodesAllMeds: [],

        chartOne: true,
        chartMany: false,
        showMeds: true,

        medsBoxTitle: "",
        episodeDateString: "",

        videoDateTime: "",
        videoLink: "",
    };


    
    componentDidMount() {
        console.log(window.location.search.substring(4))
        this.loadPatientData();
    };

 // ++++++++++++ Load pateint data from DB (called by componentDidMount) +++++++++++++++++++++++++++++++

    loadPatientData = event => {
        patientAPI.findPatientInfoForAdmin(window.location.search.substring(4))
            .then(res => {

                let chartData = [];

                this.setState({patient: res.data});
                this.setState({patientDetails: this.state.patient.details});
                this.setState({patientAppt: this.state.patient.appointment});
                this.setState({patientNumEpisodes: this.state.patient.episode.length});

                chartData = this.processEpisode(this.state.patient, 1);

                this.setState({ patientEpisodeDates: chartData[0],
                                patientEpisodeMeds: chartData[1],
                                patientEpisodeNumRecords: chartData[2],
                                timePoints: chartData[3],
                                lineChartData: chartData[4],
                                barChartData: chartData[5],
                                medsToolTips: chartData[6],

                                showMeds: true,
                                medsBoxTitle: "Current Medications" })
                                

                videoAPI.findOne(window.location.search.substring(4))
                    .then(res => {
                        this.setState({ videoDateTime: res.data[0] ? moment(res.data[0].video_datetime).format('L') : "No video uploads.",
                                        videoLink: res.data[0] ? res.data[0].video_link : null })
                    })
  
            })
            .catch(err => console.log(err));
    };

 // ++++++++++++ Function to display a single episode ++++++++++++++++++++++++++++++++++++++++++++++

    displayEpisode = (episode) => {

        let chartData = [];

        chartData = this.processEpisode(this.state.patient, episode);

        this.setState({ patientEpisodeDates: chartData[0],
                        patientEpisodeMeds: chartData[1],
                        patientEpisodeNumRecords: chartData[2],
                        timePoints: chartData[3],
                        lineChartData: chartData[4],
                        barChartData: chartData[5],
                        medsToolTips: chartData[6],

                        chartOne: true,
                        chartMany: false,
                        showMeds: true, })
                        
    }


    // ++++++++++++ Event handlers for episode navigation buttons ++++++++++++++++++++++++++++++++++++++++++++++

    onClickedFirst = () => {
        this.state.episodeNumber = 1;
        this.displayEpisode(1);
    }

    onClickedNext = () => {
        this.state.episodeNumber = this.state.episodeNumber == 1 ? 1 : this.state.episodeNumber - 1 ;
        this.displayEpisode(this.state.episodeNumber);
    }

    onClickedCurrent = () => {
        this.state.episodeNumber = 1;
        this.displayEpisode(1);
    }

    onClickedPrevious = () => {
        this.state.episodeNumber =  this.state.episodeNumber == this.state.patientNumEpisodes ? this.state.episodeNumber : this.state.episodeNumber + 1;
        this.displayEpisode(this.state.episodeNumber)
    }

    onClickedLast = () => {
        this.state.episodeNumber =  this.state.patientNumEpisodes;
        this.displayEpisode(this.state.episodeNumber);
    }


    // ++++++++++++ Event handler for 'side by side' button +++++++++++++++++++++++++++++++++++++++++++++

    onClickedSideBySide = () => {
        console.log("sideBySide: " +  this.state.episodeNumber);
        //this.displayEpisode(1);
    }


    // ++++++++++++ Event handler for 'display all episodes' button +++++++++++++++++++++++++++++++++++++++++++++

    onClickedAll = (episodeRange1, episodeRange2) => {

        let chartData = [];

        chartData = this.processRangeEpisodes(this.state.patient, episodeRange1, episodeRange2)

        this.setState({ episodesAllDates: chartData[0],
                        episodesAllMeds: chartData[1],
                        episodesAllNumRecords: chartData[2],
                        lineChartData: chartData[3],
                        barChartData: chartData[4],
                        medsToolTips: chartData[5],

                        chartOne: false,
                        chartMany: true,
                        showMeds: false })
     }

     updateRange = (newRange) => {
        this.onClickedAll(0, newRange)

     }


    // ++++++++++++ Function to process data for single episode by time of day+++++++++++++++++++++++++++++++
    // ++++++++++++ Note, episode arguement is used as offset from last episode +++++++++++++++++++++++++++++

    processEpisode = (patient, episode) => {

        const patientEpisodes = patient.episode;
        const patientEpisode =  patientEpisodes[patientEpisodes.length - episode];
        const patientEpisodeMeds = patientEpisode.medications;
        const patientEpisodeRecords = patientEpisode.record;
        const patientEpisodeNumRecords = patientEpisodeRecords.length;
        const patientEpisodeStartDate = patientEpisode.start_date;
        const patientEpisodeEndDate = patientEpisodeRecords[patientEpisodeNumRecords-1].date_time;

        let record = [];
        let currentRecordDate = "";
        let previousRecordDate = "";
        let recordTime = "";

        let kickin = [], kickinAvg = [], kickinSD = []; 
        let wearoff = [], wearoffAvg = [], wearoffSD = [];
        let movement = [], movementAvg = [], movementSD = [];
        let sleepy = [], sleepyAvg = [], sleepySD = [];
        let offtime = [], offtimeAvg = [], offtimeSD = [];
        let tremor = [], tremorAvg = [], tremorSD = [];
        let walking = [], walkingAvg = [], walkingSD = [];
        let balance = [], balanceAvg = [], balanceSD = [];
        let sickness = [], sicknessAvg = [], sicknessSD = [];
        let dizziness = [], dizzinessAvg = [], dizzinessSD = [];
        let headache = [], headacheAvg = [], headacheSD = [];
        let drymouth = [], drymouthAvg = [], drymouthSD = [];

        let timePoint = [];
        let timePoints = [];
        let lineChartData = [];
        let barChartData = [];

        let i=0, j=-1;

        for (i=0; i<12; i++) {

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
        
        for (i=0; i<patientEpisodeNumRecords; i++) {
            
            record = patientEpisodeRecords[i];
            currentRecordDate = record.date_time.slice(0,10); 
            recordTime = record.date_time.slice(11,16);

            j<1 || currentRecordDate == previousRecordDate ? j++ : j=0;

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
            headache[j].push(record.side_effects.headaches);
            drymouth[j].push(record.side_effects.drymouth);
                
            previousRecordDate = currentRecordDate;
        }

        let averagesSy = []; 
        let averagesSe = [];
        let averageSy = [];
        let averageSe = [];
        let standardDeviationSy = [];
        let standardDeviationSe = [];
        
        for (i=0; i<timePoints.length; i++) {
            kickinAvg[i] = this.average(kickin[i]); kickinSD[i] = this.standardDeviation(kickin[i]); averagesSy.push(kickinAvg[i]); 
            wearoffAvg[i] = this.average(wearoff[i]); wearoffSD[i] = this.standardDeviation(wearoff[i]); averagesSy.push(wearoffAvg[i]); 
            movementAvg[i] = this.average(movement[i]); movementSD[i] = this.standardDeviation(movement[i]); averagesSy.push(movementAvg[i]); 
            sleepyAvg[i] = this.average(sleepy[i]); sleepySD[i] = this.standardDeviation(sleepy[i]), averagesSy.push(sleepyAvg[i]); 
            offtimeAvg[i] = this.average(offtime[i]); offtimeSD[i] = this.standardDeviation(offtime[i]); averagesSy.push(offtimeAvg[i]); 
            tremorAvg[i] = this.average(tremor[i]); tremorSD[i] = this.standardDeviation(tremor[i]); averagesSy.push(tremorAvg[i]); 
            walkingAvg[i] = this.average(walking[i]); walkingSD[i] = this.standardDeviation(walking[i]); averagesSy.push(walkingAvg[i]); 
            balanceAvg[i] = this.average(balance[i]); balanceSD[i] = this.standardDeviation(balance[i]); averagesSy.push(balanceAvg[i]); 
            sicknessAvg[i] = this.average(sickness[i]); sicknessSD[i] = this.standardDeviation(sickness[i]); averagesSe.push(sicknessAvg[i]); 
            dizzinessAvg[i] = this.average(dizziness[i]); dizzinessSD[i] = this.standardDeviation(dizziness[i]); averagesSe.push(dizzinessAvg[i]);
            headacheAvg[i] = this.average(headache[i]);  headacheSD[i] = this.standardDeviation(headache[i]); averagesSe.push(headacheAvg[i]); 
            drymouthAvg[i] = this.average(drymouth[i]);  drymouthSD[i] = this.standardDeviation(drymouth[i]); averagesSe.push(drymouthAvg[i]); 

            averageSy[i] = this.average(averagesSy); 
            averageSe[i] = this.average(averagesSe);
            standardDeviationSy[i] = this.standardDeviation(averagesSy)
            standardDeviationSe[i] = this.standardDeviation(averagesSe)

            averagesSy = [];
            averagesSe = [];
        }

        let obj = {};

        for (i=0; i<timePoints.length; i++) {

            obj = {
                name: timePoints[i], 

                Kickin: kickinAvg[i]*20, KickinSD: kickinSD[i]*20, 
                Wearoff: wearoffAvg[i]*20, WearoffSD: wearoffSD[i]*20,
                Movement: movementAvg[i]*20, MovementSD: movementSD[i]*20,
                Tiredness: sleepyAvg[i]*20, TirednessSD: sleepySD[i]*20,
                Offtime: offtimeAvg[i]*20, OfftimeSD: offtimeSD[i]*20,
                Tremor: tremorAvg[i]*20, TremorSD: tremorSD[i]*20,
                Walking: walkingAvg[i]*20, WalkingSD: walkingSD[i]*20,
                Balance: balanceAvg[i]*20, BalanceSD: balanceSD[i]*20,
                Average: averageSy[i]*20, AverageSD: standardDeviationSy[i]*20,

                Sickness: sicknessAvg[i]*20, SicknessSD: sicknessSD[i]*20,
                Dizziness: dizzinessAvg[i]*20, DizzinessSD: dizzinessSD[i]*20,
                Headache: headacheAvg[i]*20, HeadacheSD: headacheSD[i]*20,
                Drymouth: drymouthAvg[i]*20, DrymouthSD: drymouthSD[i]*20,
                Average_: averageSe[i]*20, Average_SD: averageSe[i]*20
            };

            lineChartData.push(obj) 
        }

        for (i=0; i<patientEpisodeNumRecords; i++) {
            
            record = patientEpisodeRecords[i];
            currentRecordDate = record.date_time.slice(0,10); 
            recordTime = record.date_time.slice(11,16);

            if (i>1 && currentRecordDate !== previousRecordDate) { 
                barChartData.push(obj);
                obj = {} 
            }

            obj = {
                name: moment(currentRecordDate).format('l'),
                Falls: record.emergencies.falls ? (obj.Falls ? Number(obj.Falls)+1 : 1) : (obj.Falls ? Number(obj.Falls) : 0),
                Choking: record.emergencies.choking ? (obj.Choking ? Number(obj.Choking)+1 : 1) : (obj.Choking ? Number(obj.Choking) : 0),
                Freezing: record.emergencies.freezing ? (obj.Freezing ? Number(obj.Freezing)+1 : 1) : (obj.Freezing ? Number(obj.Freezing) : 0),
                Hallucinations: record.emergencies.hallucination ? (obj.Hallucinations ? Number(obj.Hallucinations)+1 : 1) : (obj.Hallucinations ? Number(obj.Hallucinations) : 0)
            }

            previousRecordDate = currentRecordDate; 
        }

        barChartData.push(obj);


        let data=[];
        data.push([patientEpisodeStartDate, patientEpisodeEndDate]);
        data.push(patientEpisodeMeds);
        data.push(patientEpisodeNumRecords);
        data.push(timePoints);
        data.push(lineChartData);
        data.push(barChartData);
        data.push(this.medTooltips(patientEpisodeMeds, timePoints))


        console.log(data)
        return data;

    } // end function



    // ++++++++++++ Function to process data for range of past episodes by episode +++++++++++++++++++++++

    processRangeEpisodes = (patient, range1, range2) => {

        const patientEpisodes = patient.episode;
        const patientNumEpisodes = patientEpisodes.length;

        //validate ranges depending on slider output

        let record = {};

        let lineChartData = [];
        let barChartData = [];

        let patientEpisodeAllMeds = [];
        let patientEpisodesAllStartDate = "";
        let patientEpisodesAllEndDate = "";
        let patientEpisodesAllNumRecords = 0;

        let kickin = [], kickinAvg = [], kickinSD = []; 
        let wearoff = [], wearoffAvg = [], wearoffSD = [];
        let movement = [], movementAvg = [], movementSD = [];
        let sleepy = [], sleepyAvg = [], sleepySD = [];
        let offtime = [], offtimeAvg = [], offtimeSD = [];
        let tremor = [], tremorAvg = [], tremorSD = [];
        let walking = [], walkingAvg = [], walkingSD = [];
        let balance = [], balanceAvg = [], balanceSD = [];
        let sickness = [], sicknessAvg = [], sicknessSD = [];
        let dizziness = [], dizzinessAvg = [], dizzinessSD = [];
        let headache = [], headacheAvg = [], headacheSD = [];
        let drymouth = [], drymouthAvg = [], drymouthSD = [];

        let falls = [];
        let choking = [];
        let freezing = [];
        let hallucinations = [];  

        let dateRange = [];
        
        let i=0;

        for (i=0; i<12; i++) {

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
        
        for (i=range1; i<range2; i++) {

            let objSySe = {};
            let objAlerts = {};

            let patientEpisode =  patientEpisodes[patientNumEpisodes - (i + 1)];
            let patientEpisodeMeds = patientEpisode.medications;
            let patientEpisodeRecords = patientEpisode.record;
            let patientEpisodeNumRecords = patientEpisodeRecords.length;  
            let patientEpisodeStartDate = patientEpisode.start_date;
            let patientEpisodeEndDate = patientEpisodeRecords[patientEpisodeNumRecords-1].date_time;

            patientEpisodesAllNumRecords += patientEpisodeNumRecords;

            let j=0;
            for (j=0; j<patientEpisodeNumRecords; j++) {

                record = patientEpisodeRecords[j];
                
                kickin[i].push(record.symptoms.kickin);
                wearoff[i].push(record.symptoms.wearoff);
                movement[i].push(record.symptoms.movement);
                sleepy[i].push(record.symptoms.sleepy);
                offtime[i].push(record.symptoms.offtime);
                tremor[i].push(record.symptoms.tremor);
                walking[i].push(record.symptoms.walking);
                balance[i].push(record.symptoms.balance);
                sickness[i].push(record.side_effects.sickness);
                dizziness[i].push(record.side_effects.dizziness);
                headache[i].push(record.side_effects.headaches);
                drymouth[i].push(record.side_effects.drymouth)
            }

            let averagesSy = []; 
            let averagesSe = [];

            kickinAvg[i] = this.average(kickin[i]); kickinSD[i] = this.standardDeviation(kickin[i]); averagesSy.push(kickinAvg[i]); 
            wearoffAvg[i] = this.average(wearoff[i]); wearoffSD[i] = this.standardDeviation(wearoff[i]); averagesSy.push(wearoffAvg[i]); 
            movementAvg[i] = this.average(movement[i]); movementSD[i] = this.standardDeviation(movement[i]); averagesSy.push(movementAvg[i]); 
            sleepyAvg[i] = this.average(sleepy[i]); sleepySD[i] = this.standardDeviation(sleepy[i]), averagesSy.push(sleepyAvg[i]); 
            offtimeAvg[i] = this.average(offtime[i]); offtimeSD[i] = this.standardDeviation(offtime[i]); averagesSy.push(offtimeAvg[i]); 
            tremorAvg[i] = this.average(tremor[i]); tremorSD[i] = this.standardDeviation(tremor[i]); averagesSy.push(tremorAvg[i]); 
            walkingAvg[i] = this.average(walking[i]); walkingSD[i] = this.standardDeviation(walking[i]); averagesSy.push(walkingAvg[i]); 
            balanceAvg[i] = this.average(balance[i]); balanceSD[i] = this.standardDeviation(balance[i]); averagesSy.push(balanceAvg[i]); 
            sicknessAvg[i] = this.average(sickness[i]); sicknessSD[i] = this.standardDeviation(sickness[i]); averagesSe.push(sicknessAvg[i]); 
            dizzinessAvg[i] = this.average(dizziness[i]); dizzinessSD[i] = this.standardDeviation(dizziness[i]); averagesSe.push(dizzinessAvg[i]);
            headacheAvg[i] = this.average(headache[i]);  headacheSD[i] = this.standardDeviation(headache[i]); averagesSe.push(headacheAvg[i]); 
            drymouthAvg[i] = this.average(drymouth[i]);  drymouthSD[i] = this.standardDeviation(drymouth[i]); averagesSe.push(drymouthAvg[i]); 

            dateRange[i] = `${moment(patientEpisodeStartDate).format('MM/DD')} - ${moment(patientEpisodeEndDate).format('MM/DD')}`,
    
            objSySe = {
                name: dateRange[i],
                Kickin: kickinAvg[i]*20, KickinSD: kickinSD[i]*20, 
                Wearoff: wearoffAvg[i]*20, WearoffSD: wearoffSD[i]*20,
                Movement: movementAvg[i]*20, MovementSD: movementSD[i]*20,
                Tiredness: sleepyAvg[i]*20, TirednessSD: sleepySD[i]*20,
                Offtime: offtimeAvg[i]*20, OfftimeSD: offtimeSD[i]*20,
                Tremor: tremorAvg[i]*20, TremorSD: tremorSD[i]*20,
                Walking: walkingAvg[i]*20, WalkingSD: walkingSD[i]*20,
                Balance: balanceAvg[i]*20, BalanceSD: balanceSD[i]*20,

                Sickness: sicknessAvg[i]*20, SicknessSD: sicknessSD[i]*20,
                Dizziness: dizzinessAvg[i]*20, DizzinessSD: dizzinessSD[i]*20,
                Headache: headacheAvg[i]*20, HeadacheSD: headacheSD[i]*20,
                Drymouth: drymouthAvg[i]*20, DrymouthSD: drymouthSD[i]*20,
            };

            lineChartData.unshift(objSySe);

            for (j=0; j<patientEpisodeNumRecords; j++) {

                record = patientEpisodeRecords[j];
            
                objAlerts = {
                    name: dateRange[i],
                    Falls: record.emergencies.falls ? (objAlerts.Falls ? Number(objAlerts.Falls)+1 : 1) : (objAlerts.Falls ? Number(objAlerts.Falls) : 0),
                    Choking: record.emergencies.choking ? (objAlerts.Choking ? Number(objAlerts.Choking)+1 : 1) : (objAlerts.Choking ? Number(objAlerts.Choking) : 0),
                    Freezing: record.emergencies.freezing ? (objAlerts.Freezing ? Number(objAlerts.Freezing)+1 : 1) : (objAlerts.Freezing ? Number(objAlerts.Freezing) : 0),
                    Hallucinations: record.emergencies.hallucination ? (objAlerts.Hallucinations ? Number(objAlerts.Hallucinations)+1 : 1) : (objAlerts.Hallucinations ? Number(objAlerts.Hallucinations) : 0),
                }

            }

            barChartData.unshift(objAlerts);  

            patientEpisodeAllMeds.push(patientEpisodeMeds)

            patientEpisodesAllStartDate = patientEpisode.start_date;
            if (i === range1) {patientEpisodesAllEndDate = patientEpisodeRecords[patientEpisodeNumRecords-1].date_time;}
            patientEpisodesAllNumRecords += patientEpisodeNumRecords;

        }

            let data=[];
            data.push([patientEpisodesAllStartDate, patientEpisodesAllEndDate]);
            data.push(patientEpisodeAllMeds);
            data.push(patientEpisodesAllNumRecords);
            data.push(lineChartData);
            data.push(barChartData);
            data.push(this.medTooltipsAll(patientEpisodeAllMeds, dateRange))

            console.log(data)
            return data;

    } // end function


    
     // ++++++++++++ Function to generate medication tooltips for line charts +++++++++++++++++++++++++++++++

     medTooltips = (meds, timePoints) => {

        let medTimes = [];
        let str = "";

        timePoints.map((time, index) => {
            medTimes.push( [] )
            medTimes[index].push(time)

            meds.map(med => {
                if (med.times.includes(time.replace(":", ""))) {
                    str = med.medication.slice(0, med.medication.indexOf("(")) + " " +
                    med.dose + " " +  med.route;

                    medTimes[index].push(str)
                }
             })
        })
        //console.log(medTimes)
         return medTimes;
     }  


        // ++++++++++++ Function to generate medication tooltips for the bar charts +++++++++++++++++++++++++++++++

        medTooltipsAll = (meds, dates) => {

        let medDates = [];
        let str = "";

        dates.map((date, index) => {
            medDates.push( [] )
            medDates[index].push(date)

            meds[index].map(med => {
                str = med.medication.slice(0, med.medication.indexOf("(")) + 
                med.dose + " " +  med.route + " at ";

                    med.times.map(time => {
                        str += time + ", ";
                    })

                medDates[index].push(str)
            })
                
        })

        console.log(medDates)
        return medDates;

        }  

    // ++++++++++++ Function to calculate standard deviations of chart data +++++++++++++++++++++++++++++++

     standardDeviation = (values) => {
        let avg = this.average(values);
        
        let squareDiffs = values.map(function(value){
          let diff = value - avg;
          let sqrDiff = diff * diff;
          return sqrDiff;
        });
        
        let avgSquareDiff = this.average(squareDiffs);
       
        let stdDev = Math.sqrt(avgSquareDiff).toFixed(2);
        return stdDev;
      }

      // ++++++++++++ Function to calculate average of chart data +++++++++++++++++++++++++++++++
       
        average = (data) => {
            let sum = data.reduce(function(sum, value){
            return sum + Number(value);
            }, 0);
        
            let avg = (sum / data.length).toFixed(2);
            return avg;
        }


 // ++++++++++++ Render Chart component+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    render() {
        return (
            <Container>
                <ReportHeader />
                <hr />
                <Container fluid>
                    <Row>
                        <Col md='6'>
                            <PatientInfo 
                                patientNumber = {this.state.patientDetails.patient_number}
                                firstName = {this.state.patientDetails.first_name}
                                lastName = {this.state.patientDetails.last_name}
                            />
                            {/* <Video /> */}
                        </Col>

                        <Col md='6'>
                            <EpisodeInfo 
                                episodeDates = {this.state.patientEpisodeDates}
                                episodeNumRecords = {this.state.patientEpisodeNumRecords}
                                episodeCount = {this.state.episodeNumber}
                            />
                        </Col>
                        <hr />
                    </Row>

                    <Row>

                        <Col md='5'>
                            <Video className="text-left"
                                videoDateTime = {this.state.videoDateTime}
                                videoLink = {this.state.videoLink}
                            />
                        </Col>

                        <Col md='7' className="chartBtnGroup">                     
                            <Container className="adminBtnGroup">
                            <span style={{fontWeight: "bold"}}>Episode: </span>
                                <Button className="adminReportBtn" color="primary" size="sm" onClick = {() => this.onClickedFirst()}>&lt;&lt;</Button>
                                <Button className="adminReportBtn" color="primary" size="sm" onClick = {() => this.onClickedNext()}>&lt;</Button>
                                <Button className="adminReportBtn" color="primary" size="sm" onClick = {() => this.onClickedCurrent(this.state.episodeNumber)}>current</Button>
                                <Button className="adminReportBtn" color="primary" size="sm" onClick = {() => this.onClickedPrevious()}>&gt;</Button>
                                <Button className="adminReportBtn" color="primary" size="sm" onClick = {() => this.onClickedLast()}>&gt;&gt;</Button>
                                <Button className="adminReportBtn" color="primary" size="sm" onClick = {() => this.onClickedSideBySide()}>side by side</Button>

                                <Button className="adminReportBtn" color="primary" size="sm" onClick = {() => this.onClickedAll(0,5)}>all</Button>
                                <a href="/admin">
                                    <Button className="adminReportBtn" color="primary" size="sm">&nbsp;&nbsp;&nbsp;BACK&nbsp;&nbsp;&nbsp;</Button>
                                </a>
                            </Container>
                        </Col>

                    </Row>

                    <Container style={{display: this.state.showMeds ? "block" : "none"}}>
                        <Row>
                            <Col md="4"> 
                                <Medication
                                    medications = {this.state.patientEpisodeMeds}
                                    showMeds = {this.state.showMeds}
                                    episodeDates = {this.state.patientEpisodeDates}
                                    episodeCount = {this.state.episodeNumber}
                                />
                            </Col>
                            <Col md="8">
                                <Chart 
                                    lineChartData = {this.state.lineChartData}
                                    barChartData =  {this.state.barChartData}
                                    chartOne = {this.state.chartOne}
                                    chartMany = {this.state.chartMany}
                                    medsToolTips = {this.state.medsToolTips}
                                />
                            </Col>
                        </Row>
                    </Container>

                    <Container style={{display: this.state.showMeds ? "none" : "block"}}>

                        <Row>
                            <Col md="12">
                                <Chart 
                                    lineChartData = {this.state.lineChartData}
                                    barChartData =  {this.state.barChartData}
                                    chartOne = {this.state.chartOne}
                                    chartMany = {this.state.chartMany}
                                    medsToolTips = {this.state.medsToolTips}
                                    rangeMax = {this.state.patientNumEpisodes}
                                    updateRange = {(range) => this.updateRange(range)}
                                />
                            </Col>
                        </Row>
                    </Container>

                </Container>
            </Container>
        )
    }
};

export default Admin_Report;
