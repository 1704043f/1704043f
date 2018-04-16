import React from 'react';
import {
    Card, CardBody, CardTitle,
} from 'reactstrap';
import './dataMenuCard.css';

import '../../../pages/Admin';


export default class DataMenuCard extends React.Component {

    render () {
        return (

            <Card className="dateMiningTableCard TableCard" style={{display: this.props.dataMenuCard ? "block" : "none"}}>
                <CardBody className="dateMiningTableBody TableBody">
                    <CardTitle className="dateMiningTitle Title">Data Mining</CardTitle>

                    
                        <div className="drugMiningDrug">Drug data</div>
                        <div className="drugMiningDisease">Disease data</div>

                </CardBody>
            </Card>

        )    
    }
}       