import React, { Component } from 'react';
import {LineChart, Line, BarChart, Bar,
        XAxis, 
        YAxis, 
        Tooltip, 
        Legend, ErrorBar
    } from 'recharts';
import moment from "moment";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'
import Medication from "../Medication";
import {
    Container, Row, Col,
    Button, 
    Card, CardBody, CardTitle,
} from 'reactstrap';
import CustomTooltip from "../CustomTooltip";

import '../../../../pages/Admin';
import './chartSideBySide.css';

export default class ChartSideBySide extends React.Component {

    state = {

        symptomChart: true,
        sideEffectChart: false,
        alertChart: false,

        green: true,
        magenta: true,
        orange: true,
        purple: true,
        red: true,
        cyan: true,
        grey: true,
        blue: true,
        black: true,

        errorOn: false,

        value: 0,
    };

    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.episodeCount});
}

    onClickedSymptoms(id) {
        this.setState({symptomChart: true})
        this.setState({sideEffectChart: false})
        this.setState({alertChart: false})
        this.onClickedToggleAll(true)
    };


    onClickedSideEffects(id) {
        this.setState({symptomChart: false})
        this.setState({sideEffectChart: true})
        this.setState({alertChart: false})
        this.onClickedToggleAll(true)
    };


    onClickedAlerts(id) {
        this.setState({symptomChart: false})
        this.setState({sideEffectChart: false})
        this.setState({alertChart: true})
        this.onClickedToggleAll(true)
    };


    onClickedToggleAll(toggle) {
        this.setState({ green: toggle })
        this.setState({ magenta: toggle})
        this.setState({ orange: toggle})
        this.setState({ purple: toggle})
        this.setState({ red: toggle})
        this.setState({ cyan: toggle})
        this.setState({ grey: toggle})
        this.setState({ blue: toggle})
        this.setState({ black: toggle})    
    };


    handleChange = value => {
        this.setState({
            value: value
        })
    };


    handleChangeComplete = () => {
        console.log('Change event completed' + this.state.value)
        this.props.updateRange(this.state.value);
    };
    


    render () {
        return (

            <div> 
                <Card className="TableCard">
                    <CardBody className="TableBody">
                        <CardTitle className="Title" style={{display: this.state.symptomChart ? "block" : "none"}}>Parkinson's symptoms by time of day/medication time </CardTitle>
                        <CardTitle className="Title" style={{display: this.state.sideEffectChart ? "block" : "none"}}>Side Effects experienced by time of day/medication time </CardTitle>
                        <CardTitle className="Title" style={{display: this.state.alertChart ? "block" : "none"}}>Emergency alerts by date </CardTitle>

                        <Container>

                            <Row>
                                <Col md="12">
                                
                                    <Button className="symptomChart" color="info" size="sm" style={{border: this.state.symptomChart ? '3px solid black': 'none'}} onClick = {() => this.onClickedSymptoms()}>Symptoms</Button>
                                    <Button className="symptomChart" color="info" size="sm"  style={{border: this.state.sideEffectChart ? '3px solid black': 'none'}}onClick = {() => this.onClickedSideEffects()}>Side Effects</Button>
                                    <Button className="symptomChart" color="info" size="sm"  style={{border: this.state.alertChart ? '3px solid black': 'none'}}onClick = {() => this.onClickedAlerts()}>Alerts</Button>
                                    
                                    <span style={{fontWeight: "bold", marginLeft: -15,}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toggle: </span>

                                    <span style={{display: this.state.symptomChart ? "inline" : "none"}}>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "green"}} onClick = {() => this.setState({green: !this.state.green})}>&nbsp;&nbsp;</Button>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "magenta"}} onClick = {() => this.setState({magenta: !this.state.magenta})}>&nbsp;&nbsp;</Button>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "orange"}} onClick = {() => this.setState({orange: !this.state.orange})}>&nbsp;&nbsp;</Button>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "purple"}} onClick = {() => this.setState({purple: !this.state.purple})}>&nbsp;&nbsp;</Button>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "red"}} onClick = {() => this.setState({red: !this.state.red})}>&nbsp;&nbsp;</Button>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "cyan"}} onClick = {() => this.setState({cyan: !this.state.cyan})}>&nbsp;&nbsp;</Button>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "grey"}} onClick = {() => this.setState({grey: !this.state.grey})}>&nbsp;&nbsp;</Button>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "blue"}} onClick = {() => this.setState({blue: !this.state.blue})}>&nbsp;&nbsp;</Button>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "black"}} onClick = {() => this.setState({black: !this.state.black})}>&nbsp;&nbsp;</Button>
                                        </span>

                                    <span style={{display: this.state.sideEffectChart ? "inline" : "none"}}>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "green"}} onClick = {() => this.setState({green: !this.state.green})}>&nbsp;&nbsp;</Button>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "magenta"}} onClick = {() => this.setState({magenta: !this.state.magenta})}>&nbsp;&nbsp;</Button>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "orange"}} onClick = {() => this.setState({orange: !this.state.orange})}>&nbsp;&nbsp;</Button>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "purple"}} onClick = {() => this.setState({purple: !this.state.purple})}>&nbsp;&nbsp;</Button>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "black"}} onClick = {() => this.setState({black: !this.state.black})}>&nbsp;&nbsp;</Button>
                                    </span>

                                    <span style={{display: this.state.alertChart ? "inline" : "none"}}>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "green"}} onClick = {() => this.setState({green: this.state.green ? false : true})}>&nbsp;&nbsp;</Button>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "magenta"}} onClick = {() => this.setState({magenta: this.state.magenta ? false : true})}>&nbsp;&nbsp;</Button>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "orange"}} onClick = {() => this.setState({orange: this.state.orange ? false : true})}>&nbsp;&nbsp;</Button>
                                        <Button className="chartBtn" size="sm" style={{backgroundColor: "purple"}} onClick = {() => this.setState({purple: this.state.purple ? false : true})}>&nbsp;&nbsp;</Button>
                                    </span>

                                    <Button className="minusChartBtn" size="sm" onClick = {() => this.onClickedToggleAll(false)}><div style={{lineHeight: 0, fontWeight: "bold", fontSize: "1.2em"}}>-</div></Button>
                                    <Button className="plusChartBtn" size="sm" onClick = {() => this.onClickedToggleAll(true)}><div style={{lineHeight: 0, fontWeight: "bold", fontSize: "1.2em"}}>+</div></Button>
                                    <Button className="errorChartBtn" style={{display: this.state.alertChart ? "none" : "inline"}} size="sm" onClick = {() => this.setState({errorOn: !this.state.errorOn})}><div style={{lineHeight: 0.8, fontWeight: "bold", fontSize: "0.8em"}}>SD</div></Button> 

                                    <span style={{display: "inline", fontWeight: "bold"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Episode range: </span>
                                    <span className='slider-horizontal' style={{display: "inline", float: "right", width: this.state.symptomChart ? 190 : (this.state.sideEffectChart ? 300 : 360), height: 50}}>
                                        <Slider 
                                        min={1}
                                        max={this.props.rangeMax}
                                        value={this.state.value}
                                        onChangeStart={this.handleChangeStart}
                                        onChange={this.handleChange}
                                        onChangeComplete={this.handleChangeComplete}
                                        />
                                    </span>

                                </Col>
                            </Row>

                            <Row>

                            <Col md="6" style={{marginLeft: -10, padding: 0}}>
                           
                                <LineChart style={{display: this.state.symptomChart ? "block" : "none"}} width={568} height={300} data={this.props.lineChartDataA} margin={{top: 10, right: 0, left: 0, bottom: 0}} >
                                    <Line type='monotone' dataKey='Kickin' strokeDasharray="6 6" stroke="green"  fill="green" strokeWidth={1.5} style={{display: this.state.green ? "block" : "none" }}>
                                        <ErrorBar dataKey="KickinSD" width={4} strokeWidth={1.0} style={{display: this.state.green && this.state.errorOn ? "block" : "none" }}/> 
                                    </Line> 
                                    <Line type='monotone' dataKey='Wearoff' strokeDasharray="6 6" stroke="magenta" fill="magenta" strokeWidth={1.5} style={{display: this.state.magenta ? "block" : "none" }}>
                                        <ErrorBar dataKey="WearoffSD" width={4} strokeWidth={1.0} style={{display: this.state.magenta && this.state.errorOn ? "block" : "none" }}/> 
                                    </Line>
                                    <Line type='monotone' dataKey='Movement' strokeDasharray="6 6" stroke="orange" fill="orange" strokeWidth={1.5} style={{display: this.state.orange ? "block" : "none" }}>
                                        <ErrorBar dataKey="MovementSD" width={4} strokeWidth={1.0} style={{display: this.state.orange && this.state.errorOn ? "block" : "none" }}/> 
                                    </Line>
                                    <Line type='monotone' dataKey='Tiredness' strokeDasharray="6 6" stroke="purple" fill="purple" strokeWidth={1.5} style={{display: this.state.purple ? "block" : "none" }}>
                                        <ErrorBar dataKey="TirednessSD" width={4} strokeWidth={1.0} style={{display: this.state.purple && this.state.errorOn ? "block" : "none" }}/> 
                                    </Line>
                                    <Line type='monotone' dataKey='Offtime' strokeDasharray="6 6" stroke="red" fill="red" strokeWidth={1.5} style={{display: this.state.red ? "block" : "none" }}>
                                        <ErrorBar dataKey="OfftimeSD" width={4} strokeWidth={1.0} style={{display: this.state.red && this.state.errorOn ? "block" : "none" }}/> 
                                    </Line>
                                    <Line type='monotone' dataKey='Tremor' strokeDasharray="6 6" stroke="cyan" fill="cyan" strokeWidth={1.5} style={{display: this.state.cyan ? "block" : "none" }}>
                                        <ErrorBar dataKey="MovementSD" width={4} strokeWidth={1.0} style={{display: this.state.cyan && this.state.errorOn ? "block" : "none" }}/> 
                                    </Line>
                                    <Line type='monotone' dataKey='Walking' strokeDasharray="6 6" stroke="grey" fill="grey" strokeWidth={1.5} style={{display: this.state.grey ? "block" : "none" }}>
                                        <ErrorBar dataKey="WalkingSD" width={4} strokeWidth={1.0} style={{display: this.state.grey && this.state.errorOn ? "block" : "none" }}/> 
                                    </Line>
                                    <Line type='monotone' dataKey='Balance' strokeDasharray="6 6" stroke="blue" fill="blue" strokeWidth={1.5} style={{display: this.state.blue ? "block" : "none" }}>
                                        <ErrorBar dataKey="BalanceSD" width={4} strokeWidth={1.0} style={{display: this.state.blue && this.state.errorOn ? "block" : "none" }}/> 
                                    </Line>
                                    <Line type='monotone' dataKey='Average' stroke="black" strokeWidth={5} style={{display: this.state.black? "block" : "none" }}>
                                        <ErrorBar dataKey="AverageSD" width={4} strokeWidth={1.0} style={{display: this.state.black && this.state.errorOn ? "block" : "none" }}/> 
                                    </Line>
                                    <YAxis scale="linear" ticks={[50,100]} />
                                    <XAxis dataKey="name" tick={{fontWeight: "bold"}} padding={{left: 30, right: 30}}/>
                                    <Tooltip cursor={{strokeWidth: 20, opacity: 0.3}} position={{y: 10 }} content={<CustomTooltip data={this.props.medsToolTipsA} header="Time: " />}/>
                                    <Legend align="right" verticalAlign="top" layout="vertical" wrapperStyle={{ height: 262, padding: 10, fontWeight: 600, top: 8, right: -35, border: '1px solid grey', borderRadius: 3}} /> 
                                </LineChart>

                                <LineChart style={{display: this.state.sideEffectChart ? "block" : "none"}} width={568} height={300} data={this.props.lineChartDataA} margin={{top: 10, right: 0, left: 0, bottom: 0}} >
                                    <Line type='monotone' dataKey='Sickness' strokeDasharray="3 4 5 2" stroke="green" fill="green" style={{display: this.state.green ? "block" : "none" }}>
                                        <ErrorBar dataKey="SicknessSD" width={4} strokeWidth={1.0} style={{display: this.state.green && this.state.errorOn ? "block" : "none" }}/> 
                                    </Line>
                                    <Line type='monotone' dataKey='Dizziness' strokeDasharray="3 4 5 2" stroke="magenta" fill="magenta" style={{display: this.state.magenta ? "block" : "none" }}>
                                        <ErrorBar dataKey="DizzinessSD" width={4} strokeWidth={1.0} style={{display: this.state.megenta && this.state.errorOn ? "block" : "none" }}/> 
                                    </Line>
                                    <Line type='monotone' dataKey='Headache' strokeDasharray="3 4 5 2" stroke="orange" fill="orange" style={{display: this.state.orange ? "block" : "none" }}>
                                        <ErrorBar dataKey="HeadacheSD" width={4} strokeWidth={1.0} style={{display: this.state.orange && this.state.errorOn ? "block" : "none" }}/> 
                                    </Line>
                                    <Line type='monotone' dataKey='Drymouth' strokeDasharray="3 4 5 2" stroke="purple" fill="purple" style={{display: this.state.purple ? "block" : "none" }}>
                                        <ErrorBar dataKey="DrymouthSD" width={4} strokeWidth={1.0} style={{display: this.state.purple && this.state.errorOn ? "block" : "none" }}/> 
                                    </Line>
                                    <Line type='monotone' dataKey='Average_' stroke="black" strokeWidth={5} style={{display: this.state.black ? "block" : "none" }}>
                                        <ErrorBar dataKey="Average_SD" width={4} strokeWidth={1.0} style={{display: this.state.black && this.state.errorOn ? "block" : "none" }}/> 
                                    </Line>
                                    <YAxis scale = "linear" ticks={[50,100]} />
                                    <XAxis dataKey="name" tick={{fontWeight: "bold"}} padding={{left: 30, right: 30}}/>
                                    <Tooltip cursor={{strokeWidth: 20, opacity: 0.3}} position={{y: 10 }} content={<CustomTooltip data={this.props.medsToolTips} header="Time: "/>}/>
                                    <Legend align="right" verticalAlign="top" layout="vertical" wrapperStyle={{padding: 10, fontWeight: 600, top: 8, right: -35, border: '1px solid grey', borderRadius: 3}} />
                                </LineChart>

                                <BarChart style={{display: this.state.alertChart ? "block" : "none"}} width={625} height={250} data={this.props.barChartDataA} margin={{top: 10, right: 30, left: 0, bottom: 30}} >
                                    <Bar dataKey='Falls' stackId="a" fill="green" />
                                    <Bar dataKey='Freezing' stackId="a" fill="magenta" />
                                    <Bar dataKey='Choking' stackId="a" fill="orange" />
                                    <Bar dataKey='Hallucinations' stackId="a" fill="red" />
                                    <YAxis scale="linear"  type="number" domain={[0,'dataMax + 2']} />
                                    <XAxis dataKey="name" tick={{fontSize: 15, fontWeight: "bold", angle: 45, dy: 20 }} padding={{left: 30, right: 30}}/>
                                    <Legend align="right" verticalAlign="top" layout="vertical" wrapperStyle={{ padding: 10, fontWeight: 600, top: 8, right: 20, border: '1px solid grey', borderRadius: 3}} />
                                    <br />
                                </BarChart>  

                                <div style={{paddingLeft: 60, width: 440, marginTop: 10, marginBottom: 10}}>
                                    {this.props.episodeCount < 2 ?
                                        <p style={{paddingLeft: 20, lineHeight: 2.5, fontSize: 16, fontWeight: "bold", backgroundColor: "#9eb1bd"}}>Current Episode</p>
                                    : null }

                                    {this.props.episodeCount == 2 ?
                                        <p style={{paddingLeft: 20, lineHeight: 2.5, fontSize: 16, fontWeight: "bold", backgroundColor: "#9eb1bd"}}>Previous Episode</p>
                                    : null }

                                    {this.props.episodeCount > 2 ?
                                        <p style={{paddingLeft: 20, lineHeight: 2.5, fontSize: 16, fontWeight: "bold", backgroundColor: "#9eb1bd"}}>{moment(this.props.episodeDatesA[0]).format("MMMM Do YYYY")} - {moment(this.props.episodeDatesA[1]).format("MMMM Do YYYY")}</p>
                                    : null }    
                                </div>

                                <div className="clearfix" style={{width: 600}}>

                                    <Container style={{paddingLeft: 60, width: 460, float: "left"}}>
                                        <Medication
                                            medications = {this.props.medicationsA}
                                            chartToShow = {this.props.chartToShow}
                                        />
                                    </Container>

                                    <Container style={{width: 125, padding: 10, borderStyle: "solid", borderWidth: 1, borderColor: "#666666", borderRadius: 3, float: "right"}}>
                                        <div style={{ fontWeight: 635, fontSize: 16, backgroundColor: "rgb(92, 178, 92, 0.2)",  marginBottom: 10}}>New</div>
                                        <div style={{ fontWeight: 635, fontSize: 16, textDecoration: "underline", backgroundColor: "rgb(252, 203, 0, 0.2)", marginBottom: 10 }}>Changed</div>
                                        <div style={{ fontWeight: 635, fontSize: 16, backgroundColor: "rgb(178, 92, 92, 0.2)", marginBottom: 10}}>Deleted</div>
                                    </Container>
                                </div> 
                                    
                            </Col>

                            <Col md="6" style={{paddingLeft: 60}}>

                                <div style={{display: this.state.value === this.props.rangeMax ? "block" : "none", width: 395, marginLeft: 60}}>
                                     <p style={{lineHeight: 2.5, fontSize: 16, fontWeight: "bold", textAlign: "center", backgroundColor: "#9eb1bd"}}>No more episodes to display</p>
                                </div>

                                <div style={{display: this.state.value === this.props.rangeMax ? "none" : "block"}}>
                                    <LineChart style={{display: this.state.symptomChart ? "block" : "none"}} width={450} height={300} data={this.props.lineChartDataB} margin={{top: 10, right: 0, left: 0, bottom: 0}} >
                                        <Line type='monotone' dataKey='Kickin' strokeDasharray="6 6" stroke="green"  fill="green" strokeWidth={1.5} style={{display: this.state.green ? "block" : "none" }}>
                                            <ErrorBar dataKey="KickinSD" width={4} strokeWidth={1.0} style={{display: this.state.green && this.state.errorOn ? "block" : "none" }}/> 
                                        </Line> 
                                        <Line type='monotone' dataKey='Wearoff' strokeDasharray="6 6" stroke="magenta" fill="magenta" strokeWidth={1.5} style={{display: this.state.magenta ? "block" : "none" }}>
                                            <ErrorBar dataKey="WearoffSD" width={4} strokeWidth={1.0} style={{display: this.state.magenta && this.state.errorOn ? "block" : "none" }}/> 
                                        </Line>
                                        <Line type='monotone' dataKey='Movement' strokeDasharray="6 6" stroke="orange" fill="orange" strokeWidth={1.5} style={{display: this.state.orange ? "block" : "none" }}>
                                            <ErrorBar dataKey="MovementSD" width={4} strokeWidth={1.0} style={{display: this.state.orange && this.state.errorOn ? "block" : "none" }}/> 
                                        </Line>
                                        <Line type='monotone' dataKey='Tiredness' strokeDasharray="6 6" stroke="purple" fill="purple" strokeWidth={1.5} style={{display: this.state.purple ? "block" : "none" }}>
                                            <ErrorBar dataKey="TirednessSD" width={4} strokeWidth={1.0} style={{display: this.state.purple && this.state.errorOn ? "block" : "none" }}/> 
                                        </Line>
                                        <Line type='monotone' dataKey='Offtime' strokeDasharray="6 6" stroke="red" fill="red" strokeWidth={1.5} style={{display: this.state.red ? "block" : "none" }}>
                                            <ErrorBar dataKey="OfftimeSD" width={4} strokeWidth={1.0} style={{display: this.state.red && this.state.errorOn ? "block" : "none" }}/> 
                                        </Line>
                                        <Line type='monotone' dataKey='Tremor' strokeDasharray="6 6" stroke="cyan" fill="cyan" strokeWidth={1.5} style={{display: this.state.cyan ? "block" : "none" }}>
                                            <ErrorBar dataKey="MovementSD" width={4} strokeWidth={1.0} style={{display: this.state.cyan && this.state.errorOn ? "block" : "none" }}/> 
                                        </Line>
                                        <Line type='monotone' dataKey='Walking' strokeDasharray="6 6" stroke="grey" fill="grey" strokeWidth={1.5} style={{display: this.state.grey ? "block" : "none" }}>
                                            <ErrorBar dataKey="WalkingSD" width={4} strokeWidth={1.0} style={{display: this.state.grey && this.state.errorOn ? "block" : "none" }}/> 
                                        </Line>
                                        <Line type='monotone' dataKey='Balance' strokeDasharray="6 6" stroke="blue" fill="blue" strokeWidth={1.5} style={{display: this.state.blue ? "block" : "none" }}>
                                            <ErrorBar dataKey="BalanceSD" width={4} strokeWidth={1.0} style={{display: this.state.blue && this.state.errorOn ? "block" : "none" }}/> 
                                        </Line>
                                        <Line type='monotone' dataKey='Average' stroke="black" strokeWidth={5} style={{display: this.state.black? "block" : "none" }}>
                                            <ErrorBar dataKey="AverageSD" width={4} strokeWidth={1.0} style={{display: this.state.black && this.state.errorOn ? "block" : "none" }}/> 
                                        </Line>
                                        <YAxis scale="linear" ticks={[50,100]} tick={{opacity: 0}}/>
                                        <XAxis dataKey="name" tick={{fontWeight: "bold"}} padding={{left: 30, right: 30}}/>
                                        <Tooltip cursor={{strokeWidth: 20, opacity: 0.3}} position={{y: 10 }} content={<CustomTooltip data={this.props.medsToolTipsB} header="Time: " />}/>
                                    </LineChart>

                                    <LineChart style={{display: this.state.sideEffectChart ? "block" : "none"}} width={450} height={300} data={this.props.lineChartDataB} margin={{top: 10, right: 0, left: 0, bottom: 0}} >
                                        <Line type='monotone' dataKey='Sickness' strokeDasharray="3 4 5 2" stroke="green" fill="green" style={{display: this.state.green ? "block" : "none" }}>
                                            <ErrorBar dataKey="SicknessSD" width={4} strokeWidth={1.0} style={{display: this.state.green && this.state.errorOn ? "block" : "none" }}/> 
                                        </Line>
                                        <Line type='monotone' dataKey='Dizziness' strokeDasharray="3 4 5 2" stroke="magenta" fill="magenta" style={{display: this.state.magenta ? "block" : "none" }}>
                                            <ErrorBar dataKey="DizzinessSD" width={4} strokeWidth={1.0} style={{display: this.state.megenta && this.state.errorOn ? "block" : "none" }}/> 
                                        </Line>
                                        <Line type='monotone' dataKey='Headache' strokeDasharray="3 4 5 2" stroke="orange" fill="orange" style={{display: this.state.orange ? "block" : "none" }}>
                                            <ErrorBar dataKey="HeadacheSD" width={4} strokeWidth={1.0} style={{display: this.state.orange && this.state.errorOn ? "block" : "none" }}/> 
                                        </Line>
                                        <Line type='monotone' dataKey='Drymouth' strokeDasharray="3 4 5 2" stroke="purple" fill="purple" style={{display: this.state.purple ? "block" : "none" }}>
                                            <ErrorBar dataKey="DrymouthSD" width={4} strokeWidth={1.0} style={{display: this.state.purple && this.state.errorOn ? "block" : "none" }}/> 
                                        </Line>
                                        <Line type='monotone' dataKey='Average_' stroke="black" strokeWidth={5} style={{display: this.state.black ? "block" : "none" }}>
                                            <ErrorBar dataKey="Average_SD" width={4} strokeWidth={1.0} style={{display: this.state.black && this.state.errorOn ? "block" : "none" }}/> 
                                        </Line>
                                        <YAxis scale = "linear" ticks={[50,100]} tick={{opacity: 0}} />
                                        <XAxis dataKey="name" tick={{fontWeight: "bold"}} padding={{left: 30, right: 30}}/>
                                        <Tooltip cursor={{strokeWidth: 20, opacity: 0.3}} position={{y: 10 }} content={<CustomTooltip data={this.props.medsToolTips} header="Time: "/>}/>
                                    </LineChart>

                                    <BarChart style={{display: this.state.alertChart ? "block" : "none"}} width={480} height={250} data={this.props.barChartDataB} margin={{top: 10, right: 30, left: 0, bottom: 30}} >
                                        <Bar dataKey='Falls' stackId="a" fill="green" />
                                        <Bar dataKey='Freezing' stackId="a" fill="magenta" />
                                        <Bar dataKey='Choking' stackId="a" fill="orange" />
                                        <Bar dataKey='Hallucinations' stackId="a" fill="red" />
                                        <YAxis scale="linear"  type="number" domain={[0,'dataMax + 2']} tick={{opacity: 0}}/>
                                        <XAxis dataKey="name" tick={{fontSize: 15, fontWeight: "bold", angle: 45, dy: 20, zIndex: 10}} style={{display: this.state.alertChart ? "block" : "none"}} padding={{left: 30, right: 30}} />
                                    </BarChart>  

                                    <div style={{marginLeft: 60, width: 390, marginTop: 10, marginBottom: 10}}>
                                        {this.props.episodeCount < 2 ?
                                            <p style={{paddingLeft: 20, lineHeight: 2.5, fontSize: 16, fontWeight: "bold", backgroundColor: "#9eb1bd"}}>Previous Episode</p>
                                        : null }

                                        {this.props.episodeCount >= 2 ?
                                            <p style={{paddingLeft: 20, lineHeight: 2.5, fontSize: 16, fontWeight: "bold", backgroundColor: "#9eb1bd"}}>{moment(this.props.episodeDatesB[0]).format("MMMM Do YYYY")} - {moment(this.props.episodeDatesB[1]).format("MMMM Do YYYY")}</p>
                                        : null }
                                    </div>

                                    <div style={{width: 450, paddingLeft: 60}}>
                                        <Medication 
                                            medications = {this.props.medicationsB}
                                            chartToShow = {this.props.chartToShow}
                                        />
                                    </div>

                                </div>
                            </Col> 
                            </Row>

                        </Container>

                    </CardBody>
                </Card>

            </div>

        
        )
    }           
}