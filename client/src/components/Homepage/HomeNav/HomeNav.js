import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import"./HomeNav.css"

export default class HomeNav extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <Nav>
                    <NavItem classname="homepage-navitem">
                        <NavLink className="homepage-navlink" href="#mission">Our Mission</NavLink>
                    </NavItem >
                    <NavItem classname="homepage-navitem">
                        <NavLink className="homepage-navlink" href="#benefits">Benefits</NavLink>
                    </NavItem>
                    <NavItem classname="homepage-navitem">
                        <NavLink activeClass="active" className="homepage-navlink" href="#aboutUs">About Us</NavLink>
                    </NavItem>
                    <NavItem classname="homepage-navitem">
                        <NavLink className="homepage-navlink" href="#endorsements">Endorsements</NavLink>
                    </NavItem>
                    <NavItem classname="homepage-navitem">
                        <NavLink className="homepage-navlink" href="#testimonials">Testimonials</NavLink>
                    </NavItem>
                    <NavItem classname="homepage-navitem">
                        <NavLink className="homepage-navlink" href="#futureplans">Future Plans</NavLink>
                    </NavItem>
                    <NavItem classname="homepage-navitem">
                        <NavLink className="homepage-navlink" href="#contactus">Contact Us</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}