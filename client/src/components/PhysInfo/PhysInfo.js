import React from 'react';
import "./PhysInfo.css";

import { 
    Container,
    Card,
    CardTitle,
    CardHeader,
    Label,
} from 'reactstrap';

const PhysInfo = (props) => {

    return (
        <Container className="physCard">
            <Card className="physInfoCard" body inverse style={{ backgroundColor: '#2d5366', borderColor: '#2d5366' }}>
            {/* <Card className="physInfoCard" body outline color="info"> */}
                <CardHeader tag="h4"  className="physInfoHeader">Physician Information</CardHeader>
                <Card className="docCardInfo">
                    <Label className="patDoc" for="patDoc">Doctor: {props.doctorLastName ? `Dr. ${props.doctorLastName} ${props.doctorFirstName}` : `TBD` }</Label>
                    <br>
                    </br>
                    <Label className="patDocAddress" for="patDocAddress">Office: {props.office ? `${props.office}` : `TBD`}</Label>
                    <br>
                    </br>
                    <Label className="patDocCity" for="patDocCity">Email: {props.email ? `${props.email}` : `TBD`}</Label>
                    <br>
                    </br>
                    <Label className="patDocPhNum" for="patDocPhNum">Phone Number: {props.phone ? `${props.phone}` : `TBD`}</Label>
                    <hr>
                    </hr>
                    <CardTitle className="physInfoHours">Office Hours</CardTitle>
                
                    <Label className="patDocPhNum" for="patDocPhNum">Day: {props.doctorLastName ? props.officeDay : `TBD`}</Label>
                    <br>
                    </br>
                    <Label className="patDocPhNum" for="patDocPhNum">Hour: {props.officeHour} </Label>
                </Card>
            </Card>
        </Container>
    );
};

export default PhysInfo;