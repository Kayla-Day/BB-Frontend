import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

export default function Account() {
  const [userData, setUserData] = useState({ email: " ", balance: 0 });
  // const [balance, setBalance] = useState({ balance: 0 });
  // const [email, setEmail] = useState({ email: "" });
  // const [depositAmount, setDepositAmount] = useState(0);
  // const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [message, setMessage] = useState("");
  // State to hold the deposit and withdraw amount

  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // State to hold the updated balance after deposit or withdraw
  const [newBalance, setNewBalance] = useState(0);

  useEffect(() => {
    //Fetch authenticated user's data from the backend
    const configuration = {
      method: "get",
      url: "https://bb-backend-c41de0c4608d.herokuapp.com/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configuration)
      .then((response) => {
        setUserData(response.data);
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Function to handle deposit
  const handleDeposit = () => {
    const configuration = {
      method: "post",
      url: "https://bb-backend-c41de0c4608d.herokuapp.com/deposit",
      data: {
        amount: depositAmount,
      },
    };

    axios(configuration)
      .then((response) => {
        setNewBalance(response.data.newBalance);
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to handle withdraw
  const handleWithdraw = () => {
    const configuration = {
      method: "post",
      url: "https://bb-backend-c41de0c4608d.herokuapp.com/withdraw",
      data: {
        amount: withdrawAmount,
      },
    };
    axios(configuration)
      .then((response) => {
        setNewBalance(response.data.newBalance);
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Welcome {userData.email}</h2>
      <h3>Balance: ${userData.balance}</h3>
      {message && <h4>{message}</h4>}
      <div>
        <h3>Deposit</h3>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>

      <div>
        <h3>Withdraw</h3>
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <button onClick={handleWithdraw}>Withdraw</button>
        {/* Display Updated Balance */}
        <p>New Balance: {newBalance}</p>
      </div>
    </div>
  );
}

// // AccountInfo.js
// import React, { useEffect, useState } from "react";
// import { Card, Form, Row, Col, Button } from "react-bootstrap";
// import axios from "axios";
// import Cookies from "universal-cookie";
// const cookies = new Cookies();

// // get token generated on login
// const token = cookies.get("TOKEN");

// export default function Account() {
//   const [userData, setUserData] = useState([]);
//   const [message, setMessage] = useState("");
//   const [email, setEmail] = useState("");
//   const [balance, setBalance] = useState(0);
//   const [amount, setAmount] = useState(0);
//   const [deposit, setDeposit] = useState(0);
//   const [withdraw, setWithdraw] = useState(0);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     // Fetch data from the backend API
//     // fetch('/api/users')
//     //   .then((response) => response.json())
//     //   .then((data) => setUserData(data))
//     //   .catch((error) => console.error('Error fetching data:', error));
//     const configuration = {
//       method: "get",
//       url: "https://bb-backend-c41de0c4608d.herokuapp.com/api/users",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     axios(configuration)
//       .then((result) => result.json())
//       .then((data) => setUserData(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   const handleDeposit = (e) => {
//     setAmount(deposit);
//     // set configurations
//     const configuration = {
//       method: "post",
//       url: "https://bb-backend-c41de0c4608d.herokuapp.com/deposit",
//       data: {
//         email,
//         amount,
//       },
//     };
//     // make the API call
//     axios(configuration)
//       .then((result) => {
//         setMessage(result.data.message);
//         setBalance(result.data.balance);
//       })
//       .catch((error) => {
//         error = new Error();
//       })
//       .then(() => {
//         if (error) {
//           setError(true);

//           // prevent the form from refreshing the whole page
//           e.preventDefault();
//         }
//       });
//   };

//   const handleWithdraw = (e) => {
//     setAmount(withdraw);
//     // set configurations
//     const configuration = {
//       method: "post",
//       url: "https://bb-backend-c41de0c4608d.herokuapp.com/withdraw",
//       data: {
//         email,
//         amount,
//       },
//     };
//     // make the API call
//     axios(configuration)
//       .then((result) => {
//         setMessage(result.data.message);
//         setBalance(result.data.balance);
//       })
//       .catch((error) => {
//         error = new Error();
//       })
//       .then(() => {
//         if (error) {
//           setError(true);

//           // prevent the form from refreshing the whole page
//           e.preventDefault();
//         }
//       });
//   };

//   // logout
//   const logout = () => {
//     // destroy the cookie
//     cookies.remove("TOKEN", { path: "/" });
//     // redirect user to the landing page
//     window.location.href = "/";
//   };

//   return (
//     <Card className="text-center" style={{ width: "26rem" }}>
//       <Card.Header as="h3">Account Information</Card.Header>
//       <Card.Body>
//         <Card.Title>Complete transactions below</Card.Title>
//         <Card.Text>
//           <ul>
//             {userData.map((user) => (
//               <li key={user._id}>
//                 <strong>Email:</strong> {user.email} | <strong>Balance:</strong>{" "}
//                 {user.balance}
//               </li>
//             ))}
//           </ul>
//           {message}
//           <Row>
//             <Col className="col-sm-6 mb-3 mb-sm-0">
//               <Form.Group controlId="formBasicDeposit">
//                 <Form.Label>Deposit</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="deposit"
//                   value={deposit}
//                   onChange={(e) => setDeposit(e.target.value)}
//                   placeholder="Enter amount to deposit"
//                 />
//               </Form.Group>

//               {/* deposit button */}
//               <Button
//                 variant="primary"
//                 type="submit"
//                 onClick={(e) => handleDeposit(e)}
//               >
//                 Deposit
//               </Button>
//             </Col>

//             <Col className="col-sm-6">
//               <Form.Group controlId="formBasicWithdraw">
//                 <Form.Label>Withdraw</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="withdraw"
//                   value={withdraw}
//                   onChange={(e) => setWithdraw(e.target.value)}
//                   placeholder="Enter amount to withdraw"
//                 />
//               </Form.Group>

//               {/* withdraw button */}
//               <Button
//                 variant="primary"
//                 type="submit"
//                 onClick={(e) => handleWithdraw(e)}
//               >
//                 Withdraw
//               </Button>
//             </Col>
//             <Col className="mb-3 mb-sm-0">
//               {/* logout */}
//               <Button type="submit" variant="primary" onClick={() => logout()}>
//                 Logout
//               </Button>
//             </Col>
//           </Row>
//         </Card.Text>
//       </Card.Body>
//     </Card>

// <div>
//   <h2>Account Information</h2>
//   <ul>
//     {userData.map((user) => (
//       <li key={user._id}>
//         <strong>Email:</strong> {user.email} | <strong>Balance:</strong> {user.balance}
//       </li>
//     ))}
//   </ul>
// </div>
//   );
// }
