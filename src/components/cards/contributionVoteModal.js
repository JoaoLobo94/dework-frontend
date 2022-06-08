import { Modal } from "react-bootstrap";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button";

const ContributionVoteModal = () => {
  const [amount, setAmount] = useState("");
  const contribution = useSelector((state) => state.contribution);
  const [show, setShow] = useState(false);
  const [tooBigVote, setTooBigVote] = useState(false);
  const [newValue, setNewValue] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const credentials = useSelector((state) => state.credentials);
  const user = useSelector((state) => state.user);
  const company = useSelector((state) => state.company);
  const auth = {
    headers: {
      "access-token": credentials.token,
      client: credentials.client,
      uid: user.uid,
    },
  };
  const voteParams = { value: amount };


  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/companies/${company.id}/contributions/${contribution.id}/vote`,
        voteParams,
        auth
      )
      .then((res) => {
        console.log(res)
        if (res.status === 202) {
          setTooBigVote(true)
        }else{
          setNewValue(res.data)
        }
      })
  };

  return (
    <div>
      <Nav.Link onClick={handleShow}>Change contribution value</Nav.Link>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How much do you think this contribution should be worth?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="btc">
              <Form.Label>Enter the amount that you think should be paid to all contributors.
              </Form.Label>
              <Form.Label>Keep in mind you can only vote once per contribution, all other votes will be ignored.</Form.Label>
              <Form.Control
                type="wallet"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                autoFocus
              />
            </Form.Group>
            <Button type="submit">Save your vote</Button>
          </Form>
          <Modal.Body>
            {tooBigVote ? 'Error. You might have already voted, or tried to insert a value greater than the market capitalization of the company' : ''}
          </Modal.Body>
          <Modal.Body>
            {newValue > 0 ? `New value of this contribution -> ${newValue}` : ''}
          </Modal.Body>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ContributionVoteModal;
