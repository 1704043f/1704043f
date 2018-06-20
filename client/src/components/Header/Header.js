import React from 'react';
import "./Header.css";
import Account from "../Account";

import logo from "./med_monitor.png";

import userAPI from "../../utils/userAPI";


import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
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
                    console.log("clear localstorage");
                    localStorage.clear();
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
            <div className='navbarContainer'>

                <Navbar fluid color='light' light expand='md'>
                
                    <NavbarBrand href={localStorage.getItem("role") && localStorage.getItem("role").toLowerCase() === "patient" ? "/patient" :
                    (localStorage.getItem("role")) && (localStorage.getItem("role").toLowerCase() === "admin" || localStorage.getItem("role").toLowerCase() === "doctor") ? "/admin" : "/"}
                    >
                        <img src={logo} className='med_logo' alt='med monitor'/>
                    </NavbarBrand>
                    
                    <Nav className="ml-auto" navbar >
                        <NavItem>
                            {localStorage.getItem("username") ? 
                                localStorage.getItem("role").toLowerCase() === 'admin' || localStorage.getItem("role").toLowerCase() === 'doctor'
                                ?
                                    <NavLink className='navName' disabled><b>Hello, Dr. {localStorage.getItem('lastName').charAt(0).toUpperCase() + localStorage.getItem('lastName').slice(1)}</b></NavLink>
                                :
                                    <NavLink className='navName' disabled><b>Hello, {localStorage.getItem('lastName').charAt(0).toUpperCase() + localStorage.getItem('lastName').slice(1)}</b></NavLink>
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
                                <NavLink className='logoutLink' href="/home" onClick={this.handleLogout}><Button color='primary'>LOG OUT</Button></NavLink>
                            : null}
                        </NavItem>
                    </Nav>

                </Navbar>
            </div>


        );
    }
}