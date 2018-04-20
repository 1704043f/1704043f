import React from 'react';

import {
    Container, 
} from 'reactstrap';

let tooltipMeds = [];

export default class customTooltip extends React.Component {
    state = {
        
    }

    render() {
        return ( 
            <div style={{borderStyle: "solid", borderWidth: 1, borderColor:  "grey", padding: 5}}>
            <span style={{fontWeight: "bold", fontSize: 12}}>Time: </span>
                {this.props.data ? 
                    this.props.data.map(meds => {
                        return (
                            this.props.label == meds[0] ?
                                
                                meds.map(med => {
                                    return (
                                        <span style={{fontWeight: "bold", fontSize: 12, lineHeight: 0.8}} >
                                            {med}
                                            <br />
                                        </span>
                                    )
                                })
                            :
                                null
                            )   
                        })
                    :
                        null
                }
            </div>
        )
    }
}           