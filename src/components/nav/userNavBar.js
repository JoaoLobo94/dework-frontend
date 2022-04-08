import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/actions/index";
import { useState} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import WithdrawalModal from "../../components/cards/withdrawalModal";

const UserNavBar = () => {
  const dispatch = useDispatch();
  const logOutAction = () => {
    dispatch(signOut());
    localStorage.removeItem("token");
    window.location.reload();
  };
  const [balance, setBalance] = useState('1');
  const credentials = useSelector((state) => state.credentials);
  const user = useSelector((state) => state.user);

  const auth = {
    headers : {
      "access-token": credentials.token,
      'client': credentials.client,
      'uid': user.uid
    }
  }

  const getUserBalance = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/users/${user.id}/check_balance`, auth)
      .then((res) => {
        if (res.status === 200) {
          setBalance(res.data.balance);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div>
      <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Dework</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="">Companies</Nav.Link>
              <Nav.Link href="">Contributions</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={() => getUserBalance()}> Balance: {balance}</Nav.Link>
              {balance !== '###' ? <WithdrawalModal maxAmount={balance} credentials={auth}/> : <Nav.Link onClick={() => getUserBalance()}>Unlock Withdrawl</Nav.Link>}
              <Nav.Link onClick={() => logOutAction()}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default UserNavBar;
