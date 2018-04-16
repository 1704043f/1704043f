import React from 'react';

import {
    Container, 
    Button,
    Label
} from 'reactstrap';

import './Video.css';


export default class Video extends React.Component {

    render() {
        return (

            <Container>
                <Label className="patVidPost">
                    Patient video posted : {this.props.videoDateTime}&nbsp;&nbsp;
                    <a href={this.props.videoLink} target="_blank" rel="noopener noreferrer" >
                        <Button className="videoBtn" color="primary" size="sm" style={{display: this.props.videoLink ? "inline" : "none"}}>View Video</Button>
                    </a>
                        
                </Label>
            </Container>

        )
    }
}           