import { Modal } from "react-bootstrap";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const CompanyFundModal = () => {
  const company = useSelector((state) => state.company);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Nav.Link onClick={handleShow}>Fund this Company</Nav.Link>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send bitcoin to this bitcoin address to support this company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="d-flex justify-content-md-center mb-3">
            <QRCode value={company.pub_key} />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CompanyFundModal;
