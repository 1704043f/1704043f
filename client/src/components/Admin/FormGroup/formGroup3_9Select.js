import React from 'react';

import {
    Col,
    Label, 
    Input, 
    FormGroup
} from 'reactstrap';

import './formGroup.css';



export default class FormGroup3_9Select extends React.Component {


    onChanged(event) {
        this.props.onChanged(event)
    }


    render () {
        return (

            <FormGroup row>
                <Label sm={3}>{this.props.label}</Label>
                <Col sm={9}>
                    <Input type="select" name={this.props.name} onChange={(event) => this.onChanged(event)}>
                    <option>{this.props.firstOption}</option>
                        {this.props.selectList.map(item => (
                            <option key={item._id} value={item._id}>
                                {`${item.name.first} ${item.name.last}  (Physician ID: ${item.id_number})`}
                            </option>
                        ))}
                    </Input>
                     
                </Col>
            </FormGroup>
            
        )
    }
}