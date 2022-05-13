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


const SingleCompanyPage = (props) => {
  const [owner, setOwner] = useState({});
  const credentials = useSelector((state) => state.credentials);
  const user = useSelector((state) => state.user);
  const company = useSelector((state) => state.company);
  const [refresh, setRefresh] = useState(false)

  const auth = {
    headers: {
      "access-token": credentials.token,
      client: credentials.client,
      uid: user.uid,
    },
  };
  useEffect(() => {
    const ownerInfo = async () => {
      if (company.owner){
        await axios
          .get(`${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/users/${company.owner}`, auth)
          .then((response) => setOwner(response.data))
          .catch((err) => {
            setOwner({});
            setRefresh(true)
          });
    }};
    ownerInfo();
  }, [refresh]);
  return (
    <div>
      <NavBar type={"company"} />
      <Table striped bordered responsive="xl">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Public key</th>
            <th>Github page</th>
            <th>Owner's email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{company.id}</td>
            <td>{company.name}</td>
            <td>{company.pub_key}</td>
            <td>
              <a href={company.github}>Show</a>
            </td>
            <td>{owner.email}</td>
          </tr>
        </tbody>
      </Table>
      <Card className="justify-content-center">
        <Card.Header>Description</Card.Header>
        <Card.Body>{company.description}</Card.Body>
      </Card>
      <CompanyContributionsTable />
      <Container>
      <h2 className="mt-3">Create a new contribution</h2>
        <CreateContributionCard />
      </Container>
    </div>
  );
};

export default SingleCompanyPage;
