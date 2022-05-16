import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/actions/index";
import UserNavType from "./userNavType";
import CompanyNavType from "./companyNavType";
import ContributionNavType from "./contributionNavType";



const NavBar = (props) => {
  const dispatch = useDispatch();
  const logOutAction = () => {
    dispatch(signOut());
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div>
      <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Dework</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/companies">Companies</Nav.Link>
              {/* <Nav.Link href="/contributions"> Your contributions</Nav.Link> */}
            </Nav>
            <Nav>
               {props.type === 'user' ? <UserNavType /> : props.type ==='contribution' ? <ContributionNavType /> : <CompanyNavType />}
              <Nav.Link onClick={() => logOutAction()}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
