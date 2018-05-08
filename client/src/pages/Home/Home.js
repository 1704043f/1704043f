import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import { 
    Container, 
    
} from 'reactstrap';

import AboutUs from '../../components/Homepage/AboutUs'
import Benefits from '../../components/Homepage/Benefits'
import ContactUs from '../../components/Homepage/ContactUs'
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
                <Container fluid className="home-container">
                    <HomeNav />
                    <HomeBanner />
                    <Benefits />
                    <AboutUs />
{/*                    <Endorsements />
                     <Testimonials />*/}
                    <FuturePlan />
                    <ContactUs />
                </Container>
            </Container>
        );
    }
};

export default withRouter(Home);