import { Card } from "react-bootstrap";
import NavBar from "../../components/nav/navBar";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./singleCompaniesPage.css";
import CompanyContributionsTable from "../../components/table/companyContributionsTable";
import Container from "react-bootstrap/Container";
import CreateContributionCard from "../../components/cards/createContributionCard";

const SingleCompanyPage = () => {
  const [owner, setOwner] = useState({});
  const credentials = useSelector((state) => state.credentials);
  const user = useSelector((state) => state.user);
  const company = useSelector((state) => state.company);
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
        .get(`${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/users/${company.owner}`, auth)
        .then((response) => setOwner(response.data))
        .catch(() => {
          setOwner({});
          setRefresh(true);
        });
    };
    ownerInfo();
  }, [refresh]);
  return (
    <div>
      <NavBar type={"company"} />
      <Container>
        <Card className="justify-content-center mb-3 mt-3">
          <Card.Header>
            <h1>{company.name}</h1>
          </Card.Header>
        </Card>
        <Table striped bordered responsive="xl" className="mt-3">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Public key</th>
              <th>Github page</th>
              <th>Owner's email</th>
              <th>Owner's telegram</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>{company.wallet}</td>
              <td>
                <a href={company.github}>Show</a>
              </td>
              <td>{owner.email}</td>
              <td>{owner.telegram}</td>
            </tr>
          </tbody>
        </Table>
        <Card className="justify-content-center mb-3 mt-3">
          <Card.Header>Tip: Contact company owner via telegram or email to discuss issues</Card.Header>
        </Card>
        <Card className="justify-content-center mb-3 mt-3">
          <Card.Header>Description</Card.Header>
          <Card.Body>{company.description}</Card.Body>
        </Card>
        <Card className="justify-content-center mb-3 mt-3">
          <Card.Header>
            <h2 className="mt-3">Create a new contribution</h2>
          </Card.Header>
          <Card.Body>
            <CreateContributionCard />
          </Card.Body>
        </Card>
        <CompanyContributionsTable />
      </Container>
    </div>
  );
};

export default SingleCompanyPage;
