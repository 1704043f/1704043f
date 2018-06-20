import React from 'react';
import {
    Card, CardBody, CardTitle,
} from 'reactstrap';

import '../../../pages/Admin';


export default class DataMenuCard extends React.Component {

    render () {
        return (

            <Card className="TableCard" style={{display: this.props.dataMenuCard ? "block" : "none"}}>
                <CardBody>
                    <CardTitle className="TableTitle">Data</CardTitle>

                        <div>Dashboard</div>

                        <hr />
                        <div className="MenuHover">Drug data</div>
                        <div className="MenuHover">Disease data</div>

                </CardBody>
            </Card>

        )    
    }
}       