import React from 'react';

import {
    Container, 
    Label, 
    ListGroup, 
    CardTitle, 
    CardBody, 
    Card, 
    CardTable
} from 'reactstrap';
import moment from "moment";

import '../../../../pages/Admin';


export default class Medication extends React.Component {

    render () {
        return (
            
            this.props.chartToShow === "single episode chart" ? 
            
            <Card className='TableCard'>
                <CardBody className='TableBody'>
                    <CardTitle className='actionTableTitle Title'>

                        {this.props.episodeCount < 2 ?

                        <Container>
                            Current medications
                        </Container>

                        : null }

                        {this.props.episodeCount == 2 ?

                        <Container>
                            Previous Medications
                            <br />
                            <span style={{fontSize: 14}}> {moment(this.props.episodeDates[0]).format("MMMM Do YYYY")} - {moment(this.props.episodeDates[1]).format("MMMM Do YYYY")} </span>
                        
                        </Container>

                        : null }

                        {this.props.episodeCount > 2 ?

                        <Container>
                            Past medications 
                            <br />
                            <span style={{fontSize: 14}}> {moment(this.props.episodeDates[0]).format("MMMM Do YYYY")} - {moment(this.props.episodeDates[1]).format("MMMM Do YYYY")} </span>
                            
                        </Container>

                        : null }

                    </CardTitle>

                    <ListGroup>

                        {this.props.medications.map( (med) => {
                            return (

                                <p> <span style={{fontWeight: "bold"}}> {med.medication.slice(0, med.medication.indexOf("("))} </span>
                                    &nbsp;
                                    {med.dose} &nbsp;
                                    {med.route} &nbsp;
                                    {med.form}.<br />

                                    Times : &nbsp;
                                        {
                                        med.times?
                                            med.times.map( (time) => {
                                                return (
                                                <Label>{time} &nbsp;</Label>
                                                )
                                            })
                                        : 
                                        null
                                        }
                                </p>
                            )
                        })} 
        
                    </ListGroup>

                </CardBody>
            </Card>

            : 

            <Card className='TableCard'>
                <CardBody className='TableBody'>

                    <ListGroup>
                        {this.props.medications.map( (med) => {
                            return (

                                <div style={{fontSize: "0.9Em", marginBottom: 8, backgroundColor: med.medication.includes("#new") ? "rgb(92, 178, 92, 0.2)"  : (med.medication.includes("#change") ? "rgb(252,203,0,0.2)" : (med.medication.includes("#deleted") ? "rgb(178,92,92,0.2)" : "transparent")) }}>

                                    <span style={{fontWeight: "bold"}}>{med.medication.slice(0, med.medication.indexOf("("))}</span>
                                    &nbsp; 
                                    <span style={{textDecoration: med.dose.includes("#new") || med.dose.includes("#change") || med.dose.includes("#deleted") ? "underline" : "none"}}>
                                        {med.dose.includes("#") ? <span>{med.dose.slice(0, med.dose.indexOf("#"))}</span> : med.dose }
                                    </span>
                                    &nbsp;
                                        <span style={{textDecoration: med.route.includes("#new") || med.route.includes("#change") || med.route.includes("#deleted") ? "underline" : "none"}}>
                                            {med.route.includes("#") ? <span>{med.route.slice(0, med.route.indexOf("#"))}</span> : med.route }
                                    </span>
                                    &nbsp;
                                    <span style={{textDecoration: med.form.includes("#new") || med.form.includes("#change") || med.form.includes("#deleted") ? "underline" : "none"}}>
                                            {med.form.includes("#change") ? <span>{med.form.slice(0, med.form.indexOf("#"))}</span> : med.form }
                                    </span>
                                    &nbsp;
                                    <br />

                                    <span style={{paddingLeft: 10}}>
                                        Times: &nbsp;
                                        {
                                            med.times ?
                                                med.times.map( (time) => {
                                                    return (
                                                        <span>
                                                            <span style={{textDecoration: time.includes("#new") || time.includes("#change") || time.includes("#deleted") ? "underline" : "none"}}>
                                                                {time.includes("#") ? <span>{time.slice(0, time.indexOf("#"))}</span> : <span>{time}</span>}

                                                            </span>
                                                            &nbsp;
                                                        </span>
                                                    )
                                                })
                                            : 
                                            null

                                        }
                                    </span> 
                                </div>
                            )
                        })}
        
                    </ListGroup>

                </CardBody>
            </Card>


        )
    }
}           