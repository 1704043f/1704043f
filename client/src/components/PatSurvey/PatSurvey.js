// import React from 'react';
import React, { Component } from "react";

import "./PatSurvey.css";
import QCheckbox from "../Patient/Survey/Checkbox";
import QRadio from "../Patient/Survey/Radio";
import patientAPI from "../../utils/patientAPI";
import alertAPI from "../../utils/alertAPI";
import moment from 'moment';
import { 
    Container,
    Card,
    CardHeader,
    Progress
} from 'reactstrap';


var questions = [{
    
    survHeader: 'MEDICATION',
    question: 'Are You Current With Your Parkinson\'s Medication?',
    answers: ['Yes, I Am', 'No, I Am Not'],
    color: ['green', 'red'],
    value: [1, 0],
    className: ['survRadBtnGreen', 'survRadBtnRed'],
    label: "meds_taken",
    selectionType: "radio",
    answered : '',
    firstQuestion : 1,
    questionNum : 0
},

// ---------- emergncy symptoms questions ---------

{
    survHeader: 'WORRYING SYMPTOMS',
    question: 'Since taking your LAST Parkinson\'s medication: have you had any:',
    answers: ['Falls', 'Freezing Of Gait', 'Choking On Food', 'Hallucinations', 'None Of These'],
    color: ['red', 'red', 'red', 'red', 'green'],
    value: [0, 0, 0, 0, 0],
    className: ['survChkBtnRed', 'survChkBtnRed', 'survChkBtnRed', 'survChkBtnRed','survChkBtnGreen'],
    selectionType: "checkbox",
    answered : '',
    label: "emergencies",
    firstQuestion : 0,
    questionNum : 1
},

// ---------- general parkinson's questions ---------

{
    survHeader: 'KICK IN',
    question: 'Since taking your LAST Parkinson\'s medication: how long did it take to kick in?',
    answers: ['Immediately', 'After 15 Minutes', 'After 30 Minutes', 'After 1 Hour', 'After More Than 1 Hour'],
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    answered : '',
    label: "kickin",
    firstQuestion : 0,
    questionNum : 2
},
{
    survHeader: 'WEARING OFF',
    question: 'Since taking your LAST Parkinson\'s medication: if wearing off, how long ago.?',
    answers: ['Did Not Wear Off', '15 Minutes Ago', '30 Minutes Ago', '1 Hours Ago', 'More Than 1 hour Ago'],
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    answered : '',
    label: "wearoff",
    firstQuestion : 0,
    questionNum : 3
},

{
    survHeader: 'MOVEMENT',
    question: 'Since taking your LAST Parkinson\'s medications: have you been able to move comfortable?',
    answers: ['All Of The Time', 'Most Of The Time', 'About Half The Time', 'Less Than Half The Time', 'None Of The Time'],
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "movement",
    answered : '',
    firstQuestion : 0,
    questionNum : 4
},

{
    survHeader: 'SLEEPY',
    question: 'Since taking your LAST Parkinson\'s medication: how tired have you been?',
    answers: ['Not Tired At All', 'Some Tiredness', 'Sleepy', 'Very Sleepy', 'Exhausted All The Time'],
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "sleepy",
    answered : '',
    firstQuestion : 0,
    questionNum : 5

},

{
    survHeader: 'OFF TIME',
    question: 'Right Now: do you feel off (slow, stiff, difficulty walking)?',
    answers: ['Normal', 'A Little Slow', 'Slow', 'Very Slow', 'Can\'t Move At All'],
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "offtime",
    answered : '',
    firstQuestion : 0,
    questionNum : 6
},

{
    survHeader: 'TREMORS',
    question: 'Right Now: if you suffer from tremor, how is it now?',
    answers: ['No Tremor', 'Bothering Me A Little', 'Worse Than Normal', 'Quite Bad', 'Very Bad'],
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "tremor",
    answered : '',
    firstQuestion : 0,
    questionNum : 7
},

{
    survHeader: 'WALKING',
    question: 'Right Now: how is your walking?',
    answers: ['Good', 'A Little Slow', 'Slower Than Normal', 'Very Slow, Shuffling', 'Can\'t Walk At All'],
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "walking",
    answered : '',
    firstQuestion : 0,
    questionNum : 8
},

{
    survHeader: 'BALANCE',
    question: 'Right Now: how is your balance when you stand or walk?',
    answers: ['Good', 'A Little Unsteady', 'Unsteady', 'Very Unsteady', 'Too Unsteady To Stand'],
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "balance",
    answered : '',
    firstQuestion : 0,
    questionNum : 9
},

// ---------- side effects questions ---------

{
    survHeader: 'NAUSEA AND VOMITING',
    question: 'Since taking your last Parkinson\'s medication: Have you had any nausea or sickness?',
    answers: ['None', 'A Little Nausea', 'Frequent Nausea', 'Continual Nausea', 'Vomiting'],
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "sickness",
    answered : '',
    firstQuestion : 0,
    questionNum : 10
},

{
    survHeader: 'DIZZINESS/LIGHTHEADEDNESS',
    question: 'Since taking your last Parkinson\'s medication: Have you felt dizzy or lightheaded?',
    answers: ['None', 'Very Occasionally', 'Yes, When I Stand Up', 'All The Time', 'To Dizzy To Stand Up'],
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "dizziness",
    answered : '',
    firstQuestion : 0,
    questionNum : 11
},

{
    survHeader: 'HEADACHES',
    question: 'Since taking your last Parkinson\'s medication: Have you had any headache?',
    answers: ['None', 'A Little/Occasionally', 'Mild/Continual', 'Quite Severe/On & Off', 'Severe/All The Time'],
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "headaches",
    answered : '',
    firstQuestion : 0,
    questionNum : 12
},

{
    survHeader: 'DRY MOUTH/BLURRED VISION',
    question: 'Since taking your last Parkinson\'s medication: Have you had any feelings of dry mouth and/or blurred vision?',
    answers: ['None', 'Occasionally', 'On And Off', 'Most Of The Time', 'All The Time'],
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    answered : '',
    label: "drymouth",
    firstQuestion : 0,
    questionNum : 13
},
];





