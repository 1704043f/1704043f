import React from 'react';
import QButton from "../Button";
import "./Radio.css";

import { 
    Card,
    Button,
    CardHeader,
    CardText,
} from 'reactstrap';

export default class Radio extends React.Component {
    constructor(props) {
        super(props);

        this.state = { rSelected: '' };

        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    onRadioBtnClick(rSelected) {
        
        this.setState({ rSelected }, function(){
        });
        
    }
    componentDidMount() {

    }
    validateAnswer = (label, answer) => {
        let valid = true;
        if(answer === ''){
            valid = false;
            this.props.getBackMessage("Question cannot be left unaswered.");
            this.props.getBackMessageStatus("danger");
        }else{
            this.props.getBackMessage(null);
            this.props.getBackMessageStatus(null);
        }
        return valid
    }
    handleSubmit(event) {
        if(this.validateAnswer(this.props.label, this.state.rSelected)){
            // Don't perform an actual form submission
            event.preventDefault();
            this.setState({
                answer : this.state.rSelected
            }, function(){
                this.props.handleCompletedCallback(this.props.label.toLowerCase(), this.state.answer);
                this.props.handleQuestionCallback();

            });
        }
    }

    render() 
    {
        return(
                this.props.firstQuestion === 1 ? 
                
                <Card key={this.props.survHeader} className="patSurveyCard" body inverse style={{ backgroundColor: '#2d5366', borderColor: '#2d5366' }}>
                    
                        <CardHeader tag="h4" className="patSurveyHeader">{this.props.survHeader}</CardHeader>
                        <Card className="surveyQuestions">
                            <CardText><h4 className="currentQuest">{this.props.question}</h4></CardText>
                            

                            <div className="survRadGroup">
                                {this.props.data_value.map( (answer, index) => {
                                    //another component
                                    return(
                    
                                        <QButton 
                                            key = {this.props.answer}
                                            index = {`${index}`}
                                            answer = {this.props.answers[index]}
                                            survHeader = {this.props.survHeader}
                                            className = {this.props.className}
                                            color = {this.props.color}
                                            selectionType = {this.props.selectionType}
                                            onClickHandle = {this.onRadioBtnClick}
                                            active = {this.state.rSelected}
                                            data_value={this.props.data_value[index]}
                                        >
                                        </QButton>
            
                                    )
                                })
                                }
                            </div>
                        <br>
                        </br>
                        <Button  id="topFocus" className="questSubmitBtn" onClick={(e) =>this.handleSubmit(e)} color="secondary" size="lg" block><h4 className="subBtnText" >Submit Your Answer</h4></Button>
                        
                        </Card>
                    </Card>   
                :
                null
        )
    }
}