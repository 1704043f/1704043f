import React from 'react';

import '../../../../pages/Admin';

import { 
    Button, 
    Container, 
    Card, 
    CardBody, 
    CardTitle, 
    CardText,
} from 'reactstrap';

export default class SuccessEpisode extends React.Component {
    render () {
        return (
           <Card className="TableCard" style={{display: this.props.successEpisodeCreatedCard ? "block" : "none", width: "100%"}}>
                <CardBody>

                    <CardTitle className="TableTitle">Confirm New Episode</CardTitle>
                
                    <CardText>
                        A new episode has been successfully created for this patient
                        <br />
                        <br />
                            The patient has been emailed with medication and appointment details.
                            <br /><br />
                            Please remind patient to log on to the application to setup their medication and appointment reminder to their calendar. 
                    </CardText>
                    <br />
                    <br />

                    <a href={"/admin"}><Button className="admin-btn right-align">Finish</Button></a>
                    
                </CardBody>
            </Card>
        )
    }
}