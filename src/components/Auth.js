import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
// import Deposit from "./components/Deposit";
// import Withdraw from "./components/Withdraw";

const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

export default function Auth() {
  // set an initial state for the message we will receive after the API call
  const [message, setMessage] = useState("");
  // const [email, setEmail] = useState("");
  // const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({});

  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "https://bb-backend-c41de0c4608d.herokuapp.com/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        setMessage(result.data.message);
        setUserData(result.data.user);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  const handleDeposit = (e) => {
    let email = userData.email;
    setAmount(deposit);
    // set configurations
    const configuration = {
      method: "post",
      url: "https://bb-backend-c41de0c4608d.herokuapp.com/deposit",
      data: {
        email,
        amount,
      },
    };
    // make the API call
    axios(configuration)
      .then((result) => {
        setMessage(result.data.message);
        setUserData(result.data.user);
        setDeposit(0);
      })
      .catch((error) => {
        error = new Error();
      })
      .then(() => {
        if (error) {
          setError(true);

          // prevent the form from refreshing the whole page
          e.preventDefault();
        }
      });
  };

  const handleWithdraw = (e) => {
    let email = userData.email;
    setAmount(withdraw);
    // set configurations
    const configuration = {
      method: "post",
      url: "https://bb-backend-c41de0c4608d.herokuapp.com/withdraw",
      data: {
        email,
        amount,
      },
    };
    // make the API call
    axios(configuration)
      .then((result) => {
        setMessage(result.data.message);
        setUserData(result.data.user);
        setWithdraw(0);
      })
      .catch((error) => {
        error = new Error();
      })
      .then(() => {
        if (error) {
          setError(true);

          // prevent the form from refreshing the whole page
          e.preventDefault();
        }
      });
  };

  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  };

  return (
    <>
      <Card className="text-center" style={{ width: "26rem" }}>
        <Card.Header as="h3">Account</Card.Header>
        <Card.Body>
          <Card.Title>{message}</Card.Title>

          <h4>Welcome back, {userData.email}</h4>
          <h6>Current Balance: {userData.balance}</h6>
          <Card.Text>
            <Row>
              <Col className="col-sm-6 mb-3 mb-sm-0">
                <Form.Group controlId="formBasicDeposit">
                  <Form.Label>Deposit</Form.Label>
                  <Form.Control
                    input="number"
                    type="deposit"
                    name="deposit"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                    placeholder="Enter Deposit"
                  />
                </Form.Group>
                {/* deposit button */}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => handleDeposit(e)}
                >
                  Deposit
                </Button>
              </Col>

              <Col className="col-sm-6">
                {/* Withdraw */}
                <Form.Group controlId="formBasicWithdraw">
                  <Form.Label>Withdraw</Form.Label>
                  <Form.Control
                    input="number"
                    type="withdraw"
                    name="withdraw"
                    value={withdraw}
                    onChange={(e) => setWithdraw(e.target.value)}
                    placeholder="Enter Withdrawal"
                  />
                </Form.Group>
                {/* withdraw button */}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => handleWithdraw(e)}
                >
                  Withdraw
                </Button>
              </Col>
              <Col className="mb-3 mb-sm-0">
                {/* logout */}
                <Button type="submit" variant="danger" onClick={() => logout()}>
                  Logout
                </Button>
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
