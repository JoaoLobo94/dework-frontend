import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import "./signInCard.css";

const SignInCard = () => {
  return (
    <div>
      <Form className="d-flex justify-content-center">
        <Card style={{ width: "30%" }}>
          <Card.Header>
            <Nav fill variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link href="#first">SignIn</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#link">SignUp</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
              </Form.Group>
            </Card.Text>
            <Card.Text>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Card.Text>
            <Button variant="primary">Submit</Button>
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
};

export default SignInCard;
