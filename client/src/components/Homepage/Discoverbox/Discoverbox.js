import React from "react";
import { Container, Button,} from 'reactstrap';


class Discoverbox extends React.Component {

    state = {
        boxImage: [],
        boxText: [],
        subBoxNum: 0,
        hideBttn: false
    }

    componentDidMount() {
        this.setState({boxImage: this.props.imgArray[0] });
        this.setState({boxText: this.props.textArray[0] })
    }

    swapBox(image, text, index) {
        this.setState({boxImage: image})
        this.setState({boxText: text})
        this.setState({subBoxNum: index})
    }

    nextBox(number) {
        this.setState({hideBttn: true})
        this.props.displayBox(number)
        

    }



    render(){


        return(

            <div className="discover-box" style={{display: this.props.display ? "block" : "none"}}>

                <div className="tab-top text-center" style={{display: this.props.nextBox==2 ? "none" : "inline"}}></div>  
                <img src={this.state.boxImage} className="discover-box-img"/>

                <div className="discover-box-text">
                    <h4>{this.props.title}</h4>
                    <p>{this.state.boxText}</p> 
                    
                    <div className="discover-box-bttns">
                        {this.props.imgArray.map( (img, index) => 
                            <div className={index == this.state.subBoxNum ? "discover-box-bttn discover-box-bttn-active" : "discover-box-bttn discover-box-bttn-inactive"} onClick={() => this.swapBox(img, this.props.textArray[index], index)}>
                                <img src={img} width="40px" height="40px" />
                                <span className=" discover-box-bttn-number text-center">{index+1}</span>
                            </div> 
                        )}
                    </div>

                </div>

                <div className="tab-bottom">
                        <Button style={{display: this.state.hideBttn ? "none" : "inline"}} className="bttn text-center" onClick={() => this.nextBox(this.props.nextBox)}>next</Button>
                </div>

                <div style={{display: this.state.hideBttn ? "inline" : "none"}} className="tab-bottom-after"></div>
            </div>
        )
    }
}


export default Discoverbox;
