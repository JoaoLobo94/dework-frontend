import NavBar from "../../components/nav/navBar";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const SingleContribution = () => {
  const [owner, setOwner] = useState({});
  const contribution = useSelector((state) => state.contribution);
  const [users, setUsers] = useState([]);
  const credentials = useSelector((state) => state.credentials);
  const company = useSelector((state) => state.company);
  const user = useSelector((state) => state.user);
  const [refresh, setRefresh] = useState(false);
  const [failed, setFailed] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const addUserParams = { user_to_add: userEmail };

  const auth = {
    headers: {
      "access-token": credentials.token,
      client: credentials.client,
      uid: user.uid,
    },
  };
  useEffect(() => {
    const ownerInfo = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/users/${contribution.creator}`,
          auth
        )
        .then((response) => setOwner(response.data))
        .catch((err) => {
          setOwner({});
          setRefresh(true);
        });
    };
    ownerInfo();
  }, [refresh]);

  useEffect(() => {
    const usersInfo = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/companies/${company.id}/contributions/${contribution.id}/users_of_contribution`,
          auth
        )
        .then((response) => setUsers(response.data))
        .catch((err) => {
          setUsers([]);
          setFailed(true);
        });
    };
    usersInfo();
  }, [failed]);

  const acceptForWork = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/companies/${company.id}/contributions/${contribution.id}/start_work`,
        auth
      )
      .then((res) => {
        if (res.status === 200) {
          window.history.back();
        }
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/companies/${company.id}/contributions/${contribution.id}/add_user`,
        addUserParams,
        auth
      )
      .then((res) => {
        if (res.status === 200) {
          setError("User added");
        }
      })
      .catch((err) => {
        setError("User could not be found");
      });
  };

  const viewContribution = (contribution) => {
    window.location.replace(contribution.pull_request);
  };

  const finishAndPay = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/companies/${company.id}/contributions/${contribution.id}/merge_request`,
        auth
      )
      .then((res) => {
        if (res.status === 200) {
          window.history.back();
        }
      });
  };
  return (
    <div>
      <NavBar type={"contribution"} />
      <Container>
        <Table striped bordered responsive="xl" className="mt-3">
          <thead>
            <tr>
              <th>id</th>
              <th>Merged</th>
              <th>Accepted_for_start</th>
              <th>Creator</th>
              <th>Creator telegram</th>
              <th>Current value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{contribution.id}</td>
              <td>{contribution.merged ? "Yes" : "No"}</td>
              <td>{contribution.accepted_for_start ? "Yes" : "No"}</td>
              <td>{owner.email}</td>
              <td>{owner.telegram}</td>
              <td>{contribution.current_value ? contribution.current_value : 0} BTC</td>
              <td>
                <Nav.Link onClick={() => viewContribution(contribution)}>View</Nav.Link>
              </td>
            </tr>
          </tbody>
        </Table>
        <Card className="justify-content-center mb-3 mt-3">
          <Card.Header>Tip: Contact users via telegram or email to discuss contribution</Card.Header>
        </Card>
        <Card className="justify-content-center mb-3 mt-3">
          <Card.Header>
            <h2 className="mt-3">Users participating</h2>
          </Card.Header>
        </Card>
        <Table striped bordered responsive="xl">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Telegram</th>
              <th>Money to receive</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{contribution.telegram}</td>
                <td>{contribution.current_value / users.length} BTC</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Card className="justify-content-center mb-3 mt-3">
          <Card.Header>Description</Card.Header>
          <Card.Body>{contribution.description}</Card.Body>
        </Card>
        <Card className="justify-content-center mb-3 mt-3">
          <Card.Header>Actions</Card.Header>{" "}
        </Card>
          <Row>
            <Col md="auto">
              {contribution.accepted_for_start || (user.id === company.owner) === false ? (
                <Button className="disabled">Work Already started or you don't have permission</Button>
              ) : (
                <Button onClick={() => acceptForWork()}>Accept work start</Button>
              )}
            </Col>
            <Col md="auto">
              {contribution.accepted_for_start && user.id === contribution.creator ? (
                <Button onClick={handleShow}>Add user to contribution</Button>
              ) : (
                <Button className="disabled">You cannot add user to contribution</Button>
              )}
            </Col>
            <Col md="auto">
              {user.id === company.owner && !contribution.merged ? (
                <Button onClick={() => finishAndPay()}>Finish and pay contributors</Button>
              ) : (
                <Button className="disabled">You do not have permission to finish work or it has been payed</Button>
              )}
            </Col>
          </Row>
          <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="btc">
                  <Form.Label>Enter the email of the user you would like to add</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                    autoFocus
                  />
                </Form.Group>
                <Button type="submit">Add user</Button>
              </Form>
              <Modal.Body>{error}</Modal.Body>
            </Modal.Body>
          </Modal>
      </Container>
    </div>
  );
};

export default SingleContribution;
