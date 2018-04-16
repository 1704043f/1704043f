import React from 'react';
import {
    Col,
    Row,
    Container,
} from 'reactstrap';
import SKHeadShot from "./SK.jpg";
import MHHeadShot from "./MH.png";
import BSHeadShot from "./BS2.png";
import JMHeadShot from "./JM.JPG";
import Github from "./icons8-github-50.png";
import LinkedIn from "./icons8-linkedin-50.png";
import './about_us.css';

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <Container className='text-left AboutMedMonitor'>
                    <h2>About MedMonitor</h2>
                    <Container>
                    <p>Inspired by neurologists and their movement disorder patients, MedMonitor is a unique application designed to improve patient care through targeted data analytics.
                    Through an easy to use patient interface, MedMonitor gathers raw data from Parkinson’s disease patients about their symptoms, 
                    possible drug side effects and associated medical emergencies, relating these to both time of day and daily medications. </p>
                    <p>Collated data is then made available to the physician or other healthcare provider through easily visualised, yet information laden, reports and patient summaries. 
                    Furthermore, the application aids patient compliance with their, often highly complex,  
                    medication regimen through calendarized reminders and prompts attendance at physician appointments. 
                    Physician alerts are sent when patients report disease related emergencies.  </p>
                    <p>MedMonitor is an intuitive and customizable application, designed from the ground up to benefit both patient and physician.  
                    Patients prefer having a simple yet consistent mechanism for reporting their disease burden over time, 
                    while healthcare decision makers enjoy access to more reliable, interpretable information to guide patient care. </p>
                    <p>In addition, with 1-2% of the US population diagnosed with Parkinson’s disease, 
                    the potentially large volume of data collected by MedMonitor would quickly become a valuable resource for Parkinson’s disease research 
                    as well as related drug development and monitoring by the neuropharmaceuticals industry.</p>
                    </Container>
                </Container>
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
                    <hr/>
                    <Container className="dev-container">
                        <Row className="text-right">
                            <Col><h2>Joe Malovasic</h2></Col>
                        </Row>
                        <Row>
                            <Col md='8'>
                                <p>Joe is a 26 year old aspiring developer from the Cleveland area. 
                                After the CWRU bootcamp, he is looking forward to continuing his self education in various programming languages, 
                                and hoping to eventually dabble in the world of software development.</p>
                            </Col>
                            <Col md='4' className='text-center'>
                                <img  src={JMHeadShot} className='portrait bs' alt='Joe Malovasic' /><br />
                                <a className='hypOut' href='https://github.com/joemalov' target='_blank' rel="noopener noreferrer" ><img src={Github} alt="github" /></a>
                                <a className='hypOut' href='https://www.linkedin.com/in/joe-malovasic-195808146/' target='_blank' rel="noopener noreferrer" ><img src={LinkedIn} alt="LinkedIn" /></a>
                            </Col>
                        </Row>
                    </Container>
                    <hr/>
                    <Container className="dev-container">
                        <Row>
                            <Col><h2>Bradley Schmaeman</h2></Col>
                        </Row>
                        <Row>
                            <Col md='4' className='text-center'>
                                <img  src={BSHeadShot} className='portrait bs' alt='Bradley Schmaeman' /><br />
                                <a className='hypOut' href='https://github.com/bradwayne' target='_blank' rel="noopener noreferrer" ><img src={Github} alt="github" /></a>
                                <a className='hypOut' href='https://www.linkedin.com/in/bradley-schmaeman/' target='_blank' rel="noopener noreferrer" ><img src={LinkedIn} alt="LinkedIn" /></a>
                            </Col>
                            <Col md='8'>
                                <Container>
                                <p>
                                    Bradley’s passion in web development is the front-end. 
                                    He brings over 15 years experience in the graphic design field. 
                                </p>
                                <p>
                                    Always looking for new outside the box ideas and concepts 
                                    to create eye popping and artistic flavor to his layouts.
                                    Bradley continues looking to improve his skills and tools 
                                    to become a better programmer and designer every day.
                                </p>
                                <p>
                                    With this new found web coding knowledge and past experience 
                                    he is relishing the opportunity to help small and/or new 
                                    up-and-coming businesses visually compete with the big boys 
                                    with their online presence. 
                                </p>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                    <hr/>
                    <Container className="dev-container">
                        <Row  className="text-right">
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
                                <img src={SKHeadShot} className='portrait text-center' alt='Shi-Kwan (SK) Tan' /><br/>
                                <a className='hypOut' href='https://github.com/ShiKwan' target='_blank' rel="noopener noreferrer" ><img src={Github} alt="github" /></a>
                                <a className='hypOut' href='https://www.linkedin.com/in/shi-kwan-tan/' target='_blank' rel="noopener noreferrer" ><img src={LinkedIn} alt="LinkedIn" /></a>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </div>
        )
    }
}