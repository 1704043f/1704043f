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
           <Card className="successNewEpisTableCard TableCard" style={{display: this.props.successEpisodeCreatedCard ? "block" : "none", width: "100%"}}>
                <CardBody className="successNewEpisTableBody TableBody">
                    <CardTitle className="successNewEpisTitle Title">Confirm New Episode</CardTitle>
                
                    <CardText>
                        A new episode has been successfully created for this patient
                        <br /><br />
                        <Container>
                            The patient has been emailed with medication and appointment details.
                            <br /><br />
                            Please remind patient to log on to the application to setup their medication and appointment reminder to their calendar. 
                        </Container>
                    </CardText>

                    <br /><br />
                    <a href={"/admin"}>
                    <Button className="successNewEpisFinishBtn FinishBtn">Finish</Button></a>
                    
                </CardBody>
            </Card>
        )
    }
}