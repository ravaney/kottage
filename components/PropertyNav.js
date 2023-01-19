import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function PropertyNav() {
  return (
    <Container
      style={{
        // position: "sticky",
        backgroundColor: "white",
      }}
    >
      <Navbar
        variant="light"
        style={{ display: "flex", maxWidth: "100%", overflow: "auto" }}
      >
        <Nav>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#amenities">Amenities</Nav.Link>
          <Nav.Link href="#policy">Policies</Nav.Link>
          <Nav.Link href="#reviews">Reviews</Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  );
}
