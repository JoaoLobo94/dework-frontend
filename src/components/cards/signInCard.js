import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import React, { useState } from "react";
import axios from "axios";

const SignInCard = () => {
  const [tab, setTab] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [job, setJob] = useState("");
  const [name, setName] = useState("");
  const [validated, setValidated] = useState(false);
  const signInForm = { email: email, password: password };
  const signUpForm = { name: name, password: password, job: job, password_confirmation: passwordConfirmation };


  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }
    if (tab === "signIn") {
      axios
        .post(`${process.env.REACT_APP_BACKEND_LOCATION}/auth/sign_in`, signInForm)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
      .post(`${process.env.REACT_APP_BACKEND_LOCATION}/auth/`, signUpForm)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };
  const checkMatchingPasswords = () => {
    if (password !== passwordConfirmation) {
      return "The passwords do not match";
    } else {
      return "Submit registration";
    }
  };
  const disableButton = () => {
    if (checkMatchingPasswords() === "Submit registration") {
      return false;
    } else {
      return true;
    }
  };
  if (tab === "signIn") {
    return (
      <Form className="d-flex justify-content-center" noValidate validated={validated} onSubmit={handleSubmit}>
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
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  required
                  placeholder="Enter email"
                />
                <Form.Control.Feedback type="invalid">Please insert your email address</Form.Control.Feedback>
              </Form.Group>
            </Card.Text>
            <Card.Text>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  type="password"
                  placeholder="Password"
                />
                <Form.Control.Feedback type="invalid">Please insert your password</Form.Control.Feedback>
              </Form.Group>
            </Card.Text>
          </Card.Body>
          <Button type="submit">Submit form</Button>
        </Card>
      </Form>
    );
  } else {
    return (
      <Form className="d-flex justify-content-center" noValidate validated={validated} onSubmit={handleSubmit}>
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
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  placeholder="Enter your name"
                />
                <Form.Control.Feedback type="invalid">Please insert your name</Form.Control.Feedback>
              </Form.Group>
            </Card.Text>
            <Card.Text>
              <Form.Group className="mb-3">
                <Form.Label>Job</Form.Label>
                <Form.Control
                  onChange={(e) => setJob(e.target.value)}
                  value={job}
                  required
                  placeholder="Enter your job"
                />
                <Form.Control.Feedback type="invalid">Please insert your current job</Form.Control.Feedback>
              </Form.Group>
            </Card.Text>
            <Card.Text>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Control.Feedback type="invalid">Please insert your email address</Form.Control.Feedback>
              </Form.Group>
            </Card.Text>
            <Card.Text>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  type="password"
                  placeholder="Choose a difficult password"
                />
                <Form.Control.Feedback type="invalid">Please insert your password</Form.Control.Feedback>
              </Form.Group>
            </Card.Text>
            <Card.Text>
              <Form.Group className="mb-3">
                <Form.Label>Password confirmation</Form.Label>
                <Form.Control
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  value={passwordConfirmation}
                  required
                  type="password"
                  placeholder="Confirm your password"
                />
                <Form.Control.Feedback type="invalid">Please confirm your password</Form.Control.Feedback>
              </Form.Group>
            </Card.Text>
          </Card.Body>
          <Button disabled={disableButton()} type="submit">
            {checkMatchingPasswords()}
          </Button>
        </Card>
      </Form>
    );
  }
};

export default SignInCard;
