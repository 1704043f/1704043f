import React from "react";
import {Row, Col, Card, CardTitle, CardSubtitle, CardBody, CardText } from 'reactstrap';
import GoMobile from '../../../img/mobile_app.jpg'
import GameImg from '../../../img/game.jpg'
import YogaImg from '../../../img/yoga.jpg'
const FuturePlan = ({ children }) => (

    <div fluid className='home-about'>

        <br />
        <h1 class="text-center"> Future Developments</h1>
        <br />
        <Row>
            <Col md='3'>
                <img top width="100%" src={GoMobile} alt="Mobile" />
            </Col>
            <Col md='9'>
                <Card style={{borderColor: "transparent"}}>
                    <CardBody style={{borderColor: "transparent", marginTop: 0, paddingTop: 0}}>
                        <CardTitle>Going Mobile!</CardTitle>
                        <CardSubtitle >Mobile Application For IOS and Android</CardSubtitle>
                        <br />
                        <CardText>Patients will be able to download MedMonitor onto their mobile phone or tablet and enter data wherever they are, whatever they are doing - as well as get reminded to take their medications while on the go. </CardText>
                    </CardBody>
                </Card>
                
            </Col>
        </Row>
        <br />
        <Row>
            <Col md='3'>
                <img top width="100%" src={GameImg} alt="Game" />
            </Col>
            <Col md='9'>
                <Card style={{borderColor: "transparent"}}>
                    <CardBody style={{borderColor: "transparent", marginTop: 0, paddingTop: 0}}>
                        <CardTitle>Wearables</CardTitle>
                        <CardSubtitle>Integration of clinical data from wearable devices.</CardSubtitle>
                        <br />
                        <CardText>Real time monitoring of key clinical signs such as tremor and movement by IOT connected wearable devices and smartwatches are a recent development Parkinson's assessment and research. MedMonitor can offer an ideal platform for analysis and presentation of data generated to gain maximum benefit to patient and physician alike. </CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <br />
        <Row>
            <Col md='3'>
                <img top width="100%" src={YogaImg} alt="Yoga" />
            </Col>
            <Col md='9'>
            <Card style={{borderColor: "transparent"}}>
                    <CardBody style={{marginTop: 0, paddingTop: 0}}>
                        <CardTitle>Big data & AI</CardTitle>
                        <CardSubtitle>Ground up data architecture to facilitate data mining and machine learning algorithms.</CardSubtitle>
                         <br />
                        <CardText>MedMonitor connects patient's medication regimen to outcomes, thereby generating a large and valuable data set for research and industry analysis. Further, such data makes an ideal training set for machine learning algorithms, offering the possibility of bringingAI supported decision making directly into the clinic!</CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <br />

        <hr className="text-center" />
    </div>

);

export default FuturePlan;
