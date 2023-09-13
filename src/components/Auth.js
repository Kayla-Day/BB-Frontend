import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

export default function Auth() {
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({});
  const [balance, setBalance] = useState(0);

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
        setBalance(result.data.user.balance);
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
        setBalance(result.data.user.balance);
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
      <Card
        className="text-center"
        border="dark"
        style={{ width: "auto" }}
        bg={"secondary"}
        text={"light"}
      >
        <Card.Header as="h3">Account</Card.Header>
        <Card.Body>
          <Card.Title>{message}</Card.Title>

          <h4>Welcome back, {userData.email}</h4>
          <h6>Current Balance: {userData.balance}</h6>
          <h5>Current Balance: {balance}</h5>

          <Card.Text>
            <Row>
              {/*//////////////*/}
              {/* deposit form */}
              {/*//////////////*/}
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
                <br />
                {/*////////////////*/}
                {/* deposit button */}
                {/*////////////////*/}
                <Button
                  variant="info"
                  type="submit"
                  onClick={(e) => handleDeposit(e)}
                >
                  Deposit
                </Button>
              </Col>
              {/*///////////////*/}
              {/* withdraw form */}
              {/*///////////////*/}
              <Col className="col-sm-6">
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
                <br />
                {/*/////////////////*/}
                {/* withdraw button */}
                {/*/////////////////*/}
                <Button
                  variant="info"
                  type="submit"
                  onClick={(e) => handleWithdraw(e)}
                >
                  Withdraw
                </Button>
              </Col>
              <Col className="mb-3 mb-sm-0">
                <br />
                {/*////////*/}
                {/* logout */}
                {/*////////*/}
                <Button
                  type="submit"
                  block
                  style={{
                    backgroundColor: "#f96986",
                    borderColor: "#f96986",
                    color: "black",
                  }}
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
        {/*//////////////////////////*/}
        {/* Footer with link buttons */}
        {/*//////////////////////////*/}
        <Card.Footer className="footer">
          Connect with Developer
          <br />
          <br />
          <div class="row">
            <div class="col d-flex justify-content-center mb-3">
              <div class="connectButtons">
                <div class="btn1">
                  <a
                    class="btn btn-secondary"
                    href="https://github.com/Kayla-Day/Kayla-Day"
                    role="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-github"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </a>
                </div>
                <div class="btn2">
                  <a
                    class="btn btn-secondary"
                    href="https://www.linkedin.com/in/-kayla/"
                    role="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-linkedin"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                  </a>
                </div>
                <div class="btn3">
                  <a
                    class="btn btn-secondary"
                    href="mailto:kayladayguimont@gmail.com"
                    role="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-envelope"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </>
  );
}
