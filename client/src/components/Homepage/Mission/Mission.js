import React from 'react';
import { Row, Col } from 'reactstrap';

const Mission = (props) => {
    return (
        <div fluid className='home home-mission'> 
            <span id='mission'></span>
            <h1 className="text-center">Our Mission</h1>

                <br />

                    <Row>
                        <Col md='12'>
                        
                            <p>
                                Managing complex diseases, such as Parkinson disease, can be a huge challenge for physicians. It relies on obtaining accurate information on multiple symptoms and signs which may fluctuate throughout the patient's day and in response to medication times and doses. MedMonitor is a unique application designed to address this challenge by using data analytics to create a more complete picture of the patient's experience living with their disease, and make this available to physicians to support clinical decision-making and improve patient care.</p>

                            <br />

                        
                        </Col>
                    </Row>
                    
                        {/* 
                        
                        <p>
                        Collated data is then made available to the physician or other healthcare provider through easily visualised, yet information laden, reports and patient summaries. Furthermore, the application aids patient compliance with their, often highly complex, medication regimen through calendarized reminders and prompts attendance at physician appointments. Physician alerts are sent when patients report disease related emergencies.</p>
                        
                        <p>MedMonitor is an intuitive and customizable application, designed from the ground up to benefit both patient and physician. Patients prefer having a simple yet consistent mechanism for reporting their disease burden over time, while healthcare decision makers enjoy access to more reliable, interpretable information to guide patient care.</p>
            
                        <p>In addition, with 1-2% of the US population diagnosed with Parkinson’s disease, the potentially large volume of data collected by MedMonitor would quickly become a valuable resource for Parkinson’s disease research as well as related drug development and monitoring by the neuropharmaceuticals industry.
                        </p> */}

                    <hr className="text-center" />
                </div>

    );
};

export default Mission;