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

                {this.props.chartToShow === "single episode chart" ?

                    <Container>

                        {this.props.episodeCount < 2 ?
                    
                                <Container className="text-right">
                                    <p className="episodeInfo">
                                       Current episode: {moment(this.props.episodeDates[0]).format("MMMM Do YYYY")} {moment(this.props.episodeDates[0]).format("hh.mm a")} to present
                                        <br />
                                        Total Records analysed : {this.props.episodeNumRecords}
                                    </p>
                                    <hr />
                                </Container>

                            : null }

                            {this.props.episodeCount > 1 && this.props.episodeCount < this.props.episodeMax ?

                                <Container className="text-right">
                                    <p className="episodeInfo">
                                        Episodes: {moment(this.props.episodeDates[0]).format("MMMM Do YYYY")} - {moment(this.props.episodeDates[1]).format("MMMM Do YYYY")}
                                        <br />
                                        Total Records analysed : {this.props.episodeNumRecords}
                                    </p>
                                    <hr />
                                </Container>

                            : null }

                            {this.props.episodeCount === this.props.episodeMax ?

                                <Container className="text-right">
                                    <p className="episodeInfo">
                                        Episode: {moment(this.props.episodeDates[0]).format("MMMM Do YYYY")} - first episode {moment(this.props.episodeDates[1]).format("MMMM Do YYYY")}
                                        <br />
                                        Total Records analysed : {this.props.episodeNumRecords} 
                                    </p>
                                    <hr />
                                </Container>

                            : null }


                    </Container>

                : null }

                {this.props.chartToShow === "multiple episodes chart" ?

                    <Container>

                        {this.props.episodeCount < 2 ?

                                <Container className="text-right">
                                    <p className="episodeInfo">
                                    Date range: {moment(this.props.episodeDates[0]).format("L")} to present (current episode)
                                        <br />
                                        Total Records analysed : {this.props.episodeNumRecords}
                                    </p>
                                    <hr />
                                </Container>

                            : null }

                            {this.props.episodeCount > 1 && this.props.episodeCount < this.props.episodeMax ?

                                <Container className="text-right">
                                    <p className="episodeInfo">
                                        Date range: {moment(this.props.episodeDates[0]).format("L")} to {moment(this.props.episodeDates[1]).format("L")}
                                        <br />
                                        Total Records analysed : {this.props.episodeNumRecords}
                                    </p>
                                    <hr />
                                </Container>

                            : null }

                             {this.props.episodeCount === this.props.episodeMax ?

                                <Container className="text-right">
                                    <p className="episodeInfo">
                             Date range: {moment(this.props.episodeDates[0]).format("L")} (first record) to {moment(this.props.episodeDates[1]).format("L")} 
                                        <br />
                                        Total Records analysed : {this.props.episodeNumRecords}
                                    </p>
                                    <hr />
                                </Container>

                            : null }

                    </Container>

                : null }

                {this.props.chartToShow === "dual episodes chart" ?

                    <Container>

                        {this.props.episodeCount < 2 ?

                                <Container className="text-right">
                                    <p className="episodeInfo">
                                    {moment(this.props.episodeDates[1][0]).format("L")} - {moment(this.props.episodeDates[1][1]).format("L")} and {moment(this.props.episodeDates[0][0]).format("L")} - {moment(this.props.episodeDates[0][1]).format("l")}
                                        <br />
                                        Total Records analysed : {this.props.episodeNumRecords}
                                    </p>
                                    <hr />
                                </Container>

                            : null }

                            {this.props.episodeCount > 1 && this.props.episodeCount < this.props.episodeMax ?

                                <Container className="text-right">
                                    <p className="episodeInfo">
                                        {moment(this.props.episodeDates[1][0]).format("L")} - {moment(this.props.episodeDates[1][1]).format("l")} and {moment(this.props.episodeDates[0][0]).format("L")} - {moment(this.props.episodeDates[0][1]).format("L")}
                                        <br />
                                        Total Records analysed : {this.props.episodeNumRecords}
                                    </p>
                                    <hr />
                                </Container>

                            : null }

                            {this.props.episodeCount === this.props.episodeMax ?

                                <Container className="text-right">
                                    <p className="episodeInfo">
                                        {moment(this.props.episodeDates[0][0]).format("L")} - {moment(this.props.episodeDates[0][1]).format("L")} (first episode)
                                        <br />
                                        Total Records analysed : {this.props.episodeNumRecords}
                                    </p>
                                    <hr />
                                </Container>

                            : null }

                        </Container>

                    : null }

            </Container>

        )
    }
}          

