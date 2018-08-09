import React from "react";
import {Row, Col, Card, CardTitle, CardSubtitle, CardBody, CardText } from 'reactstrap';
import wearables from '../../../img/wearables.jpg'
import mobileimg from '../../../img/patient-mobile.PNG'
import bigdata from '../../../img/bigdata.PNG'
const FuturePlan = ({ children }) => (

    <div fluid className='home home-about'>
        <span id='futureplans'></span>
        <br />
        <h1 className="text-center"> Future Developments</h1>
        <br />
        <Row>
            <Col md='3'>
                <img top width="100%" src={mobileimg} alt="Mobile" />
            </Col>
            <Col md='9'>
                <Card style={{borderColor: "transparent"}}>
                    <CardBody style={{borderColor: "transparent", marginTop: 0, paddingTop: 0}}>
                        <CardTitle className="future-card-title">Going Mobile!</CardTitle>
                        <CardSubtitle className="future-card-subtitle">Mobile Application For IOS and Android</CardSubtitle>
                        <br />
                        <CardText>Patients will be able to download MedMonitor onto their mobile phone or tablet and enter data wherever they are, whatever they are doing - as well as get reminded to take their medications while on the go. </CardText>
                    </CardBody>
                </Card>
                
            </Col>
        </Row>
        <br />
        <Row>
            <Col md='3'>
                <img top width="100%" src={wearables} alt="Game" />
            </Col>
            <Col md='9'>
                <Card style={{borderColor: "transparent"}}>
                    <CardBody style={{borderColor: "transparent", marginTop: 0, paddingTop: 0}}>
                        <CardTitle className="future-card-title">Wearables</CardTitle>
                        <CardSubtitle className="future-card-subtitle"> Integration of clinical data from wearable devices.</CardSubtitle>
                        <br />
                        <CardText>Real time monitoring of key clinical signs such as tremor and movement by IOT connected wearable devices and smartwatches are a recent development Parkinson's assessment and research. MedMonitor can offer an ideal platform for analysis and presentation of data generated to gain maximum benefit to patient and physician alike. </CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <br />
        <Row>
            <Col md='3'>
                <img top width="100%" src={bigdata} alt="Yoga" />
            </Col>
            <Col md='9'>
            <Card style={{borderColor: "transparent"}}>
                    <CardBody style={{marginTop: 0, paddingTop: 0}}>
                        <CardTitle className="future-card-title">Data analytics</CardTitle>
                        <CardSubtitle className="future-card-subtitle"> Ground up data architecture to facilitate data mining and machine learning algorithms.</CardSubtitle>
                         <br />
                        <CardText>MedMonitor connects patient's medication regimen to outcomes, thereby generating a large and valuable data set for research and industry analysis. Further, such data makes an ideal training set for machine learning algorithms, offering the possibility of bringing AI supported decision making directly into the clinic!</CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <br />

        <hr className="text-center" />
    </div>

);

export default FuturePlan;
