import React from "react";
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

function Main() {
  return (
    <main id="main-wrap" className="wrap clearfix py-3">
      <Container>
        <Row className="justify-content-center">
          <Col className="text-center" sm="12">
            <p className="mb-1">Hello World</p>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Main;