import CompaniesCard from "../../components/cards/companiesCard";
import CreateCompaniesCard from "../../components/cards/createCompaniesCard";
import NavBar from "../../components/nav/navBar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Card } from "react-bootstrap";
const Companies = () => {
  return (
    <div>
      <NavBar type={"user"} />
      <Container>
        <Card className="mb-3 mt-3">
          <Card.Header>
            <h1 className="mt-3">Create a company</h1>
          </Card.Header>
          <Card.Body>
            <CreateCompaniesCard />
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <h1>Click to see any specific company</h1>
          </Card.Header>
          <Card.Body>
            <Row className="mt-4">
              <Col sm>
                <CompaniesCard type={"All companies"} />
              </Col>
              <Col sm>
                <CompaniesCard type={"My companies"} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Companies;
