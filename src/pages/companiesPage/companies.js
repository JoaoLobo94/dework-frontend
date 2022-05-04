import CompaniesCard from "../../components/cards/companiesCard";
import CreateCompaniesCard from "../../components/cards/createCompaniesCard";
import UserNavBar from "../../components/nav/userNavBar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Companies = () => {
  return (
    <div>
      <UserNavBar />
      <Container>
      <h1>Create a company</h1>
      <Row className="mt-4 mb-4">
        <CreateCompaniesCard />
      </Row>
      <h1>Or... you can click to see any specific company</h1>
        <Row className="mt-4">
        <Col sm><CompaniesCard type={"All companies"} /></Col>
        <Col sm md={{ span: 4, offset: 4 }}> <CompaniesCard type={"My companies"} /></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Companies;
