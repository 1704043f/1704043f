import React from 'react';
import {
    Container,
} from 'reactstrap';
import './Discover.css';
import Discoverbox from '../../components/Homepage/Discoverbox';
import homepage1 from '../../img/discover-images/homepage1.PNG';
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
import report6 from '../../img/discover-images/report6.PNG';
import adminhomepage from '../../img/discover-images/adminhomepage.PNG';
import dashboard from '../../img/discover-images/dashboard.PNG';
import admin1 from '../../img/discover-images/admin1.PNG';
import admin2 from '../../img/discover-images/admin2.PNG';
import admin3 from '../../img/discover-images/admin3.PNG';
import medications1 from '../../img/discover-images/medications1.PNG';
import medications2 from '../../img/discover-images/medications2.PNG';
import customization1 from '../../img/discover-images/customization1.PNG';
import physicians2 from '../../img/discover-images/physicians2.PNG';
import datamenu1 from '../../img/discover-images/datamenu1.PNG'


export default class Discover extends React.Component {
    
    state = {
        box2: false,
        box3: false,
        box4: false,
        box5: false,
        box6: false,
        box7: false,
        box8: false,
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
            case "5":
                this.setState({box5: true});
                break;
            case "6":
                this.setState({box6: true});
                break;
            case "7":
                this.setState({box7: true});
                break;
            case "8":
                this.setState({box8: true});
                break;
            case "last":
                break;
        }

        this.scroll(box);
    }

    displayAll() {
        this.setState({displayAll: true})   
    }

