import React from 'react';

import {
    Container
} from 'reactstrap';

import './PatientInfo.css';


export default class PatientInfo extends React.Component {

    render () {
        return (

            <div>
                <p className="patientInfo">
                    Patient Name : {this.props.lastName}, {this.props.firstName} 
                    <br />
                    Hospital No : {this.props.patientNumber}
                </p>

            </div>

        )
    }
}           