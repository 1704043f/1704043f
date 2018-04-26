import React from 'react';

import {
    Container, 
} from 'reactstrap';


export default class customTooltip extends React.Component {
    state = {
        
    }

    render() {
        return ( 
            <div style={{borderStyle: "solid", borderWidth: 1, borderColor:  "grey", padding: 5}}>
                {this.props.data ? 
                    this.props.data.map(meds => {
                        return (
                            this.props.label == meds[0] ?
                                
                                meds.map((med, index) => {
                                    return (
                                        <span style={{fontWeight: "bold", fontSize: 12, lineHeight: 0.8}} >
                                            {index ? `${med}` : `${this.props.header} ${med}`}
                                            {index ? null : <hr style={{margin: 0,padding: 0}} />}
                                            {index ? <br /> : null }
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