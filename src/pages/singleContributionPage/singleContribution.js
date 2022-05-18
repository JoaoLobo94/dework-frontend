import NavBar from "../../components/nav/navBar";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import { Card } from "react-bootstrap";

const SingleContribution = () => {
  const [owner, setOwner] = useState({});
  const contribution = useSelector((state) => state.contribution);
  const credentials = useSelector((state) => state.credentials);
  const user = useSelector((state) => state.user);
  const [refresh, setRefresh] = useState(false);

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
  const viewContribution = (contribution) => {};
  return (
    <div>
      <NavBar type={"contribution"} />
      <Table striped bordered responsive="xl">
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
            <td>{contribution.current_value ?  contribution.current_value : 0} BTC</td>
            <td>
              <Nav.Link onClick={() => viewContribution(contribution)}>View</Nav.Link>
            </td>
          </tr>
        </tbody>
      </Table>
      <Card className="justify-content-center mb-3 mt-3">
        <Card.Header>Description</Card.Header>
        <Card.Body>{contribution.description}</Card.Body>
      </Card>
    </div>
  );
};

export default SingleContribution;
