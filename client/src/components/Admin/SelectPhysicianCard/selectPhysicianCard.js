import React from 'react';

import {
    Card, 
    CardBody, 
    CardTitle, 
    Table,
} from 'reactstrap';

import '../../../pages/Admin';



export default class SelectPhysicianCard extends React.Component {

    onClicked(id) {
        this.props.confirmPhysician(id);
    }
    

    render () {
        return (

            <Card className="TableCard" style={{display: this.props.selectPhysicianCard ? "block" : "none"}}>
                <CardBody>

                    <CardTitle className="TableTitle">Select Physician</CardTitle>

                    <br />
                        {this.props.physiciansLength ? (

                            <Table className="TableText">
                                <tbody>
                                    {this.props.physicians.map(item => (
                                            <tr key={item._id} className="TableHover" onClick={() => this.onClicked(item._id)}>
                                                    <td style={{width: 50}}>{item.id_number}</td>
                                                    <td style={{width: 150}}>{item.name.first}&nbsp;{item.name.last}</td> 
                                                    <td style={{width: 400}}>{item.office}</td> 
                                            </tr>
                                    ))} 
                                </tbody>
                            </Table>

                        ) : (
                        <h3>No Results to Display</h3>
                        )}
                      
                </CardBody>
            </Card> 

        )
    }
}