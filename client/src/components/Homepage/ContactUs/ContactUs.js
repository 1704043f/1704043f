import React from "react";
import { Container, Row, Col, Label, Button } from 'reactstrap';

const ContactUs = ({ children }) => (
    <Container id='contactus' className='home-section'>
        <Row><h1>Contact Us</h1></Row>
        <Label>Name</Label>
        <input type='text' name='' />
        <Label>Email</Label> 
        <input type='text' name='' />
        <Label>Message</Label>
        <input type='textarea' name='' />
    </Container>
);

export default ContactUs;
