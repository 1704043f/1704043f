import React, { Component } from 'react';
import {LineChart, Line, BarChart, Bar,
        XAxis, 
        YAxis, 
        Tooltip, 
        Legend,
    } from 'recharts';
import {
    Container, 
    Button, 
    Card, CardBody, CardTitle,
} from 'reactstrap';

import ToggleButton from "../ToggleButton/toggleButton"

import '../../../../pages/Admin';

import './Chart.css';

export default class Chart extends React.Component {

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
        black: true
    }

    onClickedSymptoms(id) {
        this.setState({symptomChart: true})
        this.setState({sideEffectChart: false})
        this.setState({alertChart: false})
        this.onClickedToggleAll(true)
    }

    onClickedSideEffects(id) {
        this.setState({symptomChart: false})
        this.setState({sideEffectChart: true})
        this.setState({alertChart: false})
        this.onClickedToggleAll(true)
    }

    onClickedAlerts(id) {
        this.setState({symptomChart: false})
        this.setState({sideEffectChart: false})
        this.setState({alertChart: true})
        this.onClickedToggleAll(true)
    }

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
    }




    render () {
        return (
           
            <div>
                <Card className="TableCard" style={{display: this.state.symptomChart && this.props.chartOne ? "block" : "none"}}>
                    <CardBody className="TableBody">
                        <CardTitle className="Title">Parkinson's symptoms by time of day/medication time </CardTitle>

                            <Button className="symptomChart" color="info" size="sm" style={{border: '3px solid black'}} onClick = {() => this.onClickedSymptoms()}>Symptoms</Button>
                            <Button className="symptomChart" color="info" size="sm" onClick = {() => this.onClickedSideEffects()}>Side Effects</Button>
                            <Button className="symptomChart" color="info" size="sm" onClick = {() => this.onClickedAlerts()}>Alerts</Button>
                            <span style={{fontWeight: "bold", marginLeft: -15,}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toggle: </span>
                            
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "green"}} onClick = {() => this.setState({green: this.state.green ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "magenta"}} onClick = {() => this.setState({magenta: this.state.magenta ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "orange"}} onClick = {() => this.setState({orange: this.state.orange ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "purple"}} onClick = {() => this.setState({purple: this.state.purple ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "red"}} onClick = {() => this.setState({red: this.state.red ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "cyan"}} onClick = {() => this.setState({cyan: this.state.cyan ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "grey"}} onClick = {() => this.setState({grey: this.state.grey ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "blue"}} onClick = {() => this.setState({blue: this.state.blue ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "black"}} onClick = {() => this.setState({black: this.state.black ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="minusChartBtn" size="sm" onClick = {() => this.onClickedToggleAll(false)}><div style={{lineHeight: 0, fontWeight: "bold", fontSize: "1.2em"}}>-</div></Button>
                            <Button className="plusChartBtn" size="sm" onClick = {() => this.onClickedToggleAll(true)}><div style={{lineHeight: 0, fontWeight: "bold", fontSize: "1.2em"}}>+</div></Button>

                            <div style={{display: this.props.lineChartData ? "none" : "block"}}><p style={{fontWeight: "bold"}} className="text-left">Insufficient data on this patient to display.</p></div>

                            <LineChart width={700} height={350} data={this.props.lineChartData} margin={{top: 10, right: 30, left: 0, bottom: 0}} >
                                <Line type='monotone' dataKey='Kickin' strokeDasharray="6 6" stroke="green"  fill="green" strokeWidth={1.5} style={{display: this.state.green ? "block" : "none" }}/> 
                                <Line type='monotone' dataKey='Wearoff' strokeDasharray="6 6" stroke="magenta" fill="magenta" strokeWidth={1.5} style={{display: this.state.magenta ? "block" : "none" }}/>
                                <Line type='monotone' dataKey='Movement' strokeDasharray="6 6" stroke="orange" fill="orange" strokeWidth={1.5} style={{display: this.state.orange ? "block" : "none" }} />
                                <Line type='monotone' dataKey='Tiredness' strokeDasharray="6 6" stroke="purple" fill="purple" strokeWidth={1.5} style={{display: this.state.purple ? "block" : "none" }}/>
                                <Line type='monotone' dataKey='Offtime' strokeDasharray="6 6" stroke="red" fill="red" strokeWidth={1.5} style={{display: this.state.red ? "block" : "none" }}/>
                                <Line type='monotone' dataKey='Tremor' strokeDasharray="6 6" stroke="cyan" fill="cyan" strokeWidth={1.5} style={{display: this.state.cyan ? "block" : "none" }}/>
                                <Line type='monotone' dataKey='Walking' strokeDasharray="6 6" stroke="grey" fill="grey" strokeWidth={1.5} style={{display: this.state.grey ? "block" : "none" }}/>
                                <Line type='monotone' dataKey='Balance' strokeDasharray="6 6" stroke="blue" fill="blue" strokeWidth={1.5} style={{display: this.state.blue ? "block" : "none" }}/>
                                <Line type='monotone' dataKey='Average' stroke="black" strokeWidth={5} style={{display: this.state.black? "block" : "none" }}/>
                                <YAxis ticks={[2,4]} />
                                <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
                                {/* <Tooltip /> */}
                                <Legend align="right" verticalAlign="top" layout="vertical" wrapperStyle={{ padding: 10, fontWeight: 600, top: 40, right: 20, border: '1px solid grey', borderRadius: 3}} />
                            </LineChart>
                    </CardBody>
                </Card>
            
            
                <Card className="TableCard" style={{display: this.state.sideEffectChart && this.props.chartOne ? "block" : "none"}}>
                    <CardBody className="TableBody">
                        <CardTitle className="Title"> Side effects experienced by time of day/medication time </CardTitle>

                            <Button  className="symptomChart" color="info" size="sm" onClick = {() => this.onClickedSymptoms()}>Symptoms</Button>
                            <Button  className="symptomChart" color="info" size="sm" style={{border: '3px solid black'}} onClick = {() => this.onClickedSideEffects()}>Side Effects</Button>
                            <Button  className="symptomChart" color="info" size="sm" onClick = {() => this.onClickedAlerts()}>Alerts</Button>
                            
                            <span style={{fontWeight: "bold"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toggle: </span>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "green"}} onClick = {() => this.setState({green: this.state.green ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "magenta"}} onClick = {() => this.setState({magenta: this.state.magenta ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "orange"}} onClick = {() => this.setState({orange: this.state.orange ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "purple"}} onClick = {() => this.setState({purple: this.state.purple ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="minusChartBtn" size="sm" onClick = {() => this.onClickedToggleAll(false)}><div style={{lineHeight: 0, fontWeight: "bold", fontSize: "1.2em"}}>-</div></Button>
                            <Button className="plusChartBtn" size="sm" onClick = {() => this.onClickedToggleAll(true)}><div style={{lineHeight: 0, fontWeight: "bold", fontSize: "1.2em"}}>+</div></Button>

                            <div style={{display: this.props.lineChartData ? "none" : "block"}}><p style={{fontWeight: "bold"}} className="text-left">Insufficient data on this patient to display.</p></div>

                            <LineChart width={700} height={350} data={this.props.lineChartData} margin={{top: 10, right: 30, left: 0, bottom: 0}} >
                                <Line type='monotone' dataKey='Sickness' strokeDasharray="3 4 5 2" stroke="green" fill="green" style={{display: this.state.green ? "block" : "none" }}/>
                                <Line type='monotone' dataKey='Dizziness' strokeDasharray="3 4 5 2" stroke="magenta" fill="magenta" style={{display: this.state.magenta ? "block" : "none" }}/>
                                <Line type='monotone' dataKey='Headache' strokeDasharray="3 4 5 2" stroke="orange" fill="orange" style={{display: this.state.orange ? "block" : "none" }}/>
                                <Line type='monotone' dataKey='Drymouth' strokeDasharray="3 4 5 2" stroke="purple" fill="purple" style={{display: this.state.purple ? "block" : "none" }}/>
                                <Line type='monotone' dataKey='Average_' stroke="black" strokeWidth={5} style={{display: this.state.black ? "block" : "none" }}/>
                                <YAxis ticks={[2,4]} />
                                <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
                            {/* <Tooltip /> */}
                                <Legend align="right" verticalAlign="top" layout="vertical" wrapperStyle={{ padding: 10, fontWeight: 600, top: 40, right: 20, border: '1px solid grey', borderRadius: 3}} />
                            </LineChart>
                    </CardBody>
                </Card>
                


                
                <Card className="TableCard" style={{display: this.state.alertChart && this.props.chartOne? "block" : "none"}}>
                    <CardBody className="TableBody">
                        <CardTitle className="Title">Emergency alerts by date. </CardTitle>

                            <Button  className="symptomChart" color="info" size="sm" onClick = {() => this.onClickedSymptoms()}>Symptoms</Button>
                            <Button  className="symptomChart" color="info" size="sm" onClick = {() => this.onClickedSideEffects()}>Side effects</Button>
                            <Button  className="symptomChart" color="info" size="sm" style={{border: '3px solid black'}} onClick = {() => this.onClickedAlerts()}>Alerts</Button>

                            <div style={{display: this.props.barChartData ? "none" : "block"}}><p style={{fontWeight: "bold"}} className="text-left">Insufficient data on this patient to display.</p></div>

                            <BarChart width={700} height={350} data={this.props.barChartData} margin={{top: 10, right: 30, left: 0, bottom: 0}} >
                                <Bar dataKey='Falls' stackId="a" fill="green" />
                                <Bar dataKey='Freezing' stackId="a" fill="magenta" />
                                <Bar dataKey='Choking' stackId="a" fill="orange" />
                                <Bar dataKey='Hallucinations' stackId="a" fill="red" />
                                <YAxis ticks={[2,4,6,8]} />
                                <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
                            {/* <Tooltip /> */}
                            <Legend align="right" verticalAlign="top" layout="vertical" wrapperStyle={{ padding: 10, fontWeight: 600, top: 40, right: 20, border: '1px solid grey', borderRadius: 3}} />
                            </BarChart> 
                    </CardBody>
                </Card>



                <Card className="TableCard" style={{display: this.state.symptomChart && this.props.chartMany? "block" : "none"}}>
                    <CardBody className="TableBody">
                        <CardTitle className="Title">Trends in Parkinson's symptoms last five episodes. </CardTitle>

                            <Button  className="symptomChart" color="info" size="sm" style={{border: '3px solid black'}} onClick = {() => this.onClickedSymptoms()}>Symptoms</Button>
                            <Button  className="symptomChart" color="info" size="sm" onClick = {() => this.onClickedSideEffects()}>Side Effects</Button>
                            <Button  className="symptomChart" color="info" size="sm" onClick = {() => this.onClickedAlerts()}>Alerts</Button>

                            <span style={{fontWeight: "bold"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toggle: </span>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "green"}} onClick = {() => this.setState({green: this.state.green ? false : true})}>&nbsp;&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "magenta"}} onClick = {() => this.setState({magenta: this.state.magenta ? false : true})}>&nbsp;&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "orange"}} onClick = {() => this.setState({orange: this.state.orange ? false : true})}>&nbsp;&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "purple"}} onClick = {() => this.setState({purple: this.state.purple ? false : true})}>&nbsp;&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "red"}} onClick = {() => this.setState({red: this.state.red ? false : true})}>&nbsp;&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "cyan"}} onClick = {() => this.setState({cyan: this.state.cyan ? false : true})}>&nbsp;&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "grey"}} onClick = {() => this.setState({grey: this.state.grey ? false : true})}>&nbsp;&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "blue"}} onClick = {() => this.setState({blue: this.state.blue ? false : true})}>&nbsp;&nbsp;&nbsp;</Button>
                            <Button className="minusChartBtn" size="sm" onClick = {() => this.onClickedToggleAll(false)}><div style={{lineHeight: 0, fontWeight: "bold", fontSize: "1.2em"}}>-</div></Button>
                            <Button className="plusChartBtn" size="sm" onClick = {() => this.onClickedToggleAll(true)}><div style={{lineHeight: 0, fontWeight: "bold", fontSize: "1.2em"}}>+</div></Button>

                            <div style={{display: this.props.lineChartData ? "none" : "block"}}><p style={{fontWeight: "bold"}} className="text-left">Insufficient data on this patient to display.</p></div>

                            <BarChart width={1000} height={350} data={this.props.lineChartData} margin={{top: 10, right: 30, left: 0, bottom: 0}} >
                                <Bar dataKey='Kickin' fill="green" style={{display: this.state.green ? "block" : "none" }}/>
                                <Bar dataKey='Wearoff' fill="magenta" style={{display: this.state.magenta ? "block" : "none" }}/>
                                <Bar dataKey='Movement' fill="orange" style={{display: this.state.orange ? "block" : "none" }}/>
                                <Bar dataKey='Tiredness' fill="purple" style={{display: this.state.purple ? "block" : "none" }}/>
                                <Bar dataKey='Offtime' fill="red" style={{display: this.state.red? "block" : "none" }}/>
                                <Bar dataKey='Tremor' fill="cyan" style={{display: this.state.cyan ? "block" : "none" }}/>
                                <Bar dataKey='Walking' fill="grey" style={{display: this.state.grey ? "block" : "none" }}/>
                                <Bar dataKey='Balance' fill="blue" style={{display: this.state.blue ? "block" : "none" }}/>
                                <YAxis ticks={[2,4,6,8]} />
                                <XAxis dataKey="name" padding={{left: 10, right: 10}}/>
                            {/* <Tooltip /> */}
                            <Legend align="right" verticalAlign="top" layout="vertical" wrapperStyle={{ padding: 10, fontWeight: 600, top: 40, right: 20, border: '1px solid grey', borderRadius: 3}} />
                            </BarChart> 
                    </CardBody>
                </Card>



                <Card className="TableCard" style={{display: this.state.sideEffectChart && this.props.chartMany? "block" : "none"}}>
                    <CardBody className="TableBody">
                        <CardTitle className="Title">Trends in side effects last 5 episodes </CardTitle>

                            <Button  className="symptomChart" color="info" size="sm" onClick = {() => this.onClickedSymptoms()}>Symptoms</Button>
                            <Button  className="symptomChart" color="info" size="sm" style={{border: '3px solid black'}} onClick = {() => this.onClickedSideEffects()}>Side Effects</Button>
                            <Button  className="symptomChart" color="info" size="sm" onClick = {() => this.onClickedAlerts()}>Alerts</Button>

                            <span style={{fontWeight: "bold"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toggle: </span>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "green"}} onClick = {() => this.setState({green: this.state.green ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "magenta"}} onClick = {() => this.setState({magenta: this.state.magenta ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "orange"}} onClick = {() => this.setState({orange: this.state.orange ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "purple"}} onClick = {() => this.setState({purple: this.state.purple ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="minusChartBtn" size="sm" onClick = {() => this.onClickedToggleAll(false)}><div style={{lineHeight: 0, fontWeight: "bold", fontSize: "1.2em"}}>-</div></Button>
                            <Button className="plusChartBtn" size="sm" onClick = {() => this.onClickedToggleAll(true)}><div style={{lineHeight: 0, fontWeight: "bold", fontSize: "1.2em"}}>+</div></Button>

                            <div style={{display: this.props.lineChartData ? "none" : "block"}}><p style={{fontWeight: "bold"}} className="text-left">Insufficient data on this patient to display.</p></div>

                            <BarChart width={1000} height={350} data={this.props.lineChartData} margin={{top: 10, right: 30, left: 0, bottom: 0}} >
                                <Bar dataKey='Sickness' fill="green" style={{display: this.state.green ? "block" : "none" }}/>
                                <Bar dataKey='Dizziness' fill="magenta" style={{display: this.state.magenta ? "block" : "none" }}/>
                                <Bar dataKey='Headache' fill="orange" style={{display: this.state.orange ? "block" : "none" }}/>
                                <Bar dataKey='Drymouth' fill="purple" style={{display: this.state.purple ? "block" : "none" }}/>
                                <YAxis ticks={[2,4,6,8]} />
                                <XAxis dataKey="name" padding={{left: 10, right: 10}}/>
                            {/* <Tooltip /> */}
                            <Legend align="right" verticalAlign="top" layout="vertical" wrapperStyle={{ padding: 10, fontWeight: 600, top: 40, right: 20, border: '1px solid grey', borderRadius: 3}} />
                            </BarChart> 
                    </CardBody>
                </Card>



                 <Card className="TableCard" style={{display: this.state.alertChart &&  this.props.chartMany? "block" : "none"}}>
                    <CardBody className="TableBody">
                        <CardTitle className="Title">Emergency alerts by date. </CardTitle>

                            <Button size="sm" className="symptomChart" color="info" onClick = {() => this.onClickedSymptoms()}>Symptoms</Button>
                            <Button size="sm" className="symptomChart" color="info" onClick = {() => this.onClickedSideEffects()}>Side effects</Button>
                            <Button size="sm" className="symptomChart" color="info" style={{border: '3px solid black'}} onClick = {() => this.onClickedAlerts()}>Alerts</Button>

                            <span style={{fontWeight: "bold"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toggle: </span>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "green"}} onClick = {() => this.setState({green: this.state.green ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "magenta"}} onClick = {() => this.setState({magenta: this.state.magenta ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "orange"}} onClick = {() => this.setState({orange: this.state.orange ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="chartBtn" size="sm" style={{backgroundColor: "purple"}} onClick = {() => this.setState({purple: this.state.purple ? false : true})}>&nbsp;&nbsp;</Button>
                            <Button className="minusChartBtn" size="sm" onClick = {() => this.onClickedToggleAll(false)}><div style={{lineHeight: 0, fontWeight: "bold", fontSize: "1.2em"}}>-</div></Button>
                            <Button className="plusChartBtn" size="sm" onClick = {() => this.onClickedToggleAll(true)}><div style={{lineHeight: 0, fontWeight: "bold", fontSize: "1.2em"}}>+</div></Button>

                            <div style={{display: this.props.barChartData ? "none" : "block"}}><p style={{fontWeight: "bold"}} className="text-left">Insufficient data on this patient to display.</p></div>
                            
                            <BarChart width={1000} height={350} data={this.props.barChartData} margin={{top: 10, right: 30, left: 0, bottom: 0}} >
                                <Bar dataKey='Falls' stackId="a" fill="green" style={{display: this.state.green ? "block" : "none" }}/>
                                <Bar dataKey='Freezing' stackId="a" fill="magenta" style={{display: this.state.magenta ? "block" : "none" }}/>
                                <Bar dataKey='Choking' stackId="a" fill="orange" style={{display: this.state.orange ? "block" : "none" }}/>
                                <Bar dataKey='Hallucination' stackId="a" fill="purple" style={{display: this.state.purple ? "block" : "none" }}/>
                                <YAxis ticks={[2,4,6,8,10]} />
                                <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
                            {/* <Tooltip /> */}
                            <Legend align="right" verticalAlign="top" layout="vertical" wrapperStyle={{ padding: 10, fontWeight: 600, top: 40, right: 20, border: '1px solid grey', borderRadius: 3}} />
                            </BarChart> 
                    </CardBody>
                </Card>

            </div>

        
        )
    }           
}