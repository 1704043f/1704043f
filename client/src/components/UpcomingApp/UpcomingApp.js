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
        <Container className="AppointmentCards">
            <Card className="upcomingAppCard" body inverse style={{ backgroundColor: '#2d5366', borderColor: '#2d5366' }}>
                <CardHeader tag="h4" className="upcomingAppHeader">Upcoming Appointment</CardHeader>
                    <Card className="appCardInfo">
                        <Label className="appDate" for="appDate">Date: {props.date}</Label>
                        <br>
                        </br>
                        <Label className="appTime" for="appTime">Time: {props.time}</Label>
                        <br>
                        </br>
                        <Label className="appDoctorName" for="appDocName">Doctor: {props.doctorLastName ? `Dr. ${props.doctorLastName} ${props.doctorFirstName}` : `TBD`} </Label>
                        <br>
                        </br>
                        <Label className="appAddress" for="appAddress">Address: {props.address}</Label>
                        <br>
                        </br>
                        <Label className="appCity" for="appCity">City, State: {props.city}</Label>
                        <br>
                        </br>
                        <Label className="appNum" for="appPhNum">Phone Number: {props.officePhone}</Label>
                        <br>
                        </br>
                        <Label className="appComment" for="appComment">Comments : </Label>
                        <Container>{props.comments}</Container>
                        <br />

                        <Button className="appRemindBtn" size="lg" onClick={(e) => props.remindHandler(e)}>Remind Me!</Button>{' '}
                    </Card>
            </Card>
        </Container>
    );
};

export default UpcomingApp;