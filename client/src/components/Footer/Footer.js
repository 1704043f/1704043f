import React from 'react';
import moment from 'moment';
import {Link } from "react-router-dom";
import {
    Label,
    Container
} from 'reactstrap';

import "./Footer.css";


export default class Header extends React.Component {
    render(){
        return(
            <Container className="footer" fluid>
                <Label className="copyright">
                    Copyright &copy; {moment().format("YYYY")} All right reserved. 
                </Label>
            </Container>
        )
    }
}