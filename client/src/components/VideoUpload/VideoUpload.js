import React, {Component} from "react";
import "./VideoUpload.css";
import videoAPI from '../../utils/videoAPI';
import moment from 'moment';
import Alert from 'react-s-alert';
import {
    Container,
    Card,
    Button,
    CardHeader,
    CardText,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';



class DoSomethingBtn extends Component {
    state = {
    video_link: "",
    patient_id: localStorage.getItem("userId"),
    video_datetime : moment().format()
}

    // Dynamic form input handler
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });

    };
    validateSubmit = (video_link) =>{
        let valid = true;
        if(!video_link){
            valid = false
            Alert.error('Video link cannot be empty.', {
                    position : 'top',
                    effect: 'stackslide',
                });
        }else{
            Alert.success('Your video has been recorded.', {
                    position : 'top',
                    effect: 'stackslide',
                });
        }
        return valid;
    }
    handleSubmit = (event) => {
        if(this.validateSubmit(this.state.video_link)){
            let objVideo = {
                video_link: this.state.video_link,
                patient_id : this.state.patient_id,
                video_datetime : this.state.video_datetime
            }
            videoAPI.create(objVideo)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
        
    }
    render() {
        return (
            <Container fluid className="uploadVideoInfo">

                <Card className="uploadVideoInfoCard featureCard" body fluid inverse >
                    <CardHeader tag="h4" className="uploadVideoInfoHeader">UPLOAD EPISODE VIDEO</CardHeader>
                    <Card className="uploadVideoInfoBody">
                        <CardText><h4 className="shareVideo">Share Your Episode Video With Your Doctor</h4></CardText>
                        <Container>
                            <FormGroup row className="uploadVideo">
                                <Label className="uploadLinkMess" size="lg">Upload Your Video Link Here</Label>
                                <Input type="text" id="episodeVideo" onChange={this.handleInputChange} name="video_link" placeholder="video link" bsSize="lg" />
                            </FormGroup>
                        </Container>
                        <Button  color='secondary' className="submitVideo" size="lg" onClick={(e) => this.handleSubmit(e)}><h4>Submit Video</h4></Button>
                    </Card>
                </Card>

            </Container>

        );
    }
    
};

export default DoSomethingBtn;