import React from "react";
import { Container, Row, Col, Card, CardTitle, CardSubtitle, CardBody, CardImg, CardText } from 'reactstrap';
import GoMobile from '../../../img/mobile_app.jpg'
import GameImg from '../../../img/game.jpg'
import YogaImg from '../../../img/yoga.jpg'
const FuturePlan = ({ children }) => (
    <Container id='futureplans' className='home-section text-center'>
        <Row><h1>Future Plans</h1></Row>
        <Row>
            <Col md='4'>
                <img top width="100%" src={GoMobile} alt="Card image cap" />
            </Col>
            <Col md='8'>
                <Card>
                    <CardBody>
                        <CardTitle>Going Mobile!</CardTitle>
                        <CardSubtitle>Mobile Application For IOS and Android</CardSubtitle>
                        <CardText>To increase user friendliness of this application, we understand a mobile app is necessary, and we are bringing mobile application to the table. </CardText>
                    </CardBody>
                </Card>
                
            </Col>
        </Row>
        <Row>
            <Col md='4'>
                <img top width="100%" src={GameImg} alt="Card image cap" />
            </Col>
            <Col md='8'>
                <Card>
                    <CardBody>
                        <CardTitle>Games</CardTitle>
                        <CardSubtitle>Little games that keep your mind healthy</CardSubtitle>
                        <CardText>We are integrating small games into our applications, users can play some game</CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col md='4'>
                <img top width="100%" src={YogaImg} alt="Card image cap" />
            </Col>
            <Col md='8'>
            <Card>
                    <CardBody>
                        <CardTitle>Fitness Instruction</CardTitle>
                        <CardSubtitle>Physician Recommended Exercise Instructions</CardSubtitle>
                        <CardText>Having a good workout routine prove to have positive impacts to the patient. </CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
);

export default FuturePlan;
