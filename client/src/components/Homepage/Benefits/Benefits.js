import React from "react";
import { Container, Row, Col, Card, CardTitle, CardSubtitle, CardBody, CardImg, CardText, Button} from 'reactstrap';
import patientImg from '../../../img/patient.jpg'
import insuranceImg from '../../../img/insurance.jpg'
import pharmacyImg from '../../../img/pharmacy.jpg'
import machineLearningImg from '../../../img/machine-learning.jpg'
import physicianImg from '../../../img/physician.jpg'
import statisticsImg from '../../../img/statistics.jpg'

const Benefits = ({ children }) => (
    <Container fluid id='benefits' className='home-section text-center'>
        <h1>Benefits</h1>
        <Row className=''>
            <Col md='2'></Col>
            <Col md='2'>
                <Card>
                    <CardImg top width="100%" src={patientImg} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Patient</CardTitle>
                        <CardSubtitle>Keep track of wellness</CardSubtitle>
                        <CardText></CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col md='1'></Col>
            <Col md='2'>
                <Card>
                    <CardImg top width="100%" src={physicianImg} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Physician</CardTitle>
                        <CardSubtitle>Keep track of wellness</CardSubtitle>
                        <CardText></CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col md='1'></Col>
            <Col md='2'>
                <Card>
                    <CardImg top width="100%" src={pharmacyImg} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Pharmaceutical</CardTitle>
                        <CardSubtitle>Keep track of wellness</CardSubtitle>
                        <CardText></CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col md='2'></Col>
        </Row>
        <Row>
            <Col></Col>
        </Row>
        <Row>
            <Col md='2'></Col>
            <Col md='2'>
                <Card>
                    <CardImg top width="100%" src={insuranceImg} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Insurance</CardTitle>
                        <CardSubtitle>Keep track of wellness</CardSubtitle>
                        <CardText></CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col md='1'></Col>
            <Col md='2'>
                <Card>
                    <CardImg top width="100%" src={statisticsImg} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Academic Research</CardTitle>
                        <CardSubtitle>Keep track of wellness</CardSubtitle>
                        <CardText></CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col md='1'></Col>
            <Col md='2'>
                <Card>
                    <CardImg top width="100%" src={machineLearningImg} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Machine-Learning</CardTitle>
                        <CardSubtitle>Keep track of wellness</CardSubtitle>
                        <CardText></CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col md='2'></Col>
        </Row>
    </Container>
);

export default Benefits;
