import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import axios from "axios";

const WithdrawalModal = (props) => {
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);
  const [send, setSend] = useState(false);
  const [txid, setTxid] = useState("");
  // let amountWithoutFees = props.maxAmount - props.maxAmount * 0.5;
  const transactionsParams = { amount: amount, destination_wallet: wallet };
  const user = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/users/${user.id}/send_transaction`,
        transactionsParams,
        props.credentials
      )
      .then((res) => {
        if (res.status === 200) {
          setError(false)
          setSend(true);
          setTxid(res.data.tx.hash);
        }
      })
      .catch(() => {
        setError(true);
      });
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
            <Form.Group className="mb-3" controlId="wallet">
              <Form.Label>
                At the moment you will only be able to withdraw 50% of your funds on each transaction
              </Form.Label>
              <Form.Label>Wallet address to send your Bitcoin</Form.Label>
              <Form.Control
                type="wallet"
                placeholder="Enter your wallet"
                onChange={(e) => setWallet(e.target.value)}
                value={wallet}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="btc">
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
        {send ? <Modal.Body>Transaction is getting propagated with id: {txid}</Modal.Body> : ""}
        {error ? (
          <Modal.Body>
            There has been an error. Please try again maybe with a lower amount. Do not forget transaction fees
          </Modal.Body>
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};

export default WithdrawalModal;
