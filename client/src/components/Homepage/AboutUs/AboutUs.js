import React from "react";
import { Container, Row, Col } from 'reactstrap';

import SKHeadShot from '../../../img/SK.jpg'
import MHHeadShot from '../../../img/MH.jpg'
import Github from "../../../img/icons8-github-50.png";
import LinkedIn from "../../../img/icons8-linkedin-50.png";

const AboutUs = ({ children }) => (

     <div fluid id='aboutus' className='home-about'> 
                  <br />
                    <h1 className="text-center">About us</h1>
                    <br />

                <Row>
                    <Col md='6'>
                        <div className="profile-wrapper text-center">
                            <h2>Dr. Mathew Hall </h2>
                            <img src={MHHeadShot} className='headshot' alt='Dr. Mathew Hall' />
                            <br/>
                            <a href='https://github.com/mathewhall100' target='_blank' rel="noopener noreferrer" ><img className='profile-icon' src={Github} alt="github" /></a>
                            <a href='http://www.linkedin.com/in/mathew-hall-100' target='_blank' rel="noopener noreferrer" ><img className='profile-icon' src={LinkedIn} alt="LinkedIn" /></a>

                            <Container>
                                <p>
                                    Full stack web developer with a 20yr background in medicine, biomedical research and medical education</p>
                                    <p>Looking to make a real difference through technology innovation in the medical and biomedical fields.
                                    </p>
                            </Container> 
                            <br />

                        </div>  

                    </Col>


                    <Col md='6'>
                        <div className="profile-wrapper text-center">
                            <h2>Shi-Kwan (SK) Tan</h2>
                            <img src={SKHeadShot} className='headshot' alt='Shi-Kwan (SK) Tan' />
                            <br />
                            <a href='https://github.com/ShiKwan' target='_blank' rel="noopener noreferrer" ><img className='profile-icon' src={Github} alt="github" /></a>
                            <a href='https://www.linkedin.com/in/shi-kwan-tan/' target='_blank' rel="noopener noreferrer" ><img className='profile-icon' src={LinkedIn} alt="LinkedIn" /></a>

                            <Container>
                                <p>
                                    Full stack application developer graduated from University of Kentucky with B.S. in Computer Science and M.S. in Natural Resources Economics.
                                </p>

                                <p>
                                    With a goal to develop applications with a great user experience and that bring a positive impact to society.
                                </p>
                            </Container>
                            
                        </div>
                    </Col>

                </Row>

                <hr className="text-center" />
    </div>
);

export default AboutUs;
