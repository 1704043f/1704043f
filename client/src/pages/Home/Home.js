import React, { Component } from "react";
import {withRouter} from "react-router-dom";

import { 
    Container, 
    TabContent,
    TabPane, 
    Nav, 
    NavItem, 
    NavLink, 
    Row, 
    Col
} from 'reactstrap';

import classnames from 'classnames';

import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {    
        }
    }
    render() {
        
        return (
            <Container fluid>
                <Container className="home-container">
                    Navigation Menu Bar <br/>
                    Jumbotron<br />
                    - tagline <br />
                    Mission/ Goal<br />
                    How this helps<br />
                    row <br />
                    patient physician pharmaceutical<br />
                    row<br />
                    insurance academic machine-learning<br />

                    Who are we <br />
                    Mathew Hall<br />
                    Shi-Kwan Tan<br />
                    Endorsements<br />
                    Testimonials<br />
                    Future Plan<br />
                    - Mobile application<br />
                    - Games <br />
                    - Workout instructions tailor-made for medical conditioned patients. <br />


                </Container>
            </Container>
        );
    }
};

export default withRouter(Home);