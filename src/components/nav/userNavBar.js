import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from "react-bootstrap/Container";

const UserNavBar = () => {
  return (
    <div>
      <Navbar  sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Dework</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Companies</Nav.Link>
              <Nav.Link href="#pricing">Contributions</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Your Balance: </Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default UserNavBar;
