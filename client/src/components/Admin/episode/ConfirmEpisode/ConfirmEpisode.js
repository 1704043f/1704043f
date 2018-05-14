import React from 'react';

import '../../../../pages/Admin';
import "./ConfirmEpisode.css";

import {
    Label, 
    Button, 
    Container, 
    Card, 
    CardBody, 
    CardTitle, 
    CardText,
} from 'reactstrap';

export default class PatientConfirmEpisode extends React.Component {
    
    render () {
        return (
            <Card className="confirmNewEpisTableCard TableCard" style={{display: this.props.confirmNewEpisodeDetailsCard ? "block" : "none", width: "100%"}}>
                <CardBody className="confirmNewEpisTableBody TableBody">
                    <CardTitle className="confirmNewEpisTitle Title">Confirm New Episode</CardTitle>
                
                    <CardText>
                        Review new episode details and click submit to create a new episode
                        <br />
                    </CardText>
                    <Container className="listGroup">
                            <h3 className="nextAptTitle">Next Appointment</h3>
                            {this.props.nextAppointment.next_appt ? 
                                <CardText>
                                    Date/time : {this.props.nextAppointment.next_appt}
                                </CardText>
                                : null}
                                <CardText>
                                    Comments : {this.props.nextAppointment.comments}
                                </CardText>

                        <br />

                    {
                        this.props.confirmNewEpisodeDetailsCard && this.props.newEpisode ? 
                            <div>
                                <h3 className="medPrescTitle">Medication Prescribed</h3>
                                {this.props.newEpisode.map( (med, index) =>{
                                    return (
                                        <CardText key={med.medication}>
                                            <CardText>
                                            Name : {med.medication}
                                            </CardText>
                                            <CardText>
                                            Dosage : {med.label}
                                            </CardText>
                                            Time : {med.times ? 
                                                med.times.map( (time,index) => {
                                                    return(
                                                    <Label key={index}> {time.value ? time.value : time} {index < med.times.length-1 ? "|" : null} </Label>
                                                    )
                                                })
                                            : null
                                            }
                                        </CardText>
                                    )
                                })}            
                            </div>
                        : null
                    }
                    </Container>

                    <br /><br />
                    <div className='buttonContainer'>
                        <div className='leftContainer'>
                            <a href={"/admin"}> 
                            <Button color='secondary' className="bttn confirmNewEpisBackBtn BackBtn">Back</Button></a> 
                            <a href={"/admin"}> 
                            <Button color='danger' className="bttn confirmNewEpisCanelBtn CancelBtn">Cancel</Button></a> 
                        </div>
                        <div className='rightContainer'>
                            <Button color='success' className="bttn confirmNewEpisSubmitBtn SubmitBtn" onClick={() =>this.props.createNewEpisode()}>Submit</Button>
                        </div>
                    </div>

                </CardBody>
            </Card>
        )
    }
}