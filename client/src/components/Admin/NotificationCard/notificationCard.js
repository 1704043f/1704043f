import React from 'react';
import { 
    Container,
    Card, CardBody, CardTitle,
    Table,
} from 'reactstrap';
import moment from "moment";
import './notificationCard.css';

import '../../../pages/Admin';
import alertAPI from '../../../utils/alertAPI';



export default class confirmPatientCard extends React.Component {

    onClicked(id) {
        this.props.confirmPatient(id);
    }
    state =({
        emergencies : []
    })

    componentDidMount(){
        alertAPI.findAll()
        .then((res) =>{
            this.setState({
                emergencies : res.data
            })
        })
        .catch((err) => console.log(err))
    }


    render () {
        return (

            <Card className="dashboardTableCard TableCard" style={{display: this.props.notificationCard ? "block" : "none"}}>
                <CardBody className="dashboardTableBody TableBody">
                    <CardTitle className="dashboardTitle Title">Dashboard</CardTitle>
                    
                        <p className="tableTitle">You currently have {this.props.numPatients} patients using this application.</p> 
                        <div>
                            <p className="tableTitle">New patients enrolled past 7 days.</p>
                            {this.props.patientsWeekListLength ? (

                                <Table size="sm" className="patEnrolledTable">
                                    <thead>
                                        <tr>
                                            <th>Name</th><th>Hosp number</th><th>Enrolled</th><th>Primary physician</th>
                                        </tr>
                                    </thead>
                                    <tbody className="patEnrolledBody">
                                        {this.props.patientsWeekList.map(item => (

                                            <tr key={item._id} className="patEnrolledDetail" onClick={() => this.onClicked(item._id)}>
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

                        <p className="tableTitle">Appointments this week</p> 
                        {this.props.apptsList.length ? (

                            <Table size="sm" className="appThisWeekTable">
                                <thead>
                                    <tr>
                                        <th>Name</th><th>Hosp number</th><th>Appointment</th><th>Primary physician</th>
                                    </tr>
                                </thead>
                                <tbody className="appThisWeekPat">

                                        {this.props.apptsList.map(item => (

                                        <tr key={item._id} className="appThisWeekDetail" onClick={() => this.onClicked(item._id)}>
                                            <td>{item.details.first_name} {item.details.last_name}</td>  
                                            <td>{item.details.patient_number}</td>
                                            <td>{moment(item.appointment.next_appt).format("dddd, MMMM Do YYYY")} at  {moment(item.appointment.next_appt).format("h:mm a")}</td> 
                                            {item.physician ?
                                                <td>{`Dr. ${item.physician.name.first} ${item.physician.name.last}`}</td>
                                                : 
                                                null
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                        ) : (
                        <p>No appointments this week</p>
                        )}

                        <p className="tableTitle">Emergency notifications</p>
                        
                        <Table size="sm" className="emergNotifTable">
                            <thead>
                                <tr>
                                    <th>Name</th><th>Hosp number</th><th>Emergency</th><th>Date</th><th>Time</th><th>Primary physician</th>
                                </tr>
                            </thead>
                            <tbody className="emerNotifPat">
                            {this.state.emergencies ? 
                                this.state.emergencies.map((emergency) =>{
                                    return(
                                        (moment(emergency.alert_datetime).isAfter(moment().add(-7, 'day')))&&(emergency.alert_patient_id) && (emergency.alert_type[0].choking || emergency.alert_type[0].fall || emergency.alert_type[0].freezing || emergency.alert_type[0].hallucination) ?
                                        <tr key={emergency._id} className="emergNotifDetail" onClick={() => this.onClicked(emergency.alert_patient_id)}>        
                                            <td> {emergency.alert_firstname} {emergency.alert_lastname} </td>
                                            <td> {emergency.alert_hospnum}</td>
                                            <td> 
                                                <Container>
                                                    {emergency.alert_type[0].choking ? <Container><label>{emergency.alert_type[0].choking}</label></Container>: null}
                                                    {emergency.alert_type[0].fall ? <Container><label>{emergency.alert_type[0].fall}</label></Container> : null}
                                                    {emergency.alert_type[0].freezing ? <Container><label>{emergency.alert_type[0].freezing}</label></Container> : null}
                                                    {emergency.alert_type[0].hallucination ? <Container><label>{emergency.alert_type[0].hallucination}</label></Container> : null}
                                                </Container>
                                                
                                            </td>
                                            <td> {moment(emergency.alert_datetime).format('dddd, MMMM Do YYYY')}</td>
                                            <td> {moment(emergency.alert_datetime).format("h:mm a")}</td>
                                                {/* <td>{moment(item............).format("dddd, MMMM Do YYYY")}</td> 
                                                <td>{moment(item.............).format("h:mm a")}</td> */}
                                            <td>{emergency.alert_physician ? `Dr. ${emergency.alert_physician}` : null}</td>
                                        </tr>
                                        :
                                        null                                         
                                    )
                                })    
                            : null
                            }
                            </tbody>
                                
                            
                        </Table>
                </CardBody>
            </Card>
        )
    }
}       