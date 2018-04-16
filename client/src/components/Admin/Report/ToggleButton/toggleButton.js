import React, { Component } from 'react';

import {
    Button, 
} from 'reactstrap';

import './toggleButton.css';

export default class ToggleButton extends React.Component {

        render () {
    
            return (
    
                    <Button size="sm"
                        style={{padding: 6, margin: 3, backgroundColor: this.props.color, height: 18}}
                        onClick = {() => this.setState({button: this.props.button ? false : true})} 
                        >
                            &nbsp;&nbsp;
                     </Button>
                    

            )
        }
    }           