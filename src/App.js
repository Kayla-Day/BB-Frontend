import { Switch, Route } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Home from "./components/Home";
import Account from "./components/Account";
import ProtectedRoutes from "./components/ProtectedRoutes";
// import NavigationBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>React Authentication Tutorial</h1>

          <section id="navigation">
            <a href="/">Home</a>
            <a href="/free">Free Component</a>
            <a href="/register">Register</a>
            <a href="/login">Login</a>
            <a href="/auth">Auth Component</a>
          </section>
        </Col>
      </Row>
      {/* <Row>
        <NavigationBar />
      </Row> */}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/free" component={Home} />
        <ProtectedRoutes path="/auth" component={Account} />
      </Switch>
    </Container>
  );
}

export default App;
