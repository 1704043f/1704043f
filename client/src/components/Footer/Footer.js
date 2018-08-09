import React from 'react';
import moment from 'moment';
import {
    Label,
    Container,
    NavLink,
} from 'reactstrap';
import "./Footer.css";


export default class Header extends React.Component {
    render(){
        return(
            <Container className="footer" fluid>
                <Label className="copyright">
                    Copyright &copy; {moment().format("YYYY")} All right reserved. 
                    <NavLink className='privacy' href="/privacy_policy">Privacy Policy</NavLink>
                </Label>
                
            </Container>
        )
    }
}