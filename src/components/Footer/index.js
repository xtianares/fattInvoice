import React from "react";
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

function Footer() {
  return (
    <footer className="footer mt-auto">
      <section id="footer-wrap" className="wrap clearfix py-3">
        <Container className="fluid">
          <Row>
            <Col className="text-center" sm="12">
              <p className="mb-1">Copyright &#169; {(new Date().getFullYear())}, FattInvoice Demo. All Rights Reserved.</p>
            </Col>
          </Row>
        </Container>
      </section>
    </footer>
  )
}

export default Footer;