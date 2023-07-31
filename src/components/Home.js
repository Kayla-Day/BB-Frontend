import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Col, Button, Row } from "react-bootstrap";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "https://bb-backend-c41de0c4608d.herokuapp.com/free-endpoint",
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  return (
    <Card className="text-center" style={{ width: "26rem" }}>
      <Card.Header as="h3">Welcome to Bad Bank</Card.Header>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>
          Navigate using the links above
          <br />
          or the buttons below!
          <h6>{message}</h6>
        </Card.Title>
        <Row>
          <Col sm={6} mb={3} mb-sm={0}>
            <Card.Text>Don't have an account? Register Now!</Card.Text>

            <Button variant="primary" href="/register">
              Register
            </Button>
          </Col>

          <Col sm={6}>
            <Card.Text>Already a member? Login to your account! </Card.Text>
            <Button variant="primary" href="/login">
              Login
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
