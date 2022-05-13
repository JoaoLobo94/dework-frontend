import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";

const CompanyContributionsTable = () => {
  const [contributions, setContributions] = useState([]);
  const [failed, setFailed] = useState(false);
  const credentials = useSelector((state) => state.credentials);
  const user = useSelector((state) => state.user);
  const company = useSelector((state) => state.company);
  const history = useNavigate();

  const auth = {
    headers: {
      "access-token": credentials.token,
      client: credentials.client,
      uid: user.uid,
    },
  };
  useEffect(() => {
    const contributions = async () => {
      if (auth.headers.client) {
        await axios
          .get(
            `${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/companies/${company.id}/contributions`,
            auth
          )
          .then((response) => setContributions(response.data))
          .catch(() => {
            setFailed(true)
          });
      }
    };
    contributions();
  }, [failed]);

  const viewContribution = (id) => {
	   history("/contributions/" + id)
  }
  return (
    <div>
      <h2 className="mt-3">Contributions</h2>
      <Table striped bordered responsive="xl">
        <thead>
          <tr>
            <th>Title</th>
            <th>Pull request</th>
            <th>Merged</th>
            <th>Work started</th>
            <th>Contribution creator</th>
            <th>Value for distribution</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contributions.map((contribution) => (
            <tr>
              <td>{contribution.title}</td>
	      <td>{contribution.pull_request}</td>
	      <td>{contribution.merged}</td>
	      <td>{contribution.accepted_for_start}</td>
	      <td>{contribution.creator}</td>
	      <td>{contribution.current_value} BTC</td>
	      <td><Nav.Link onClick={() => viewContribution(contribution.id)}>View</Nav.Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CompanyContributionsTable;
