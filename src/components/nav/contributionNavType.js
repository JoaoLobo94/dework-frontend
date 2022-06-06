import ContributionVoteModal from "../../components/cards/contributionVoteModal";
import { useSelector } from "react-redux";
import { Col, Row, Nav } from "react-bootstrap";

const ContributionNavType = () => {
  const balance = useSelector((state) => state.contribution.current_value);
  return (
    <div>
      <Row>
        <Col md="auto">
          <Nav.Link> This contribution value: {balance ? balance : 0} SAT</Nav.Link>
        </Col>
        <Col>
          <ContributionVoteModal />
        </Col>
      </Row>
    </div>
  );
};

export default ContributionNavType;
