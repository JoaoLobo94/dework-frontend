import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CompaniesCard = (props) => {
  const [allCompanies, setAllCompanies] = useState([]);
  const [allUserCompanies, setAllUserCompanies] = useState([]);
  const credentials = useSelector((state) => state.credentials);
  const user = useSelector((state) => state.user);

  const auth = {
    headers: {
      "access-token": credentials.token,
      client: credentials.client,
      uid: user.uid,
    },
  };

  useEffect(() => {
    const allCompanies = async () => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/companies`)
        .then((response) => setAllCompanies(response.data));
    };
    allCompanies();
  }, []);
  useEffect(() => {
    const allUserCompanies = async () => {
      if (auth.headers.client) {
        await axios
          .get(`${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/user_companies`, auth)
          .then((response) => setAllUserCompanies(response.data))
          .catch((err) => {
            setAllUserCompanies(null);
          });
      }
    };
    allUserCompanies();
  }, []);
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Header>{props.type}</Card.Header>
        <ListGroup variant="flush">
          {props.type === "All companies" ? (
            allCompanies.map((company) => (
              <ListGroup.Item action href={"/companies/" + company["id"]}>
                {company["name"]}
              </ListGroup.Item>
            ))
          ) : allUserCompanies ? (
            allCompanies.map((company) => (
              <ListGroup.Item action href={"/companies/" + company["id"]}>
                {company["name"]}
              </ListGroup.Item>
            ))
          )
           : (
            <ListGroup.Item>Nothing yet</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </div>
  );
};

export default CompaniesCard;
