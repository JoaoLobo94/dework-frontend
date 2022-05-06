import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import WithdrawalModal from "../../components/cards/withdrawalModal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const UserNavType = () => {
  const [balance, setBalance] = useState("###");
  const credentials = useSelector((state) => state.credentials);
  const user = useSelector((state) => state.user);

  const auth = {
    headers: {
      "access-token": credentials.token,
      client: credentials.client,
      uid: user.uid,
    },
  };

  const getUserBalance = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/users/${user.id}/check_balance`,
        auth
      )
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
      <Row>
        <Col md="auto">
          <Nav.Link onClick={() => getUserBalance()}> Your Balance: {balance} BTC</Nav.Link>
        </Col>
        <Col md="auto">
          {balance !== "###" ? (
            <WithdrawalModal maxAmount={balance} credentials={auth} />
          ) : (
            <Nav.Link onClick={() => getUserBalance()}>Unlock withdrawal</Nav.Link>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserNavType;
