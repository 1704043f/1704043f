import React from 'react';
import { 
    Container,
    Card, CardBody, CardTitle,
    Table,
} from 'reactstrap';
import moment from "moment";

import alertAPI from '../../../utils/alertAPI';

import '../../../pages/Admin';




export default class confirmPatientCard extends React.Component {

    onClicked(id) {
        this.props.confirmPatient(id);
    }
    state =({
        alerts: [],
        alerts: []
    })


    componentDidMount(){
        alertAPI.findAll()
        .then((res) =>{
            this.setState({
                alerts: this.filterAlerts(res.data),
            })
            console.log("alerts " + JSON.stringify(res.data))
        })
        .catch((err) => console.log(err))
    }


    filterAlerts = (alerts) => {

        let obj = {};
        let alertsForDisplay = [];

        const alertsFiltered = alerts.filter(alert => ( moment(alert.alert_datetime).isAfter(moment().add(-7, 'day')) ) )

        alertsFiltered.map( (alert) => {
            const types = Object.values(alert.alert_type[0])
            types.map( (type) => {
                if (type) {

                    obj = {
                        name: `${alert.alert_firstname} ${alert.alert_lastname}`,
                        hospnum: alert.alert_hospnum,
                        type:  type,
                        date: moment(alert.alert_datetime).format('L'),
                        time: moment(alert.alert_datetime).format("h:mm a"),
                        physician: alert.alert_physician ? `Dr. ${alert.alert_physician}` : null,
                        alert_patient_id : alert.alert_patient_id
                    }

                    alertsForDisplay.push(obj)
                }
            })
        })

        return alertsForDisplay
    }


    render () {
        return (

            <Card className="TableCard" style={{display: this.props.notificationCard ? "block" : "none"}}>
                <CardBody classname="TableBody">
                    <CardTitle className="TableTitle">Patient dashboard</CardTitle>
                    
                    <p>You currently have {this.props.numPatients} patients using this application.</p>
                    <br />

                    <div>
                        <p className="TableSubTitle">New patients enrolled past 7 days.</p>
                        {this.props.patientsWeekListLength ? (

                            <Table size="sm" className="TableText">
                                <thead>
                                    <tr>
                                        <th>Name</th><th>Hosp number</th><th>Enrolled</th><th>Primary physician</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.patientsWeekList.map(item => (

                                        <tr key={item._id} className="TableHover" onClick={() => this.onClicked(item._id)}>
                                            <td>{item.details.first_name} {item.details.last_name}</td>  
                                            <td>{item.details.patient_number}</td>
                                            <td>{moment(item.date_created).format("MMMM Do YYYY")} ({moment(item.date_created).format("h:mm a")}) </td> 
                                            {item.physician ?
                                            <td>{`Dr. ${item.physician.name.first} ${item.physician.name.last}`}</td>
                                            :
                                            null
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                        </Table >

                        ) : (
                            <p>No patients enrolled past 7 days</p>
                            )}
                    </div>

                    <br />

                    <p className="TableSubTitle">Appointments this week.</p> 
                    {this.props.apptsList.length ? (

                        <Table size="sm" className="TableText">
                            <thead>
                                <tr>
                                    <th>Name</th><th>Hosp number</th><th>Appointment</th><th>Primary physician</th>
                                </tr>
                            </thead>
                            <tbody>

                                    {this.props.apptsList.map(item => (

                                    <tr key={item._id} className="TableHover" onClick={() => this.onClicked(item._id)}>
                                        <td>{item.details.first_name} {item.details.last_name}</td>  
                                        <td>{item.details.patient_number}</td>
                                        <td>{moment(item.appointment.next_appt).format("dddd, MMMM Do YYYY")} at  {moment(item.appointment.next_appt).format("h:mm a")}</td> 
                                        {item.physician ?
                                            <td>{`Dr. ${item.physician.name.first} ${item.physician.name.last}`}</td>
                                            : 
                                            <td>none recorded</td>
                                            
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    ) : (
                        <p>No appointments this week</p>
                    )}

                    <br />

                    <p className="TableSubTitle">Emergency alerts past 7 days.</p>

                    {this.state.alerts.length ? (

                            <Table size="sm">
                                <thead>
                                    <tr>
                                        <th>Name</th><th>Hosp number</th><th>Alert type</th><th>Date</th><th>Time</th><th>Primary physician</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.alerts.map( (alert) => { 
                                        console.log(alert);
                                        return (

                                        <tr key={alert._id} className='TableHover' onClick={() => this.onClicked(alert.alert_patient_id)}>        
                                            <td>{alert.name}</td>
                                            <td>{alert.hospnum}</td>
                                            <td>{alert.type}</td>
                                            <td>{alert.date}</td>
                                            <td>{alert.time}</td>
                                            <td>{alert.physician ? `${alert.physician}` : null}</td>
                                        </tr>       

                                        )

                                    })}   

                                </tbody>
                            </Table>

                         ) : (
                            <p>No emergency alerts this week</p>
                        )}

                </CardBody>
            </Card>
        )
    }
}       