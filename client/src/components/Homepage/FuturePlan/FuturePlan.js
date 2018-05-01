import React from "react";
import { Container, Row, Col } from 'reactstrap';

const FuturePlan = ({ children }) => (
    <Container>
        <Row>Future Plans</Row>
        <Row>
            <Col md='4'>
                Go mobile!
            </Col>
            <Col md='4'>
                Games 
            </Col>
            <Col md='4'>
                Workout instructions
            </Col>
        </Row>
    </Container>
);

export default FuturePlan;
