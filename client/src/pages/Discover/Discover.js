import React from 'react';
import {
    Col,
    Row,
    Container,
    Button,
} from 'reactstrap';
import './Discover.css';
import Discoverbox from '../../components/Homepage/Discoverbox'
import enrollpatient from '../../img/enroll-patient.PNG';
import insurance from '../../img/insurance.jpg';


export default class Discover extends React.Component {
    
    state = {
        box2: false,
        box3: false,
        box4: false,

    }


    displayBox(box, scrollMore)  {
        console.log(box)
        switch (box) {
            case "2":
                this.setState({box2: true});
                console.log(this.state.box2)
                break;
            case "3":
                this.setState({box3: true});
                break;
        }

        this.scroll(window.innerWidth < 1060 ? 250 : 125);
    }


    scroll(target) {
        let posn = 0;
        const id = setInterval( () => {
            window.scrollBy(0, 3);
            posn ++;
            if (posn > target) {
                clearInterval(id) }
                }, 1)
    }
    

    render() {
        return (
            <Container fluid>
                <Container fluid className="home-container">

                    <div className="discover-nav">
                         <a href="#">Back</a> 
                    </div>

                   
                    <div className="discover-header text-center">
                        Discover MedMonitor
                    </div>

                    <Discoverbox 
                        display = "true"
                        title = "Patient enrollment"
                        imgArray = {[ enrollpatient, insurance ]}
                        textArray = {[
                            "Physician identifies appropriate patients to use MedMonitor and enters some basic identifying details. If the patient is with them   in clinic they can set up a username and password for accessing the app or they can send an email invitation to the patient to register a username and password remotely"
                            ,
                            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
                        ]}
                        displayBox = {(num) => this.displayBox(num)}
                        nextBox = "2"
                    />

                    <Discoverbox 
                        display = {this.state.box2}
                        title = "Patient registration"
                        imgArray = {[
                            enrollpatient, insurance
                       ]}
                        textArray = {[
                            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
                           ,
                           "Physician identifies appropriate patients to use MedMonitor and enters some basic identifying details.If the patient is with them   in clinic they can set up a username and password for accessing the app or they can send an email invitation to the patient to register a username and password remotely"
                         
                       ]}
                        displayBox = {(num) => this.displayBox(num)}
                        nextBox = "3"
                    />

                    <Discoverbox 
                        display = {this.state.box3}
                        title = "Create an episode"
                        imgArray = {[
                            enrollpatient, insurance
                       ]}
                        textArray = {[
                            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
                           ,
                           "Physician identifies appropriate patients to use MedMonitor and enters some basic identifying details.If the patient is with them   in clinic they can set up a username and password for accessing the app or they can send an email invitation to the patient to register a username and password remotely"
                         
                       ]}
                        displayBox = {(num) => this.displayBox(num)}
                        nextBox = "4"
                    />

                </Container>
            </Container>
        )
    }
}