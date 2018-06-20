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

            <div>

                    <p className="videoTxt">
                        Patient video posted : {this.props.videoDateTime}&nbsp;&nbsp;
                        <a href={this.props.videoLink} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="videoBtn" color="primary" style={{display: this.props.videoLink ? "inline" : "none"}}>View Video</Button>
                        </a>

                    </p>
                        

            </div>

        )
    }
}           