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

            <Row>
                <Col md='6' className="text-left">
                
                    <p style={{fontWeight: "bold", marginTop: 10, fontSize: 14}}>
                        Physician: Dr.&nbsp;
                        {localStorage.getItem("firstName")[0].toUpperCase()}{localStorage.getItem("firstName").slice(1)} 
                        &nbsp;
                        {localStorage.getItem("lastName")[0].toUpperCase()}{localStorage.getItem("lastName").slice(1)}
                    </p>

                </Col>
                <Col md='6' className="text-right">
                
                    <p style={{fontWeight: "bold", marginTop: 10, fontSize: 14}}>
                        Report Date : {moment().format("dddd, MMMM Do YYYY")}
                    </p>

                </Col>
            </Row>

        )
    }
}    

