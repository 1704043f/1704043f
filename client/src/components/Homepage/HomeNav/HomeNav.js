import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class HomeNav extends React.Component {
    render() {
        return (
            <div>
                <Nav>
                    <NavItem>
                        <NavLink href="#">Our Mission</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Benefits</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">About Us</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Endorsements</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Testimonials</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Future Plans</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}