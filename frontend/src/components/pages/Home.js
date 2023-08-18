import React from "react";
import { Container, Row, Col } from "reactstrap";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";

const Home = () => {
  return (
    <div className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col lg="6" className="mb-4">
            <ContactForm />
          </Col>
          <Col lg="6">
            <ContactFilter />
            <Contacts />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
