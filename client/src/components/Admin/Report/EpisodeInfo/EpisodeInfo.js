import React from 'react';

import moment from "moment";

import {
    Container
} from 'reactstrap';

import './EpisodeInfo.css';


export default class EpisodeInfo extends React.Component {

    render () {

        return (

            this.props.episodeDate.indexOf("to") < 0 ?

                <Container className="text-right">
                
                
                    <p className="episodeInfo">
                        Episode Start : {moment(this.props.episodeDate).format("MMMM Do YYYY")} {moment(this.props.episodeDate).format("hh.mm a")}.
                        <br />
                        Episode Data: {this.props.episodeCount} records total over {this.props.episodeDays} days.
                    </p>
                    <hr />
                </Container>

                :

                <Container className="text-right">

                    <p className="periodInfo">
                        Period : {this.props.episodeDate}
                        <br />
                        Period Data: {this.props.episodeCount} records total.
                    </p>
                </Container>




        )
    }
}           