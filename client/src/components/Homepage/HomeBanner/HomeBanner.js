import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

import "../../Jumbotron/Jumbotron.css"

const HomeBanner = (props) => {
    return (
        <div>
            <Jumbotron className="jumbo">
                <div style={{float: "right"}}>
                    <h1 style={{textAlign: "right", fontSize:80, fontWeight: 600}}>MedMonitor</h1>
                    <hr />
                    <p style={{fontWeight: "bold", fontSize: 20.5, textAlign: "right"}}>Targeted data analytics to improve patient care</p>
                    <hr />
                    <p style={{textAlign: "right", fontWeight: "bold"}}>
                        <Button color="primary">Discover More</Button>
                    </p>
                </div>
            </Jumbotron>
            <div>
                <h1>Our Mission</h1>
                <p>
                Inspired by neurologists and their movement disorder patients, MedMonitor is a unique application designed to improve patient care through targeted data analytics. Through an easy to use patient interface, MedMonitor gathers raw data from Parkinson’s disease patients about their symptoms, possible drug side effects and associated medical emergencies, relating these to both time of day and daily medications.</p>
    
                <p>Collated data is then made available to the physician or other healthcare provider through easily visualised, yet information laden, reports and patient summaries. Furthermore, the application aids patient compliance with their, often highly complex, medication regimen through calendarized reminders and prompts attendance at physician appointments. Physician alerts are sent when patients report disease related emergencies.</p>
    
                {/* <p>MedMonitor is an intuitive and customizable application, designed from the ground up to benefit both patient and physician. Patients prefer having a simple yet consistent mechanism for reporting their disease burden over time, while healthcare decision makers enjoy access to more reliable, interpretable information to guide patient care.</p>
    
                <p>In addition, with 1-2% of the US population diagnosed with Parkinson’s disease, the potentially large volume of data collected by MedMonitor would quickly become a valuable resource for Parkinson’s disease research as well as related drug development and monitoring by the neuropharmaceuticals industry.</p> */}
            </div>
        </div>
        
    );
};

export default HomeBanner;