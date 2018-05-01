import React from "react";
import { Container, Row, Col } from 'reactstrap';

const AboutUs = ({ children }) => (
    <Container>
        <h1>About Us</h1>
        <Row>
            <Col>
                Mathew Hall 
            </Col>
        </Row>
        <Row>
            <Col>
                Shi-Kwan Tan
            </Col>
        </Row>
    </Container>
);

export default AboutUs;
