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
            <Card className="TableCard" style={{display: this.props.confirmNewEpisodeDetailsCard ? "block" : "none", width: "100%"}}>
                <CardBody>

                    <CardTitle className="TableTitle">Create New Episode</CardTitle>
                
                    <CardText>
                        <br />
                        Review new episode details and click submit to create the new episode. After clicking submit the patient will be able to record data into the episode when logged-in to the application. 
                        <br />
                        <br />
                    </CardText>

                    <div>
                        <h4 style={{textAlign: "left"}}>Next Appointment</h4>
                        <br />

                        {
                            this.props.nextAppointment.next_appt ? 
                            
                                <table>
                                    <tr>
                                        <td width="100px">Date/time : </td><td width="200px">{this.props.nextAppointment.next_appt}</td>
                                    </tr>
                                    <tr>
                                        <td width="100px">Comments : </td><td width="500px" >{this.props.nextAppointment.comments}</td>
                                    </tr>
                                </table>
                            
                            : <span><br />No appointments scheduled.<br /></span>
                        }
                        <br /><br />
                        <h4 style={{textAlign: "left"}}>Episode Medications</h4> 
                        <br />

                        {
                            this.props.confirmNewEpisodeDetailsCard && this.props.newEpisode ? 
                               
                                <table>
                                    {this.props.newEpisode.map( (med, index) =>{
                                        return (
                                        
                                            <tr key={med.medication}>
                                                <td width="275px"><Label>{med.medication}</Label></td>
                                                <td width="25px"></td>
                                                <td width="275px"><Label>{med.label}</Label></td>
                                                <td width="25px"></td>
                                                <td width="300px">
                                                    {med.times ? 
                                                        med.times.map( (time,index) => {
                                                            return(
                                                            <Label key={index}> {time.value ? time.value : time} {index < med.times.length-1 ? ", " : null} </Label>
                                                            )
                                                        }) : null 
                                                    }
                                                </td>
                                            </tr>

                                        )
                                    })}   
                                </table>

                            : null
                        }
                    </div>

                    <br />
                    <br />

                    <a href={"/admin"}><Button color='secondary' className="admin-btn right-align">Back</Button></a> 
                    <a href={"/admin"}><Button color='danger' className="admin-btn right-align">Cancel</Button></a> 
                    <Button color='success' className="admin-btn right-align" onClick={() =>this.props.createNewEpisode()}>Submit</Button>

                </CardBody>
            </Card>
        )
    }
}