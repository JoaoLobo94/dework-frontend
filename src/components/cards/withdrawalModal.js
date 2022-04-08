import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";

const WithdrawalModal = (props) => {
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (event) => {
    console.log(wallet);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Nav.Link onClick={handleShow}>Withdraw funds</Nav.Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Max amount to withdraw: {props.maxAmount}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Wallet address to send your Bitcoin</Form.Label>
              <Form.Control
                type="wallet"
                placeholder="Enter your wallet"
                onChange={(e) => setWallet(e.target.value)}
                value={wallet}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter the amount you would like to send</Form.Label>
              <Form.Control
                type="wallet"
                placeholder="Enter how much you would like to withdraw"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                autoFocus
              />
            </Form.Group>
            <Button type="submit">Execute transaction</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WithdrawalModal;
