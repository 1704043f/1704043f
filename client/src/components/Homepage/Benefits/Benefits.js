import React from "react";
import { Container, Row, Col } from 'reactstrap';

const Benefits = ({ children }) => (
    <Container>
        <Row>Benefits</Row>
        <Row>
            <Col md='4'>
                Patient
            </Col>
            <Col md='4'>
                Physician
            </Col>
            <Col md='4'>
                Pharmaceutical
            </Col>
        </Row>
        <Row>
            <Col md='4'>
                Insurance
            </Col>
            <Col md='4'>
                Academic Research 
            </Col>
            <Col md='4'>
                Machine-Learning
            </Col>
        </Row>
    </Container>
);

export default Benefits;
