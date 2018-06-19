import React from 'react';
import QButton from "../Button";
import Alert from 'react-s-alert';
import "./Checkbox.css";

import { 
    Card,
    Button,
    CardHeader,
    CardText,
} from 'reactstrap';

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
 
        this.state = { 
            cSelected: [],
            answered : [],
            questionNum : this.props.questionNum
         };
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
    }
    componentDidMount(){

    }
    onCheckboxBtnClick(selected) {
        if(selected === 'None Of These'){
            this.setState({
                cSelected : ['None Of These']
            }, function() {
                console.log(this.state.cSelected);
            })
            //we remove all the current state of cSelected
        }else{
            let newState = this.state.cSelected
            newState = newState.filter(item => item !== 'None Of These')
            this.setState({
                cSelected : newState
            }, function() {
                const index = this.state.cSelected.indexOf(selected);
                if (index < 0) {
                    this.state.cSelected.push(selected);
                } else {
                    this.state.cSelected.splice(index, 1);
                }
                this.setState({ cSelected: this.state.cSelected }, function(){console.log(this.state.cSelected)});
            })
            
        }
        
        
    }
    validateAnswer = (label, answer) => {
        let valid = true;
        if(!answer || answer.length=== 0){
            valid = false;
            Alert.error('Question cannot be left unanswered.', {
                position : 'top',
                effect: 'stackslide',
            });
        }else if(label === 'emergencies'){
            console.log("here, answer and label is : " , label, answer, answer.length);
            if(answer.length >1 && answer.includes("None Of These")){
                valid = false;
                Alert.error(`You have selected 'None Of These' with other symptoms`, {
                    position : 'top',
                    effect: 'stackslide',
                });
            }
        }else{
            Alert.closeAll();
        }
        return valid
    }

    handleSubmit(event) {
        if(this.validateAnswer(this.props.label, this.state.cSelected)){
            // Don't perform an actual form submission
            event.preventDefault();
            this.setState({
                answer : this.state.cSelected
            }, function(){
                this.props.handleCompletedCallback(this.props.label.toLowerCase(), this.state.answer);
                this.props.handleQuestionCallback()
        
            });
        }
    }

    render() {
        return(
                this.props.firstQuestion === 1 ? 

                <Card className="patSurveyCard featureCard" body fluid inverse>
                    <CardHeader tag="h4" className="patSurveyHeader">{this.props.survHeader}
                    </CardHeader>
                    <Card className="surveyQuestions">
                        <CardText><h4 className="currentQuest">{this.props.question}</h4></CardText>

                    <div className="survChkGroup">
                        {this.props.data_value.map((answer, index) => 

                            <QButton 
                                key={index}
                                answer={this.props.answers[index]}
                                index = {index}
                                survHeader = {this.props.survHeader}
                                className = {this.props.className}
                                color = {this.props.color}
                                onClickHandle = {this.onCheckboxBtnClick}
                                active = {this.state.cSelected ? this.state.cSelected : null}
                                data_value = {this.props.data_value}
                                selectionType = {this.props.selectionType}
                            >
                            </QButton>
                        )}
                    </div>
                    <br>
                    </br>
                    {/* <p className="chkSelected">(Checkbox) You Selected: {JSON.stringify(this.state.cSelected)}</p> */}

                        <Button id="topFocus" className="bttn questSubmitBtn" color="secondary" onClick={(e) => this.handleSubmit(e)} size="lg" block>
                            <h4 className="subBtnText" >Submit Your Answer</h4>
                        </Button>
                    </Card>
                </Card>
                : 
                null
        )
    }
}




