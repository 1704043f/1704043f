import React from 'react';

import {
    Container, 
    Row, 
    Col, 
} from 'reactstrap';

import moment from 'moment';

export default class Header extends React.Component {

        render () {
        return (

            <Container>
                <Row>
                    <Col md='6' className="text-left">
                    <br />
                        <p style={{fontWeight: "bold"}}>
                            Physician: Dr.&nbsp;
                            {localStorage.getItem("firstName")[0].toUpperCase()}{localStorage.getItem("firstName").slice(1)} 
                            &nbsp;
                            {localStorage.getItem("lastName")[0].toUpperCase()}{localStorage.getItem("lastName").slice(1)}
                        </p>
                    </Col>
                    <Col md='6' className="text-right">
                    <br />
                        <p style={{fontWeight: "bold"}}>Report Date : {moment().format("dddd, MMMM Do YYYY")}</p>
                    </Col>
                </Row>
            </Container>

        )
    }
}    

