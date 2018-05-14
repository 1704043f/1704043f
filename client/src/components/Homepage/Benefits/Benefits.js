import React from "react";
import {  Row, Col, Card, CardTitle, CardBody, CardImg, CardText} from 'reactstrap';
import patientImg from '../../../img/patient.jpg'
import pharmacyImg from '../../../img/pharmacy.jpg'
import physicianImg from '../../../img/physician.jpg'

const Benefits = ({ children }) => (

    <div id='benefits' fluid className='home-benefits'>
        <hr className="text-center" />    
        <br />
        <h1 className="text-center">Who benefits</h1>
        <br />
        
        <Row>
            <Col md='4'>
                
                <Card style={{borderColor: "transparent", width: "95%"}}>
                <CardTitle className="benefits-cardtitle text-center">Patient</CardTitle>
                    <CardImg src={patientImg} alt="Card image cap" />
                    <CardBody>
                        <CardText className="benefits-cardtext">
                            <ul>
                                <li>Improved disease management </li>
                                <li>Fewer adverse effects</li>
                                <li>Enhanced patient awareness of how their disease effects their daily life</li>
                                <li>Increased patient involvement in their own care</li>
                            </ul>
                        </CardText>
                    </CardBody>
                </Card>

            </Col>

            <Col md='4'>

                <Card style={{borderColor: "transparent", width: "95%"}}>
                <CardTitle className="benefits-cardtitle text-center">Physician</CardTitle>
                    <CardImg src={physicianImg} alt="Card image cap" />
                    <CardBody>
                        <CardText className="benefits-cardtext">
                            <ul>
                                <li>Clinical assessment supported by high quaility patient generated data</li>
                                <li>More confident decision making</li>
                                <li>Track trends in patient symptoms over time</li>
                                <li>Early warning of clinical deterioration and adverse effects</li>
                            </ul>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>

            <Col md='4'>
                <Card style={{borderColor: "transparent", width: "95%"}}>
                <CardTitle className="benefits-cardtitle text-center">Industry</CardTitle>
                    <CardImg src={pharmacyImg} alt="Card image cap" />
                    <CardBody>
                        <CardText className="benefits-cardtext">
                            <ul >
                                <li>Lower provider costs due to better disease control</li>
                                <li>Longitudinal data for disease research</li>
                                <li>'Big data' for drug efficacy studies</li>
                                <li>Early detection of drug adverse effects</li>
                            </ul>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>

         <hr className="text-center" />

    </div>
);

export default Benefits;
