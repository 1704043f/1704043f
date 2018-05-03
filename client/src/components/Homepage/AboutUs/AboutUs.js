import React from "react";
import { Container, Row, Col } from 'reactstrap';

import SKHeadShot from '../../../img/SK.jpg'
import MHHeadShot from '../../../img/MH.png'
import Github from "../../../img/icons8-github-50.png";
import LinkedIn from "../../../img/icons8-linkedin-50.png";

const AboutUs = ({ children }) => (
    <Container id='aboutUs' className='home-section'>
        <h1>About Us</h1>
        <Row>
            <Col>
                <Container className='text-left'>
                    <Container className="dev-container">
                        <Row>
                            <Col><h2>Dr. Mathew Hall </h2></Col>
                        </Row>
                        <Row>
                            <Col md='4' className='text-center'>
                            <img src={MHHeadShot} className='portrait text-center' alt='Dr. Mathew Hall' /><br/>
                            <a className='hypOut' href='https://github.com/mathewhall100' target='_blank' rel="noopener noreferrer" ><img src={Github} alt="github" /></a>
                            <a className='hypOut' href='http://www.linkedin.com/in/mathew-hall-100' target='_blank' rel="noopener noreferrer" ><img src={LinkedIn} alt="LinkedIn" /></a>
                                    
                            </Col>
                            <Col md='8'>
                                <p>Mathew is a full stack web developer with a background in medicine, biomedical research and medical education, 
                                looking to make a real difference through technology innovation in the medical and biomedical fields.</p>

                                <p>With a demonstrable track record of lifelong learning, effective communication and entrepreneurship 
                                Mathew’s problem-solving skills are proven over a wide variety of platforms. </p>
                                <p>In summary, he describes himself as a tech polymath always looking for a great next project. </p>
                                
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Col>
        </Row>
        <Row>
            <Col>
                <Container className="dev-container">
                    <Row className="text-right">
                        <Col><h2>Shi-Kwan (SK) Tan</h2></Col>
                    </Row>
                    <Row>
                        <Col md='8'>
                            <Container>
                                <p>
                                    Full stack application developer graduated from University of Kentucky with B.S. in Computer Science and M.S. in Natural Resources Economics.
                                </p>
                                <p>
                                    A team player that equipped with problem solving skill and eager to learn about the latest technology and incorporate them into web applications.
                                </p>
                                <p>
                                    His main goal in tech world is to develop application with great UX and bring positive impacts to the society.
                                </p>
                            </Container>
                        </Col>
                        <Col md='4' className='text-center'>
                            <img src={SKHeadShot} className='portrait text-center' alt='Shi-Kwan (SK) Tan' /><br />
                            <a className='hypOut' href='https://github.com/ShiKwan' target='_blank' rel="noopener noreferrer" ><img src={Github} alt="github" /></a>
                            <a className='hypOut' href='https://www.linkedin.com/in/shi-kwan-tan/' target='_blank' rel="noopener noreferrer" ><img src={LinkedIn} alt="LinkedIn" /></a>
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
    </Container>
);

export default AboutUs;
