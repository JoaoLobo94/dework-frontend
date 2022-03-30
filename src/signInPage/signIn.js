import SignInCard from "../components/cards/signInCard";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const SignIn = () => {
  return (
    <div>
      <Container>
        <Row className="text-center">
          <h1>Welcome to decentralized working BETA</h1>
          <h4>
            The objective of this project is to enable Bitcoin earnings in a decentralized manner, without any company
            structure, or bureaucracy behind
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
    </div>
  );
};

export default SignIn;
