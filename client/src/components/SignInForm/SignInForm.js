import React from 'react';
import "./SignInForm.css";

import {
    Input,
    Form,
    FormGroup,
    Label,
    Button,
    Container
} from 'reactstrap';

export default class SignInForm extends React.Component {

    render() {
        return (
                <Container>
                    <Form className="signin-form col-md-8">
                        <Container>
                            <h2 className="signInMessage">Sign In With Us</h2>
                        </Container>
                        <FormGroup row className="signInName">
                            <Label size="lg">User Name</Label>
                            <Input type="text" name="username" id="enterUser" placeholder="user name" bsSize="lg" value={this.props.username} onChange={this.props.onChange} />
                        </FormGroup>
                        <FormGroup row className="signInPword">
                            <Label className="signin-label" size="lg">Password</Label>
                            <Input type="password" name="password" id="enterPassword" placeholder="password" bsSize="lg" value={this.props.password} onChange={this.props.onChange} />
                        </FormGroup>
                        <Button className="submit-button" size="lg" color="success" onClick={this.props.onClick}>Sign In</Button>{' '}
                    </Form>
                </Container>
           
        );
    }
}