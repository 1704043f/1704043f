import React from "react";
import {  Row, Col, Card, CardTitle, CardBody, CardImg, CardText} from 'reactstrap';
import patientImg from '../../../img/patient.jpg'
import pharmacyImg from '../../../img/pharmacy.jpg'
import physicianImg from '../../../img/physician.jpg'

const Benefits = ({ children }) => (

    <div fluid className='home home-benefits'>
        <span id='benefits'></span>
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
                                <li>Enhanced patient satisfaction</li>
                                <li>Increased patient engagement</li>
                            </ul>
                        </CardText>
                    </CardBody>
                </Card>

            </Col>

            <Col md='4'>

                <Card style={{borderColor: "transparent", width: "95%"}}>
                <CardTitle className="benefits-cardtitle text-center">Provider</CardTitle>
                    <CardImg src={physicianImg} alt="Card image cap" />
                    <CardBody>
                        <CardText className="benefits-cardtext">
                            <ul>
                                <li>Clinical assessment supported by high quaility patient generated data</li>
                                <li>Better supported clinical decision making</li>
                                <li>Lower provider costs from better disease management</li>
                                <li>Early warning of clinical deterioration and costly adverse effects</li>
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
                                <li>Longitudinal data for disease research</li>
                                <li>Lower cost clinical trials platform</li>
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
