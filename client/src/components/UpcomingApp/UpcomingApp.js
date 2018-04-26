import React from 'react';
import "./UpcomingApp.css";

import { 
    Container,
    Card, 
    Button, 
    CardHeader,
    Label,
} from 'reactstrap';

const UpcomingApp = (props) => {

    return (
        <Container fluid className="AppointmentCards">
            <Card className="upcomingAppCard featureCard" body fluid inverse >
                <CardHeader tag="h4" className="upcomingAppHeader">Upcoming Appointment</CardHeader>
                    <Card className="appCardInfo">
                        <hr/>
                        <div>
                            <Label className="appLabel" for="appDate">Date: </Label>
                            <Label className='appValue'>{props.date}</Label>
                        </div>
                        <hr />  
                        <div>
                            <Label className="appLabel appTime" for="appTime">Time: </Label>
                            <Label className='appValue'>{props.time}</Label>
                        </div>
                        <hr />
                        <div>
                            <Label className="appLabel appDoctorName" for="appDocName">Doctor:  </Label>
                            <Label className='appValue'>{props.doctorLastName ? `Dr. ${props.doctorLastName} ${props.doctorFirstName}` : `TBD`}</Label>    
                        </div>
                        <hr />
                        <div>
                            <Label className="appLabel appAddress" for="appAddress">Address:</Label>
                            <Label className='appValue'>{props.address}</Label>    
                        </div>
                        <hr />
                        <div>
                            <Label className="appLabel appCity" for="appCity">City, State: </Label>
                            <Label className='appValue'>{props.city}</Label>    
                        </div>
                        <hr />
                        <div>
                            <Label className="appLabel appLabelappNum" for="appPhNum">Phone Number: </Label>
                            <Label className='appValue'>{props.officePhone}</Label>    
                        </div>
                        <hr />
                        <div>
                            <Label className="appLabel appComment" for="appComment">Comments : </Label>
                            <Container>{props.comments}</Container>
                        </div>
                        
                        <br />

                        <Button className="bttn appRemindBtn" size="lg" onClick={(e) => props.remindHandler(e)}>Remind Me!</Button>{' '}
                    </Card>
            </Card>
        </Container>
    );
};

export default UpcomingApp;