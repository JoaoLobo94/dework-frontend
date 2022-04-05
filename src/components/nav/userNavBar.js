import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";


const UserNavBar = () => {
  const dispatch = useDispatch();
  dispatch(signOut());
  return (
    <div>
      <Navbar  sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Dework</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="">Companies</Nav.Link>
              <Nav.Link>|</Nav.Link>
              <Nav.Link href="">Contributions</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Your Balance: </Nav.Link>
              <Nav.Link>
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
