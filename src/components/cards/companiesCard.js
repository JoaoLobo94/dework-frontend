import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCompany } from "../../store/actions/index";
import { useDispatch } from "react-redux";

const CompaniesCard = (props) => {
  const [allCompanies, setAllCompanies] = useState([]);
  const [allUserCompanies, setAllUserCompanies] = useState([]);
  const [failed, setFailed] = useState(false);
  const credentials = useSelector((state) => state.credentials);
  const user = useSelector((state) => state.user);
  const history = useNavigate();
  const dispatch = useDispatch();

  const auth = {
    headers: {
      "access-token": credentials.token,
      client: credentials.client,
      uid: user.uid,
    },
  };
  const setAndNavigateTo = (company) => {
    dispatch(setCompany(company));
    history("/companies/" + company["id"]);
  };
  useEffect(() => {
    const allCompanies = async () => {
      axios
        .all([
          axios.get(`${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/companies`),
          axios.get(`${process.env.REACT_APP_BACKEND_LOCATION}/${process.env.REACT_APP_API}/user_companies`, auth),
        ])
        .then(
          axios.spread((companies, user_companies) => {
            setAllCompanies(companies.data);
            setAllUserCompanies(user_companies.data);
          })
        ).catch(() => {
          setFailed(true)
        });
    };
    allCompanies();
  }, [failed]);
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Header>{props.type}</Card.Header>
        <ListGroup variant="flush">
          {props.type === "All companies" ? (
            allCompanies.map((company) => (
              <ListGroup.Item action key={company.id} onClick={() => setAndNavigateTo(company)}>
                {company["name"]}
              </ListGroup.Item>
            ))
          ) : allUserCompanies ? (
            allUserCompanies.map((company) => (
              <ListGroup.Item action key={company.id} onClick={() => setAndNavigateTo(company)}>
                {company["name"]}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>Nothing yet</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </div>
  );
};

export default CompaniesCard;
