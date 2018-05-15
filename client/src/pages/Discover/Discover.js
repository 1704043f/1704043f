import React from 'react';
import {
    Col,
    Row,
    Container,
    Button,
} from 'reactstrap';
import './Discover.css';
import Discoverbox from '../../components/Homepage/Discoverbox'
import login1 from '../../img/discover-images/login1.PNG';
import patenroll1 from '../../img/discover-images/patenroll1.PNG';
import patenroll2 from '../../img/discover-images/patenroll2.PNG';
import episode2 from '../../img/discover-images/episode2.PNG';
import episode3 from '../../img/discover-images/episode3.PNG';
import patsurvey1 from '../../img/discover-images/patsurvey1.PNG';
import patsurvey2 from '../../img/discover-images/patsurvey2.PNG';
import patsurvey3 from '../../img/discover-images/patsurvey3.PNG';
import patsurvey4 from '../../img/discover-images/patsurvey4.PNG';
import patsurvey5 from '../../img/discover-images/patsurvey5.PNG';
import patsurvey6 from '../../img/discover-images/patsurvey6.PNG';
import report1 from '../../img/discover-images/report1.PNG';
import report2 from '../../img/discover-images/report2.PNG';
import report3 from '../../img/discover-images/report3.PNG';
import report4 from '../../img/discover-images/report4.PNG';
import report5 from '../../img/discover-images/report5.PNG';

export default class Discover extends React.Component {
    
    state = {
        box2: false,
        box3: false,
        box4: false,

        displayAll: false,
    }


    displayBox(box, scrollMore)  {
        console.log(box)
        switch (box) {
            case "2":
                this.setState({box2: true});
                break;
            case "3":
                this.setState({box3: true});
                break;
            case "4":
                this.setState({box4: true});
                break;
        }

        this.scroll(box);
    }

    displayAll() {
        this.setState({displayAll: true})   
    }

    collapseAll() {
        this.setState({box1: true});
        this.setState({box2: false});
        this.setState({box3: false});
        this.setState({box4: false});
    }


    scroll(boxes) {
        let posn = 0;
        const id = setInterval( () => {
            window.scrollBy(0, 1);
            posn ++;
            if (posn > document.body.scrollHeight/boxes) {
                clearInterval(id) }
                }, 2)
    }
    

    render() {
        return (
            <Container fluid>
                <Container fluid className="home-container">

                    <div className="discover-nav ">
                         <a href="#" onClick={() => this.displayAll()}>View all</a>
                         <a href="/">Back</a> 
                    </div><br />

                    <div className="discover-header text-center">
                        Discover MedMonitor
                    </div>

                    <Discoverbox 
                        display = "true"
                        title = "Login and enrollment"
                        imgArray = {[ login1, patenroll1, patenroll2]}
                        textArray = {[
                            "Physicians and patients log-in to the application via the login button on the homepage. The application distinguishes between physicians, admin officers and patients and directs each to separate secure areas of the app tailored to their needs."
                            ,
                            "Appropriate patients are identified by their physician and, after explanation and consent, enrolled to use the application."
                            ,
                            "Enrolled patients are allocated to a primary physician as a point of first contact. \nUsernames and passwords can be given to patients when they enroll in the physician's office, or an email can be sent inviting them to register with a username and password at a later date"
                        ]}
                        displayBox = {(num) => this.displayBox(num)}
                        nextBox = "2"
                        displayAll = {this.state.displayAll}
                    />

                    <Discoverbox 
                        display = {this.state.box2}
                        title = "Creating an episode"
                        imgArray = {[ episode2, episode3 ]}
                        textArray = {[ "At each clinic vist or patient contact, physicians use the admin area of the application to create a new 'episode' for that patient. An episode is a period of time, usually between clinic visits,  during which the patient is receiving the same set of medications or treatments"
                        ,
                        "An episode is created simply by entering the patients current set of medications and/or treatments and by fixing the next clinic appointment or review date. The application is then ready to accept patient input data for the new episode via the patient survey." 
                        ]}
                        displayBox = {(num) => this.displayBox(num)}
                        nextBox = "3"
                        displayAll = {this.state.displayAll}
                    />

                    <Discoverbox 
                        display = {this.state.box3}
                        title = "Patient survey"
                        imgArray = {[ patsurvey1, patsurvey2, patsurvey3, patsurvey4, patsurvey5, patsurvey6 ]}
                        textArray = {[ "Patients login from their own home or on the go and are reminded of when their next dose of medication is due that day. A reminder can also be sent directly to the patient's google calander. The patient interface is simple, easy to use and fully responsive so can be viewed and data entered on any logged in device."
                        ,
                        "In a one hour window around their medication times, the patient is prompted to take a short patient-customised survey. First they asked whether they are up to date with their parkinson's medications. The application logic records their response and can account for skipped medication doses during processing the data."
                        ,
                        "Next they are asked about any serious symptoms common to parkinson's disease. Such symptoms can warn of a medical emergency and a positive reponse triggers an immediate alert to their physician via the app and email. Such alerts are viewd in the physician's admin area of the application and on the dashboard when the physician logs in." 
                        ,
                        "The patients are then asked to answer a series (no more than 10) of questions about their wellbeing and about specific Parkinson's disease symptoms as they are experiencing them at that time or how they have experienced them over the time since taking their previous medication dose."
                        ,
                        "The survey includes questions about common Parkinson's medication side effects that the patient may experience to allow for early detection of adverse effects."
                        ,
                        "Patient responses are recorded along with the time and date and active medications in the current patient episode. This associates the wellbeing, symptoms and side effects entered by the patient with the exact medication regimen active when the data is gathered. Reminders of next medication time and of next physician appointment are displayed at the end of each survey."
                       ]}
                        displayBox = {(num) => this.displayBox(num)}
                        nextBox = "4"
                        displayAll = {this.state.displayAll}
                    />

                    <Discoverbox 
                        display = {this.state.box4}
                        title = "Reviewing patient data"
                        imgArray = {[ report1, report2, report3, report4, report5 ]}
                        textArray = {[
                            "Successive survey responses, over the weeks between physician appointments, are collated and analysed by the application logic to generate a detailed picture of how the patients wellbeing and Parkinson's symptoms vary throughout the day and over time. The processed data is accesible to the physician at anytime in the form of easily readable reports and charts."
                            ,
                            "Interactive and fully customizable graphs corrolate the patient's disease specific symptoms with time of day and with medications active at those times. Graphs can narrow in on specific symptoms, look at average wellbeing and display error bars for statistical comparisons."
                            ,
                           "Alerts of serious symptoms and possible medication side effects are also presented for early detection, follow up and identification of causative drugs"
                            ,
                            "Each individual graph represents an 'episode' during which the patient recieves a consistent set of treatments, thereby allowing assessment of efficacy of specific medications and medication regimen. Episode data can be viewed side by side along with respective medication regimen for easy comparison"
                            ,
                            "Trends in patient symptoms, side effects and serious symptom alerts can be reviewed over time, with all the patient data, going back to when they first enrolled accessible in interactive and customizable graphs"
                            
                         
                       ]}
                        displayBox = {(num) => this.displayBox(num)}
                        nextBox = "5"
                        lastBox = "true"
                        displayAll = {this.state.displayAll}
                    />

                </Container>
            </Container>
        )
    }
}