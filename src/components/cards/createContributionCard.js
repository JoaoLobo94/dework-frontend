import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContribution } from "../../store/actions/index";
const CreateContributionCard = () => {
  const [title, setTitle] = useState("");
  const [pullRequest, setPullRequest] = useState("");
  const credentials = useSelector((state) => state.credentials);
  const user = useSelector((state) => state.user);
  const company = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const auth = {
    headers: {
      "access-token": credentials.token,
      client: credentials.client,
      uid: user.uid,
    },
  };
  const contributionParams = { title: title, pull_request: pullRequest };
  const history = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    axios
      .post(`${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/companies/${company.id}/contributions`, contributionParams, auth)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setContribution(res.data));
          history("/contributions/" + res.data["id"]);
        }
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          placeholder="Enter your contribution title"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pull request link</Form.Label>
        <Form.Control
          rows={3}
          onChange={(e) => setPullRequest(e.target.value)}
          value={pullRequest}
          required
          placeholder="Paste your full pull request link"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateContributionCard;
