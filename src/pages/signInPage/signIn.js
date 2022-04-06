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
          <h1>Welcome to decentralized working MVP</h1>
          <h4>
          The objective of this project is to enable Bitcoin earnings in a decentralized manner, without any company
          structure, bureaucracy, or KYC
        </h4>
        <p>There are many improvements to be made. This is a simple version of my idea. Let me know if you like it by donating.</p>
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
          <p className="d-flex justify-content-center">Contact all issues: deworkbtc@gmail.com </p>
        </Row>
      </Container>
      <Container className='mt-3'>
        <h2>How do i register my company</h2>
        <p>Simply create an account, link it to your github. We will generate a BTC wallet for you, that can receive contributions, or you can actually give your clients for payment. You will be able to withdraw funds if its your company</p>
        <h2>How do i contribute</h2>
        <p>Simply join the company. Push a commit to github and let the project owner know by adding your pull request link</p>
        <p>Very simply put, you will be able to contribute to github projects that sign up. Once the github project owner is happy with your contribution he will click pay, and you will get money.</p>
        <p>
          If there is interest for this a project, I will improve it until it becomes as seamless as pushing a commit in
          order to earn Bitcoin for your work. For now the owner of the project will have to know which user made the contribution of github, and pay them here.
        </p>
        <h2>How much will i get per contribution</h2>
        <p>I have designed a stock market like funcionality where you can estimate a merge request value. An algorithm will join all these up and return a fare estimate for the employer and employee</p>
      </Container>
    </div>
  );
};

export default SignIn;
