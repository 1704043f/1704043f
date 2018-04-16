import React from "react";
import "./NoMatch.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText
} from 'reactstrap';

const NoMatch = () => (
  <div>

  <Container>
    
    <Row>
      <Col>
        <Card className="noMatchTable TableCard">
          <CardBody className="TableBody">

              <CardText className="noMatch">
                The Page You Are Looking For Has Not Been Found. <br />
                Please Try Again. 
              </CardText>

          </CardBody>
        </Card>
      </Col>
    </Row>

  </Container>

    </div>

  );

export default NoMatch;
