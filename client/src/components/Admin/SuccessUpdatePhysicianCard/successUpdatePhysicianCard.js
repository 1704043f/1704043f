import React from 'react';

import {
    Card, 
    CardBody, 
    CardTitle, 
    CardText,
    Button,
} from 'reactstrap';

import '../../../pages/Admin';



export default class SuccessUpdatePhysicianCard extends React.Component {

    render () {
        return (

            <Card className="TableCard" style={{display: this.props.successUpdatePhysicianCard ? "block" : "none"}}>
                <CardBody>

                    <CardTitle className="TableTitle">Update Physician Details</CardTitle>

                    <CardText>
                        <br />
                        Dr. {this.props.physician_name}'s details have been successfully updated.
                        <br /><br /> <br />      
                    </CardText>

                    <a href="/admin"><Button color='success' className="admin-btn right-align">Finish</Button></a>
                    
                </CardBody>
            </Card>
        
        )
    }
}