import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import React, { useState } from "react";

const SignInCard = () => {
  const [tab, setTab] = useState("signIn");
  // const handleSubmit = (event) => {

  // };
  if (tab === "signIn") {
    return (
      <Form className="d-flex justify-content-center">
        <Card style={{ width: "30%" }}>
          <Card.Header>
            <Nav fill variant="tabs">
              <Nav.Item>
                <Nav.Link onClick={() => setTab("signIn")}>SignIn</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setTab("signUp")}>SignUp</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </Card.Text>
            <Card.Text>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="passwordSignIn" placeholder="Password" />
              </Form.Group>
            </Card.Text>
            <Button variant="primary">Submit</Button>
          </Card.Body>
        </Card>
      </Form>
    );
  } else {
    return (
      <Form className="d-flex justify-content-center">
        <Card style={{ width: "30%" }}>
          <Card.Header>
            <Nav fill variant="tabs">
              <Nav.Item>
                <Nav.Link onClick={() => setTab("signIn")}>SignIn</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setTab("signUp")}>SignUp</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" />
              </Form.Group>
            </Card.Text>
            <Card.Text>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Job</Form.Label>
                <Form.Control type="job" placeholder="Enter your job" />
              </Form.Group>
            </Card.Text>
            <Card.Text>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </Card.Text>
            <Card.Text>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="passwordSignUp" placeholder="Password" />
              </Form.Group>
            </Card.Text>
            <Card.Text>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="passwordConfirmation" placeholder="Password confirmation" />
              </Form.Group>
            </Card.Text>
            <Button variant="primary">Submit</Button>
          </Card.Body>
        </Card>
      </Form>
    );
  }
};

export default SignInCard;
