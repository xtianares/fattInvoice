import React from "react";
import {
  Container,
  Row,
  Col
} from 'reactstrap';

import logo from "../assets/images/xtianares.png";

function Header() {  
  return (
    <header>
      <section id="header-wrap" className="wrap clearfix">
        <Container className="fluid">
          <Row>
            <Col sm="12" id="header" className="d-flex align-content-center flex-wrap">
              <a className="logo mr-auto" href="/"><img src={logo} alt="FattMerchant Logo" /> <span>FattInvoice Challenge</span></a>
              <span className="demo-by align-self-center">Demo by: <a href="https://www.linkedin.com/in/xtianares/">Christian Castanares</a></span>
            </Col>
          </Row>
        </Container>
      </section>
    </header>
  );
}

export default Header;