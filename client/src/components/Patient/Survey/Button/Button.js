import React from 'react';
import "./Button.css";

import { 
    Button
} from 'reactstrap';
//radio = onClickHandle(this.props.data_value) and checkbox =  onClickHandle(this.props.answer)
export default class QButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            active : this.props.active
        }
    }
    render() {   
        return(
            // <Container className="survBtn">
                <Button
                    key={this.props.key}
                    id={this.props.survHeader}
                    className={`${this.props.className[this.props.index]} survChkBtn`}
                    color={this.props.color[this.props.index]}
                    onClick={() => this.props.onClickHandle(this.props.selectionType === "checkbox" ? this.props.answer : this.props.data_value)}
                    value={this.props.data_value}
                    active = {this.props.selectionType ==="radio" ? this.props.active === this.props.data_value : this.props.active.includes(this.props.answer) }
                    data_value = {this.props.data_value}
                >
                    <h4 className="btnAnswer">{this.props.answer}</h4>
                </Button>

            // </Container>
        )
    }
}