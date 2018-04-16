import React from 'react';
import "./Header.css";

import logo from "./med_monitor.png";

import userAPI from "../../utils/userAPI";

import {
    Nav,
    Navbar,
    NavItem,
    NavLink,
    Label,
    Container
} from 'reactstrap';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleLogout = (event) => {
        userAPI.logout()
                .then(data =>{
                    localStorage.clear();
                    localStorage.addItem("messageCenter", "You have successfully logged out from our application!");
                    localStorage.addItem("messageStatus", "success");
                })
    }


    render() {
        return (
                <Navbar color="navbar" light expand="md">
                    <Container>
                            <Nav pills className="navLogo" alt={"logo"} size="lg" active>
                                    <NavLink href={localStorage.getItem("role") === "patient"
                                        ? "/patient"
                                        :
                                        (localStorage.getItem("role")) && (localStorage.getItem("role").toLowerCase() === "admin" || localStorage.getItem("role").toLowerCase() === "doctor")
                                            ? "/admin"
                                            :
                                            "/"}
                                    >
                                        <img src={logo} className='med_logo' alt='med monitor' />
                                    </NavLink>
                                   
                            </Nav>

                            <Nav pills className="navlogOutPills">
                                <NavItem className="navInfo">
                                    <Container className="navGreeting">
                                        <Label className="navLogName" for="appTime">
                                            <h3 ><em>
                                                {localStorage.getItem("username") ? 
                                                    localStorage.getItem("role").toLowerCase() === 'admin' || localStorage.getItem("role").toLowerCase() === 'doctor'
                                                    ?
                                                        `Hello, Dr. ${localStorage.getItem('lastName')}` 
                                                    :
                                                        `Hello, ${localStorage.getItem('lastName')}`
                                                : 
                                                    `Welcome!`
                                                } 
                                            </em></h3>
                                        </Label>
                                    </Container>
                                    {localStorage.getItem("username")!== "null"?
                                    <Container className="navBtn">
                                        <NavItem>
                                            {localStorage.getItem("username") && localStorage.getItem("role").toLowerCase() === 'patient' ? <NavLink href="appointment" className="navAppBtn" size="lg" active>APPOINTMENT</NavLink> : null}
                                        </NavItem>
                                        {localStorage.getItem("username")? 
                                        <NavLink href="/home" className="logOutBtn" size="lg" onClick={this.handleLogout} active>LOG OUT</NavLink>
                                        : null
                                        }
                                    </Container>
                                    :
                                    <Container className="navBtn">
                                        <NavItem>
                                            {localStorage.getItem("username") && localStorage.getItem? <NavLink href="appointment" className="navAppBtn" size="lg" active>APPOINTMENT</NavLink> : null}
                                        </NavItem>
                                        <NavLink href="/home" className="logOutBtn logInBtn" size="lg" active>LOG IN</NavLink>
                                    </Container>

                                    }
                                </NavItem>
                            </Nav>
                    </Container>
                </Navbar>
        );
    }
}