scroll(box) {
        let posn = 0;
        box = (box === "last" ? "7" : box)
        const id = setInterval( () => {
            window.scrollBy(0, 2);
            posn ++;
            if (posn > document.body.scrollHeight/(box*2)) {
                clearInterval(id) }
                }, 1)
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
                        title = "Overview"
                        imgArray = {[ homepage1 ]}
                        textArray = {[
                            "MedMonitor is designed to help physicians better manage their chronic disease patients. With an initial focus on Parkinson's disease, the application gathers data on patient wellbeing, disease symptoms and possible drug side effects on a continual basis, associating this data with the concurrent set of medications being taken. By analysing patient responses over the weeks and months between clinic visits a clear picture of that patients typical day living with their disease can be constructed and linked to their specific treatment regimen. This information is then used by their physician to help guide ongoing treatment."
                           
                        ]}
                        displayBox = {(num) => this.displayBox(num)}
                        nextBox = "2"
                        boxHeight = {425}
                        displayAll = {this.state.displayAll}
                    />

                    <Discoverbox 
                        display = {this.state.box2}
                        title = "Login and enrollment"
                        imgArray = {[ login1, patenroll1, patenroll2]}
                        textArray = {[
                            "Physicians and patients log-in to the application via the login button on the homepage. The application distinguishes between physicians, admin officers and patients and directs each to separate secure areas of the app tailored to their needs."
                            ,
                            "Appropriate patients are identified by their physician and, after explanation and consent, enrolled to use the application."
                            ,
                            "Enrolled patients are allocated to a primary physician as a point of first contact. Usernames and passwords can be given to patients when they enroll in the physician's office, or an email can be sent inviting them to register with a username and password in their own home when they are ready"
                        ]}
                        displayBox = {(num) => this.displayBox(num)}
                        nextBox = "3"
                        boxHeight = {520}
                        displayAll = {this.state.displayAll}
                    />

                    <Discoverbox 
                        display = {this.state.box3}
                        title = "Creating an episode"
                        imgArray = {[ episode2, episode3 ]}
                        textArray = {[ "Central to the MedMonitor concept is the 'episode'. An episode is a period of time, usually of several weeks between successive patient-physician interactions, where a patient is taking a specific and consistent set of medications. New episodes are created in the application at those times when the patient and physician get together to review disease management. At home, the patient enters information on their wellbeing and disease related symptoms, via an easy to use patient survey and this data is recorded and linked to the current episode. "
                        ,
                        "An episode is created simply by entering the patients current set of medications and/or treatments and by fixing the next clinic appointment or review date. Application logic is aware of the patients current medications and so only changes need to be entered - via a very east to use and intuitive interface - at each episode creation, thereby saving physician time. The application is then ready to accept patient input data for the new episode via the patient survey." 
                        ]}
                        displayBox = {(num) => this.displayBox(num)}
                        nextBox = "4"
                        boxHeight = {550}
                        displayAll = {this.state.displayAll}
                    />

                    <Discoverbox 
                        display = {this.state.box4}
                        title = "Patient survey"
                        imgArray = {[ patsurvey1, patsurvey2, patsurvey3, patsurvey4, patsurvey5, patsurvey6 ]}
                        textArray = {[ "Patients login from their own home, or while on the go, and are reminded of when their next dose of medication is due that day. A reminder can also be sent directly to the patient's google calander. The patient interface is simple, easy to use and fully responsive so that it can be viewed, and data entered, on any logged on device of the patient's choice."
                        ,
                        "In a one hour window around their medication dosage times, the patient is prompted to take a short patient-customised survey. First they asked whether they are up to date with their Parkinson's medications. The application logic records their response and can account for skipped medication doses during later processing of the data."
                        ,
                        "Next they are asked about any alarming symptoms common to Parkinson's disease. Such symptoms can warn of a medical emergency and a positive reponse triggers an immediate alert to their physician via the application interface and by email. Recent patient alerts are viewed in the dashboard of the admin area of the application whenever a physician logs in." 
                        ,
                        "The patient is then asked to answer a short series of questions asking about their current wellbeing,  about specific Parkinson's disease symptoms that they might be experiencing at that moment and also about their symptoms over the hours since their previous dose of medication."
                        ,
                        "The survey also includes questions about common Parkinson's medication side effects that the patient may suffer with, allowing early detection, or close monitoring if appropriate, of adverse effects."
                        ,
                        "Patient responses are recorded along with time and date in the current patient episode. This associates the wellbeing, symptoms and side effects entered by the patient with time of day and with the exact medications being taken. In other words, it becomes a continually added to, and over time increasingly accurate, record of each patient's response to their current set of medications. Reminders of next medication time and of next physician appointment are displayed at the end of each survey."
                       ]}
                        displayBox = {(num) => this.displayBox(num)}
                        nextBox = "5"
                        boxHeight = {538}
                        displayAll = {this.state.displayAll}
                    />

                    <Discoverbox 
                        display = {this.state.box5}
                        title = "Reviewing patient data"
                        imgArray = {[ report1, report2, report3, report4, report5, report6]}
                        textArray = {[
                            "Successive survey responses, over the weeks between physician appointments, are collated and analysed by the application logic. This generates a detailed picture of the pattern in which the patient's wellbeing and Parkinson's disease specific symptoms vary throughout the day and in response to their medication times.  Processed data is accesible to the physician at anytime in the form of easily readable reports and charts for any enrolled patient."
                            ,
                            "Interactive graphs corrolate the patient's disease specific symptoms with time of day and with medications active at those times. Graphs can be readily customized to look at overall disease burden, narrow in on specific symptoms, compare any two patient episodes as well as display error bars for valid statistical comparisons."
                            ,
                           "Data on possible medication side effects, as well as on frequency of alarming disease specific symptoms is also reported for early physician detection and response. "
                            ,
                            "Succcesive episodes can be viewed side by side, along with respective medication regimen, to allow direct comparison between episodes and easy assessment of patient response to medication changes between episodes."
                            ,
                            "Longitudinal data, showing trends in patient symptoms, side effects and serious symptom alerts over time can also be easily viewed in fully customizable graphs covering patient data all the way back to when they first enrolled if required." 
                            ,
                            "MedMonitor works to present complex medical data as succinctly and easy for the physician to work with as possible. For example, medications can be compared between different episodes, with new medications added to the patient's regimen highligted in green, changes to medications in orange with the specific change underlined, and removed medications highlighted in red on the previous episode's list"
                            
                         
                       ]}
                        displayBox = {(num) => this.displayBox(num)}
                        nextBox = "6"
                        boxHeight = {503}
                        displayAll = {this.state.displayAll}
                    />

                     <Discoverbox 
                        display = {this.state.box6}
                        title = "Administration"
                        imgArray = {[ adminhomepage, dashboard, admin1, admin2, admin3]}
                        textArray = {[ "Physician login goes first to the admin homepage, with action menu to the left and dashboard to the right. From the action menu all the functionality of the admin area can be accessed including selecting patients to work with, creating episodes and reports, enrolling new patients and updating patient information."
                        ,
                        "The patient dashboard gives the physician an overview of those patients most likely to need  their earlier attention. At the top, is a list newly enrolled patients requiring early follow up to ensure they are registered, have access and are comfortable using the application. Below them is a list of patients coming to clinic that week, so they can be quickly found and selected for review. Finally at the bottom is a list of the most recent alarming symptom alerts so these patients can contacted and recieve prompt follow up by their physicia and to avert a healthcare emergency."
                        ,
                        "Patients to work with can be easily found and selected from a dropdpown list of all enrolled patients, or can be searched directly by name and/or hospital identification number."
                        ,
                        "Details of selected patients are displayed for review to ensure the correct patient is selected and a series of options displayed. Select 'create a new episode' to create a new patient episode, 'report' to create a report and review patient data (see above). In addition, patient details can be updated if they change contact phone or email. Clinic appointment times can be reviewed and ammended if necessary with appointment reminders sent by email or entered directly into the patient's google calendar."
                        ,
                        "Importantly, patients can be made inactive if they no longer want to use the application, move out of area or stop receiving care for their Parkinson's disease. Data already gathered for inactive patient is retained by the application but no further episodes can be created or data entered. Patients can be easily re-activated at any time in the future if they use the application once again."
                       ]}
                        displayBox = {(num) => this.displayBox(num)}
                        nextBox = "7"
                        boxHeight = {465}
                        displayAll = {this.state.displayAll}
                    />

                     <Discoverbox 
                        display = {this.state.box7}
                        title = "Customization"
                        imgArray = {[ customization1, physicians2, medications1, medications2]}
                        textArray = {["Medmonitor can be customized for the office or hospital, for the physician and even for the patient."
                        ,
                        "From the admin menu, a custom list of physicians currently working with the aplication in that office or hospital can be constructed, with full functionality to select physicians, add or remove physicians from the list and update physician details as required. "
                        ,
                        "MedMonitors comes with a list of the most commonly used medications, with doses, formulations and routes, that Parkinson's specialists are likely to need in theor day to day practice, all easily selected from drop-down menus whereever and whenever required."
                        ,
                        "Further, the list of medications can be customized for any office, hopspital or physician's individual practice by adding new medications to the list, removing medications or customizing doses, formulations and routes."
                       ]}
                        displayBox = {(num) => this.displayBox(num)}
                        nextBox = "8"
                        boxHeight = {463}
                        displayAll = {this.state.displayAll}
                    />

                    <Discoverbox 
                        display = {this.state.box8}
                        title = "Data menu"
                        imgArray = {[ datamenu1 ]}
                        textArray = {["With 1-2% of Western populations suffering from Parkinson's diasease, even if only a small fraction of patients take advantage of it, MedMonitor offers a unique opportunity to gather a large quantity of data on Parkinson's disease, exactly how it affects patients, on symptom progression over time, and significantly, on the effectiveness of particular medications and medication combinations. Looking forward, we envisage adding data analysis features to facilitate Parkinson's disease research, compare drug efficacies, allow early warning of drug adverse effects and even train machine learning and AI algorithms to make treatment suggestions."
                       ]}
                        displayBox = {(num) => this.displayBox(num)}
                        nextBox = "last"
                        boxHeight = {515}
                        displayAll = {this.state.displayAll}
                    />

                </Container>
            </Container>
        )
    }
}