class PatSurvey extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            questions : questions,
            completed : [],
        })
    }
    
    handleCompletedCallback = (label, answer) => {
        
        if(label === 'emergencies'){
            let newAnswer = [0,0,0,0];
            for(let i =0; i< answer.length; i++){
                if(answer[i] === questions[0].answers[0]){
                    newAnswer[0] = 1;
                }else if(answer[i] === questions[0].answers[1]){
                    newAnswer[1] = 1;
                }else if(answer[i] === questions[0].answers[2]){
                    newAnswer[2] = 1;
                }else if(answer[i] === questions[0].answers[3]){
                    newAnswer[3] = 1;
                }
            }
            if(!answer.includes("None Of These")){
                let stringAnswer = ""
                answer.map((x) => {
                    stringAnswer += x + ","
                })

                this.props.handleIncident(stringAnswer, localStorage.getItem("patient_number"))
                //save emergencies to alertEmergencies collection
                let emergencyObj = {
                    alert_firstname : localStorage.getItem("firstName"),
                    alert_lastname : localStorage.getItem("lastName"),
                    alert_hospnum : localStorage.getItem("patient_number"),
                    alert_type : {
                        fall: newAnswer[0] === 1 ? "falls" : null,
                        freezing: newAnswer[1] === 1 ? "freezing" : null,
                        choking: newAnswer[2] === 1 ? "choking": null,
                        hallucination: newAnswer[3] === 1 ? "hallucination" : null
                    },
                    alert_datetime : moment(),
                    alert_physician : this.props.physician,
                    alert_patient_id : localStorage.getItem("userId")
                }
                //TODO: 
                alertAPI.create(emergencyObj)
                        .then(res => console.log(res))
                        .catch(err => console.log(err));
            }
            answer = newAnswer;
        }
        let newCompleted = this.state.completed;
        newCompleted[label] = answer
        this.setState({
            completed : newCompleted
        })
        
    };
    saveAnswersToDb = () =>{
        let objAnswers ={
            date_time : Date.now(),
            meds_taken : this.state.completed.meds_taken,
            emergencies : {
                falls : this.state.completed.emergencies[0],
                freezing : this.state.completed.emergencies[1],
                choking : this.state.completed.emergencies[2],
                hallucination : this.state.completed.emergencies[3],
            },
            symptoms : {
                kickin : this.state.completed.kickin,
                wearoff : this.state.completed.wearoff,
                movement : this.state.completed.movement,
                sleepy : this.state.completed.sleepy,
                offtime : this.state.completed.offtime,
                tremor : this.state.completed.tremor,
                walking : this.state.completed.walking,
                balance : this.state.completed.balance,
            },
            side_effects: {
                sickness : this.state.completed.sickness,
                dizziness : this.state.completed.dizziness,
                headaches : this.state.completed.headaches,
                drymouth : this.state.completed.drymouth,
            }
        }
        patientAPI.createNewRecord(localStorage.getItem("userId"), objAnswers)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    handleQuestionCallback = () =>{
        let newQuestions = questions
        newQuestions.splice(0,1);
        if(newQuestions.length > 0 ){
            newQuestions[0].firstQuestion = 1;
            this.setState({
                questions : newQuestions
            })

            // Scroll the window to the top of the topFocus ID
            //const topFocusElement = document.getElementById('topFocus');
            //const introsurvCardElement = document.getElementsByClassName('introsurvCard');
            const navbarElement = document.getElementsByClassName('navbar');
            const offsetNum = navbarElement[0].offsetHeight;
        
            
            window.scrollTo(0, offsetNum);

            
        }else if(newQuestions.length === 0){
            this.props.handleFinishedCallback();
            this.saveAnswersToDb();
            this.props.getBackMessage("You have completed the questionaires")
            this.props.getBackMessageStatus("success");
        }        
    }
    handleProgressBar = (answered) =>{

        let percentage = 100 - (questions.length/14 * 100);
        return(
            <Container>
                <Progress animated color="success" value={percentage} />
            </Container>
        )
    }

    render() {
        return (
        this.state.questions.length > 0 ?
            <Container fluid className="patSurvey">
                {this.state.questions.length === 14 ?

                    <Card className="introsurvCard" fluid body inverse style={{ backgroundColor: '#2d5366', borderColor: '#2d5366' }}>
                        <CardHeader tag="h4" className="introsurvCardHeader">Tell Us About Your Parkinson's Symptoms</CardHeader>
                    </Card>

                : 
                            null
                            /* // <div>
                            //     {this.handleProgressBar(`${this.state.answered}`)}
                            // </div> */
                       } 
                {
                    this.state.questions.map( (x,i) => {
                        return(
                        this.state.questions ?
                            x.selectionType  === "radio" ?
                            
                                <QRadio
                                    key = {x.survHeader}
                                    label = {x.label}
                                    data_value = {x.value}
                                    survHeader = {x.survHeader}
                                    question = {x.question}
                                    answers = {x.answers}
                                    selectionType = {x.selectionType}
                                    className = {x.className}
                                    color = {x.color}
                                    answered = {x.answered}
                                    firstQuestion = {x.firstQuestion}
                                    questionNum = {x.questionNum}
                                    handleCompletedCallback = {this.handleCompletedCallback}
                                    handleQuestionCallback = {this.handleQuestionCallback}
                                    getBackMessage = {this.props.getBackMessage}
                                    getBackMessageStatus  = {this.props.getBackMessageStatus}
                                >
                                </QRadio>
                            :   
                                <QCheckbox
                                    key = {`${i}` }
                                    label={x.label}
                                    data_value={x.value}
                                    survHeader = {x.survHeader}
                                    question = {x.question}
                                    answers = {x.answers}
                                    selectionType = {x.selectionType}
                                    className = {x.className}
                                    color = {x.color}
                                    answered = {x.answered}
                                    firstQuestion = {x.firstQuestion}
                                    questionNum = {x.questionNum}
                                    handleCompletedCallback = {this.handleCompletedCallback}
                                    handleQuestionCallback = {this.handleQuestionCallback}
                                    getBackMessage = {this.props.getBackMessage}
                                    getBackMessageStatus  = {this.props.getBackMessageStatus}
                                >
                                </QCheckbox>
                        :
                        null
                        )
                    })
                }
            </Container>
            :
            null
        );
    }
}

export default PatSurvey;

