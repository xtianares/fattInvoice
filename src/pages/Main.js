import React from "react";
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

function Main() {
  return (
    <Container className="h-100">
      <Row className="justify-content-center h-100">
        <Col className="text-center d-flex justify-content-center" sm="12">
          <div className="welcome-message align-self-center">
            <h1 className="mb-2 mt-3">Welcome to FattInvoice</h1>
            <h4 className="mt-0 mb-5">To start creating an invoice please click the button bellow.</h4>
            <a href="/create-invoice" className="btn btn-outline-success btn-lg mb-4">Create an Invoice</a>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Main;