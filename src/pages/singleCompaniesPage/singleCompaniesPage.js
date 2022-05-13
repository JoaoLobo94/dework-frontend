import { Card, Col, Container, Row } from "react-bootstrap";
import NavBar from "../../components/nav/navBar";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./singleCompaniesPage.css";
import CompanyContributionsTable from "../../components/table/companyContibutionsTable";

const SingleCompanyPage = () => {
  const [owner, setOwner] = useState({});
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
  useEffect(() => {
    const ownerInfo = async () => {
      if (auth.headers.client) {
        await axios
          .get(`${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/users/${company.owner}`, auth)
          .then((response) =>setOwner(response.data) )
          .catch((err) => {
            setOwner({});
          });
      }
    };
    ownerInfo();
  }, []);
  return (
    <div>
      <NavBar type={"company"} />
      <Container></Container>
      <Row></Row>
      <Col></Col>
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
            <td><a href={company.github}>Show</a></td>
            <td>{owner.email}</td>
          </tr>
        </tbody>
      </Table>
      <Card className="justify-content-center">
        <Card.Header>Description</Card.Header>
        <Card.Body>
          {company.description}
        </Card.Body>
      </Card>
      <CompanyContributionsTable />
      {/* create contribution */}
    </div>
  );
};

export default SingleCompanyPage;
