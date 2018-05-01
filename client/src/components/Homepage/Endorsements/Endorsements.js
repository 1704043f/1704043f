import React from "react";
import { Container, Row, Col } from 'reactstrap';

const Endorsements = ({ children }) => (
    <Container>
        <Row>Endorsements</Row>
        <Row>
            <Col md='4'>
                Endorsement 1 
            </Col>
            <Col md='4'>
                Endorsement 2
            </Col>
            <Col md='4'>
                Endorsement 3
            </Col>
        </Row>
    </Container>
);

export default Endorsements;
