import React from "react";
import { Label, Button, Form, FormGroup } from 'reactstrap';
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
            <div fluid id='contact' className='home-contact'>
                <br />
                <h1 className="text-center" >Contact Us</h1>
                <br />
                <p className='form-intro-text'>Whether you are a patient or physician interested in using MedMonitor or just want to find out more about it and how it can benefit you or your organisation, we would be pleased to hear from you -  so do get in touch. </p>
                <br />

                <div className='form-position'>
                    <Form>
                        <FormGroup>
                            <Label for="contactName" bsSize="lg">Name</Label>
                            <input type='text' className='contact' id='contactName' name='contactName' placeholder=' name'  value={this.state.contactName} onChange={this.handleInputChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for='contactEmail' bsSize="lg">Email</Label> 
                            <input type='email' className='contact' id='contactEmail' name='contactEmail' placeholder=' e.g. john.smith@domain.com'  value={this.state.contactEmail} onChange={this.handleInputChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for='contactMessage' bsSize="lg">Message</Label>
                            <input type='textarea' className='contact' id='contactMessage' name='contactMessage' placeholder=' your message to us '  value={this.state.contactMessage} onChange={this.handleInputChange} />
                        </FormGroup>
                        
                        <Button className='bttn' onClick={(event) => this.handleSubmit(event)}>Submit</Button>

                    </Form>  
                </div>  
            </div>
        )
    }
}


export default ContactUs;
