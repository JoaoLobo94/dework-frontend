import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCompaniesCard = () => {
  const [github, setGithub] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const credentials = useSelector((state) => state.credentials);
  const user = useSelector((state) => state.user);
  const auth = {
    headers: {
      "access-token": credentials.token,
      client: credentials.client,
      uid: user.uid,
    },
  };
  const companyParams = { name: name, description: description, github: github };
  const history = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    axios
      .post(`${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/companies`, companyParams, auth)
      .then((res) => {
        if (res.status === 200) {
	  history("/companies/" + res.data["id"])
        }
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
          placeholder="Enter your company name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Github link</Form.Label>
        <Form.Control
          onChange={(e) => setGithub(e.target.value)}
          value={github}
          placeholder="Enter your company github repository link"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Enter a description about your company"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateCompaniesCard;
