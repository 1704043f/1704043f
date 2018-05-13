import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import { Container } from 'reactstrap';

import HomeNav from '../../components/Homepage/HomeNav'
import HomeBanner from '../../components/Homepage/HomeBanner'
import Mission from '../../components/Homepage/Mission'
import Howitworks from '../../components/Homepage/Howitworks'
import Benefits from '../../components/Homepage/Benefits'
import AboutUs from '../../components/Homepage/AboutUs'
import FuturePlan from '../../components/Homepage/FuturePlan'
import ContactUs from '../../components/Homepage/ContactUs'

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
                    <Mission />
                    <Howitworks />
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