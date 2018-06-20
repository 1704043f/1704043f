import React from 'react';

import {
    Card, 
    CardBody, 
    CardTitle, 
    CardText,
    Button
} from 'reactstrap';

import '../../../pages/Admin';



export default class SuccessPhysicianCard extends React.Component {

    render () {
        return (

            <Card className="TableCard" style={{display: this.props.successPhysicianCard ? "block" : "none"}}>
                <CardBody>

                    <CardTitle className="TableTitle">Enroll A New Physician</CardTitle>

                        <CardText>
                            <br />
                            Dr. {this.props.physician_name} has been successfully enrolled and registered.
                            <br /><br />
                            An email has been sent to {this.props.physician_email} with their username and password so that they can log-in and use the application.
                            <br />              
                        </CardText>

                    <a href="/admin"><Button className="admin-btn right-align">Finish</Button></a>

                </CardBody>
        </Card>
        
        )
    }
}