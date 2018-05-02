import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

import"./HomeNav.css"

export default class HomeNav extends React.Component {
    render() {
        return (
            <div>
                <Nav>
                    <NavItem classname="homepage-navitem">
                        <NavLink className="homepage-navlink" href="#">Our Mission</NavLink>
                    </NavItem >
                    <NavItem classname="homepage-navitem">
                        <NavLink className="homepage-navlink" href="#">Benefits</NavLink>
                    </NavItem>
                    <NavItem classname="homepage-navitem">
                        <NavLink className="homepage-navlink" href="#">About Us</NavLink>
                    </NavItem>
                    <NavItem classname="homepage-navitem">
                        <NavLink className="homepage-navlink" href="#">Endorsements</NavLink>
                    </NavItem>
                    <NavItem classname="homepage-navitem">
                        <NavLink className="homepage-navlink" href="#">Testimonials</NavLink>
                    </NavItem>
                    <NavItem classname="homepage-navitem">
                        <NavLink className="homepage-navlink" href="#">Future Plans</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}