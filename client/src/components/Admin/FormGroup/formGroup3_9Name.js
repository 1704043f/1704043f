import React  from 'react';

import {
    Col,
    FormGroup, 
    Label, 
    Input
} from 'reactstrap';

import './formGroup.css';



export default class FormGroup3_9Name extends React.Component {


    onChanged(event) {
        this.props.onChanged(event)
    }


    render () {
        return (

            <FormGroup row>
                <Label for="name" sm={3}>Name</Label>
                <Col sm={9}>
                    <Input 
                        type="text" 
                        name={this.props.nameFirstName} 
                        value={this.props.valueFirstName}
                        placeholder="firstname" 
                        onChange={(event) => this.onChanged(event)}  
                     />
                    <Input 
                        type="text" 
                        name={this.props.nameLastName} 
                        placeholder="lastname" 
                        value={this.props.valueLastName}
                        onChange={(event) => this.onChanged(event)} 
                    />  
                </Col>
            </FormGroup>
            
        )
    }
}   