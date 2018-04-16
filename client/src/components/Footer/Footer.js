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
                <Label className="footAbout">
                    <Link to="/About_Us" >About Us</Link>
                </Label>
                <Label className="footGit">
                    <a href="https://github.com/ShiKwan/project3" target="_blank" rel="noopener noreferrer" >Git Hub</a>
                </Label>
            </Container>
        )
    }
}