import "./signIn.css";
import SignInCard from "../../components/cards/signInCard";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import BitcoinDonation from "../../assets/images/address.png";
import { Card } from "react-bootstrap";

const SignIn = () => {
  return (
    <div>
      <Container className="mt-3 mb-3 text-center">
        <Card>
          <Card.Header>
            <h1>TallyPeer Dashboard BETA</h1>
          </Card.Header>
            <Card.Body>
              Manage your repository finances
            </Card.Body>
        </Card>
      </Container>
      <Row>
        <SignInCard />
      </Row>
      <Container className="justify-content-center mt-3">
        <h2 className="d-flex justify-content-center">Donate</h2>
        <Row className="justify-content-center">
          <img className="bitcoin-address" src={BitcoinDonation} alt="Single Addr" />
          <p className="d-flex justify-content-center">bc1qxugylzf53rapk39cpmfhwm8cxk4j2yn96j0ycn</p>
          <p className="d-flex justify-content-center">Contact all issues: deworkbtc@gmail.com </p>
        </Row>
      </Container>
      <div className="fade-in">
      </div>
    </div>
  );
};

export default SignIn;
