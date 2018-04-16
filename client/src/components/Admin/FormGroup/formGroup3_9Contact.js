import React from 'react';

import {
    Col,
    FormGroup, 
    Label, 
    Input,
} from 'reactstrap';

import './formGroup.css';



export default class FormGroup3_9Contact extends React.Component {


    onChanged(event) {
        this.props.onChanged(event)
    }


    render () {
        return (

            <FormGroup row>
                <Label sm={3}>Contact email</Label>
                <Col sm={9}>
                    <Input 
                        type="email" 
                        name={this.props.nameEmail} 
                        placeholder={this.props.placeholderEmail ? this.props.placeholderEmail : "e.g. john.smith@domain.com"} 
                        value={this.props.valueEmail}
                        onChange={(event) => this.onChanged(event)}  
                    />  
                </Col>
                <Label sm={3}>Contact phone</Label>
                <Col sm={9}>
                    <Input 
                        type="text" 
                        name={this.props.namePhone} 
                        placeholder={this.props.placeholderPhone ? this.props.placeholderPhone : "000-000-0000"} 
                        value={this.props.valuePhone}
                        onChange={(event) => this.onChanged(event)} 
                     />  
                </Col>
            </FormGroup>
            
        )
    }
}