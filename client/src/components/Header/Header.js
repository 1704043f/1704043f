import React from 'react';
import "./Header.css";
import Account from "../Account";

import logo from "./med_monitor.png";

import userAPI from "../../utils/userAPI";


import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
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
    populateLogo(){
        return(
        <NavLink href={localStorage.getItem("role") && localStorage.getItem("role").toLowerCase() === "patient"
            ? "/patient"
            :
            (localStorage.getItem("role")) && (localStorage.getItem("role").toLowerCase() === "admin" || localStorage.getItem("role").toLowerCase() === "doctor")
                ? "/admin"
                :
                "/"}
        >
            
        </NavLink>
        )
    }

    render() {
        return (
            <div>
                <Navbar color='light' light expand='md'>
                    <NavbarBrand href={localStorage.getItem("role") && localStorage.getItem("role").toLowerCase() === "patient" ? "/patient" :
                    (localStorage.getItem("role")) && (localStorage.getItem("role").toLowerCase() === "admin" || localStorage.getItem("role").toLowerCase() === "doctor") ? "/admin" : "/"}
                    >
                        <img src={logo} className='med_logo' alt='med monitor'/>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar >
                            <NavItem>
                                {localStorage.getItem("username") ? 
                                    localStorage.getItem("role").toLowerCase() === 'admin' || localStorage.getItem("role").toLowerCase() === 'doctor'
                                    ?
                                        <NavLink><b>Hello, Dr. {localStorage.getItem('lastName')}</b></NavLink>
                                    :
                                        <NavLink><b>Hello, {localStorage.getItem('lastName')}</b></NavLink>
                                : 
                                <Account buttonLabel="Login/Sign Up" className='accountModal' />
                                }
                            </NavItem>
                            <NavItem>
                                {localStorage.getItem("username") && localStorage.getItem("role").toLowerCase() === 'patient' ? 
                                    <NavLink href="appointment" >MANAGE</NavLink>
                                : null}
                            </NavItem>
                            <NavItem>
                                {localStorage.getItem("username") ?
                                    <NavLink href="/home" onClick={this.handleLogout}>LOG OUT</NavLink>
                                : null}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>


        );
    }
}