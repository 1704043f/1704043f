import React from 'react';

import moment from "moment";

import {
    Container
} from 'reactstrap';

import './EpisodeInfo.css';


export default class EpisodeInfo extends React.Component {

    render () {

        return (

            <Container>

                 {this.props.episodeCount < 2 ?
        
                    <Container className="text-right">
                        <p className="episodeInfo">
                            Current episode: {moment(this.props.episodeDates[0]).format("MMMM Do YYYY")} {moment(this.props.episodeDates[0]).format("hh.mm a")} to present.
                            <br />
                            Total Records analysed : {this.props.episodeNumRecords}
                        </p>
                        <hr />
                    </Container>

                : null }

            
                {this.props.episodeCount >= 2 ?

                    <Container className="text-right">
                        <p className="episodeInfo">
                            Current episode: {moment(this.props.episodeDates[0]).format("MMMM Do YYYY")} - {moment(this.props.episodeDates[1]).format("MMMM Do YYYY")}
                            <br />
                            Total Records analysed : {this.props.episodeNumRecords}
                        </p>
                        <hr />
                    </Container>

                : null }

           </Container>

        )
    }
}          

