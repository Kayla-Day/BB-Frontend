import { Switch, Route } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Home from "./components/Home";
// import Account from "./components/Auth";
import Auth from "./components/Auth";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NavigationBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";
// import Deposit from "./components/Deposit";
// import Withdraw from "./components/Withdraw";

function App() {
  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <NavigationBar />
        </Col>
      </Row>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/free" component={Home} />
        {/* <Route path="/account" component={Account} /> */}
        {/* <Route path="/deposit" component={Deposit} />
        <Route path="/withdraw" component={Withdraw} /> */}
        <ProtectedRoutes path="/auth" component={Auth} />
      </Switch>
    </Container>
  );
}

export default App;
