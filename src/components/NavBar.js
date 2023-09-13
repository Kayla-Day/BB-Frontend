import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavigationBar() {
  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#C3964B" }}
      // className="bg-body-tertiary"
    >
      <Container xs={12} sm={12} md={12} lg={12}>
        <Navbar.Brand href="/free">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            {/* <Nav.Link href="/account">Account</Nav.Link> */}
            <Nav.Link href="/auth">Account</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
