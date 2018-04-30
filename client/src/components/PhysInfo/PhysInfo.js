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
        <Container fluid className="physCard">
            <Card className="physInfoCard featureCard" body inverse fluid style={{ backgroundColor: '#2d5366', borderColor: '#2d5366' }}>
            {/* <Card className="physInfoCard" body outline color="info"> */}
                <CardHeader tag="h4" className="physInfoHeader card-header">Physician Information</CardHeader>
                <Card className="docCardInfo">
                <hr />
                <div>
                    <Label className="appLabel patDoc" for="patDoc">Doctor:</Label>
                    <Label className='appValue'>{props.doctorLastName ? `Dr. ${props.doctorLastName} ${props.doctorFirstName}` : `TBD` }</Label>
                </div>
                <hr/>
                <div>
                    <Label className="appLabel patDocAddress" for="patDocAddress">Office: </Label><Label className='appValue'>{props.office ? `${props.office}` : `TBD`}</Label>
                </div>
                <hr />
                <div>
                    <Label className="appLabel patDocCity" for="patDocCity">Email: </Label><Label className='appValue'>{props.email ? `${props.email}` : `TBD`}</Label>
                </div>
                <hr />
                <div>
                    <Label className="appLabel patDocPhNum" for="patDocPhNum">Phone Number: </Label><Label className='appValue'>{props.phone ? `${props.phone}` : `TBD`}</Label>
                </div>
                <hr>
                </hr>
                    <CardTitle className="physInfoHours">Office Hours</CardTitle>
                    <hr />
                <div>
                    <Label className="appLabel patDocPhNum" for="patDocPhNum">Day: </Label><Label className='appValue'>{props.doctorLastName ? props.officeDay : `TBD`}</Label>
                </div>
                    <hr />
                    <div>
                    <Label className="appLabel patDocPhNum" for="patDocPhNum">Hour: </Label><Label className='appValue'>{props.officeHour} </Label>
                    </div>
                </Card>
            </Card>
        </Container>
    );
};

export default PhysInfo;