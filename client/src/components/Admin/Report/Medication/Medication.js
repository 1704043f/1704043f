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

import '../../../../pages/Admin';


export default class Medication extends React.Component {

        render () {
        return (

            this.props.showMeds ? 

            <Card className='TableCard'>
                <CardBody className='TableBody'>
                    <CardTitle className='actionTableTitle Title'>
                            {this.props.title}
                    </CardTitle>
            

                    <ListGroup>

                        {this.props.medications.map( (med) => {
                            return (

                                <p> <span style={{fontWeight: "bold"}}> {med.medication.slice(0,    med.medication.indexOf("("))} </span>
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