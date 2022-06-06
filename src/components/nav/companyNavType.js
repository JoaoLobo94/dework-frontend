import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CompanyFundModal from "../cards/companyFundModal";
const CompanyNavType = () => {
  const [balance, setBalance] = useState("###");
  const credentials = useSelector((state) => state.credentials);
  const company = useSelector((state) => state.company);
  const user = useSelector((state) => state.user);

  const auth = {
    headers: {
      "access-token": credentials.token,
      client: credentials.client,
      uid: user.uid,
    },
  };

  const getCompanyBalance = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/companies/${company.id}/check_balance`,
        auth
      )
      .then((res) => {
        if (res.status === 200) {
          setBalance(res.data);
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
          <Nav.Link onClick={() => getCompanyBalance()}> Company Balance: {balance ? balance : 0} SAT</Nav.Link>
        </Col>
        <Col>
          {balance !== "###" ? (
            <CompanyFundModal />
          ) : (
            <Nav.Link onClick={() => getCompanyBalance()}>See Balance</Nav.Link>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CompanyNavType;
