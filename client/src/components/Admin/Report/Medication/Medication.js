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

            this.props.showMeds ? 

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
                                                    <Label>{time}, &nbsp;</Label>
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

            null
        )
    }
}           