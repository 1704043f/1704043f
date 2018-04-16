import React from 'react';

import {
    Container
} from 'reactstrap';

import './PatientInfo.css';


export default class PatientInfo extends React.Component {

        render () {
        return (

            <Container>
                <p className="patInfo">
                    Hospital No : {this.props.patientNumber}
                    <br />
                    Patient Name : {this.props.lastName}, {this.props.firstName}
                </p>
                <hr />
            </Container>

        )
    }
}           