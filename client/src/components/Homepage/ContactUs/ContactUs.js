import React from "react";
import { Container, Row, Col, Label, Button, Form, FormGroup } from 'reactstrap';
import mailerAPI from "../../../utils/nodemailerAPI";


class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactName : '',
            contactEmail : '',
            contactMessage : ''
        }

    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    handleSubmit = (event) =>{
        event.preventDefault();
        mailerAPI.sendToDoctor({
            subject : `MedMonitor - ${this.state.contactName} contacted you`,
            name: this.state.contactName,
            email: this.state.contactEmail,
            message:
                `
                 Message from ${this.state.contactName} : 
                
                        ${this.state.contactMessage}

                From:

                ${this.state.contactName}
                `
        })
    }

    render(){
        return(
            <Container id='contactus' className='home-section text-left'>
            <h1>Contact Us</h1>
                <Form>
                    <FormGroup>
                        <Label for="contactName" bsSize="lg">Name</Label>
                        <input type='text' className='contact' id='contactName' name='contactName' placeholder='type your name here'  value={this.state.contactName} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='contactEmail' bsSize="lg">Email</Label> 
                        <input type='email' className='contact' id='contactEmail' name='contactEmail' placeholder='enter your email address here'  value={this.state.contactEmail} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='contactMessage' bsSize="lg">Message</Label>
                        <input type='textarea' className='contact' id='contactMessage' name='contactMessage' placeholder='enter your message here'  value={this.state.contactMessage} onChange={this.handleInputChange} />
                    </FormGroup>
                    <Button className='bttn' onClick={(event) => this.handleSubmit(event)}>Submit</Button>
                </Form>    
            </Container>
        )
    }
}


export default ContactUs;
