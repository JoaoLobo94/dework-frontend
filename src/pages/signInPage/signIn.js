import "./signIn.css";
import SignInCard from "../../components/cards/signInCard";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import BitcoinDonation from "../../assets/images/address.png";

const SignIn = () => {
  return (
    <div>
      <Container>
        <Row className="text-center">
          <h1>Welcome to decentralized working BETA</h1>
          <h4>
            The objective of this project is to enable Bitcoin earnings in a decentralized manner, without any company
            structure, bureaucracy, or KYC
          </h4>
          <p>
            If there is interest for this a project, I will improve it until it becomes as seamless as pushing a commit
            in order to earn Bitcoin for your work
          </p>
        </Row>
      </Container>
      <Container className="justify-content-center">
        <Row>
          <SignInCard />
        </Row>
      </Container>
      <Container className="justify-content-center mt-3">
        <h2 className="d-flex justify-content-center">Donate</h2>
        <Row className="justify-content-center">
          <img className="bitcoin-address" src={BitcoinDonation} alt="Single Addr" />
          <p className="d-flex justify-content-center">bc1qxugylzf53rapk39cpmfhwm8cxk4j2yn96j0ycn</p>
          <p className="d-flex justify-content-center">Contact: </p>
        </Row>
      </Container>
    </div>
  );
};

export default SignIn;
