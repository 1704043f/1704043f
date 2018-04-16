import React from 'react';
import {
    Col,
    FormGroup, Label, Input, 
} from 'reactstrap';
import './formGroup.css';



export default class FormGroup3_9Input extends React.Component {


    onChanged(event) {
        this.props.onChanged(event)
    }


    render () {
        return (

            <FormGroup row>
                <Label sm={3}>{this.props.label}</Label>
                <Col sm={9}>
                    <Input 
                        type={this.props.type ? this.props.type : "text"} 
                        name={this.props.name} 
                        placeholder={this.props.placeholder ? this.props.placeholder : ""}
                        value={this.props.value}
                        onChange={(event) => this.onChanged(event)}  
                    />  
                </Col>
            </FormGroup>
        )
    }
}