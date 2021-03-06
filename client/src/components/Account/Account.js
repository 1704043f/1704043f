import React from 'react';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    Container,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col } from 'reactstrap';
import { withRouter } from "react-router-dom";
import SignInForm from "../../components/SignInForm";
import Registration from "../../components/Registration";
import Alert from 'react-s-alert';
import userAPI from '../../utils/userAPI';
import patientAPI from '../../utils/patientAPI';
import doctorAPI from '../../utils/doctorAPI';

import classnames from 'classnames';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            password: "",
            messageCenter: null,
            messageStatus: "",
            username: this.props.username,
            role: this.props.role,
            email: this.props.email,
            patientID: "",
            newAccountEmail: "",
            activeTab: '1'
        };
        this.modalToggle = this.modalToggle.bind(this);
    }
        

    modalToggle() {
        this.setState({
            modal: !this.state.modal
        });
    }


    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    getBackEmail(newAccountEmail, patientID) {
        this.setState({
            newAccountEmail: newAccountEmail,
            patientID: patientID
        })
    }


    validateLogin(username, password) {
        let valid = true;
        if (!username || !password) {
            console.log("test");
            valid = false;
            Alert.error('Username or password cannot be empty!', {
                position: 'top',
                effect: 'stackslide',
                onShow: function () {
                    console.log("aye!");
                }
            });

        } else if (password.length < 6) {
            valid = false;
            Alert.error('Password length needs to be greater than 5 characters', {
                position: 'top',
                effect: 'stackslide'
            });
        } else {
            Alert.closeAll();
        }
        return valid
    }


    handleLogin = event => {
        if (this.validateLogin(this.state.username, this.state.password)) {
            if (this.state.password && this.state.username) {
                userAPI.login({
                    username: this.state.username,
                    password: this.state.password
                })
                    .then(res => {
                        console.log(res);
                        localStorage.setItem("username", res.data.username);
                        localStorage.setItem("email", res.data.email);
                        localStorage.setItem("role", res.data.role);
                        if (res.data.patient_id && res.data.role.toLowerCase() === 'patient') {
                            localStorage.setItem("userId", res.data.patient_id);
                        } else if (res.data.doctor_id && (res.data.role.toLowerCase() === 'admin' || res.data.role.toLowerCase() === 'doctor')) {
                            localStorage.setItem("userId", res.data.doctor_id);
                        }
                        this.setState({
                            id: localStorage.getItem("userId"),
                            role: res.data.role,
                            email: res.data.email,
                            username: res.data.username,
                        }, function () {
                            console.log(this.state.id);
                            if (this.state.role.toLowerCase() === "patient") {
                                patientAPI.findPatientInfoForPatient(this.state.id)
                                    .then(res => {
                                        localStorage.setItem("firstName", res.data.details.first_name);
                                        localStorage.setItem("lastName", res.data.details.last_name);
                                        localStorage.setItem("patient_number", res.data.details.patient_number);
                                        localStorage.setItem("patient_phone", res.data.details.phone);
                                        if (localStorage.getItem("role").toLowerCase() === "patient") {
                                            this.props.history.push('/patient');
                                        } else if (localStorage.getItem("role").toLowerCase() === "admin" || localStorage.getItem("role").toLowerCase() === "doctor") {
                                            this.props.history.push('/admin');
                                        }
                                    })
                                    .catch(err => console.log(err));

                            } else if (this.state.role.toLowerCase() === "admin" || this.state.role.toLower() === "doctor") {
                                doctorAPI.findOne(this.state.id)
                                    .then(res => {
                                        console.log(this.state.id);
                                        console.log(res);
                                        localStorage.setItem("firstName", res.data.name.first);
                                        localStorage.setItem("lastName", res.data.name.last);
                                        localStorage.setItem("office", res.data.office);
                                        localStorage.setItem("phone", res.data.phone);
                                        if (localStorage.getItem("role").toLowerCase() === "patient") {
                                            this.props.history.push('/patient');
                                        } else if (localStorage.getItem("role").toLowerCase() === "admin" || localStorage.getItem("role").toLowerCase() === "doctor") {
                                            this.props.history.push('/admin');
                                        }
                                    })
                                    .catch(err => console.log(err));
                            }
                        })
                    })
                    .catch(err => {
                        Alert.error('Invalid username or password', {
                            position: 'top',
                            effect: 'stackslide'
                        });
                    }
                    );
            }
        }
    }


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    getBackRegisterMessage = messageCenter => {
        this.setState({
            messageCenter: messageCenter
        })
    }


    getBackRegisterMessageStatus = messageStatus => {
        this.setState({
            messageStatus: messageStatus
        })
    }


    
    render() {
        return (
            <div>
                <Button color='primary' onClick={this.modalToggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className}>
                    <ModalHeader toggle={this.modalToggle}>Account Registration/Sign In</ModalHeader>
                    <ModalBody>
                        <Container fluid>
                            <Container className="home-container tabContainer">
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggle('1'); }}
                                        >
                                            <h4 className="signInTab">Sign In</h4>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggle('2'); }}
                                        >
                                            <h4 className="registerTab">Registration</h4>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col sm="12">
                                                <SignInForm onClick={this.handleLogin} onChange={this.handleInputChange} username={this.props.username} password={this.state.password} />
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <Col sm="12">
                                                <Registration onCreateAccount={this.handleCreateAccount} getBackMessage={this.getBackRegisterMessage} getBackMessageStatus={this.getBackRegisterMessageStatus} onValidateEmail={this.handleValidateEmail} onChange={this.handleInputChange} newAccountEmail={this.state.newAccountEmail} newUsername={this.state.newUsername} newUserPassword={this.state.newUserPassword} />
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </Container>
                        </Container>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default withRouter(Account);