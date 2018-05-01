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
import AboutUs from '../../components/Homepage/AboutUs'
import Benefits from '../../components/Homepage/Benefits'
import Endorsements from '../../components/Homepage/Endorsements'
import FuturePlan from '../../components/Homepage/FuturePlan'
import HomeBanner from '../../components/Homepage/HomeBanner'
import HomeNav from '../../components/Homepage/HomeNav'
import Testimonials from '../../components/Homepage/Testimonials'

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
                    <HomeNav />
                    <HomeBanner />
                    <Benefits />
                    <AboutUs />
                    <Endorsements />
                    <Testimonials />
                    <FuturePlan />
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