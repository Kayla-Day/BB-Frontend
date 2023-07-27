import { Switch, Route } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import "./App.css";
import Home from "./components/Home";
import Free from "./components/Free";
import Account from "./components/Account";
import ProtectedRoutes from "./ProtectedRoutes";
// import Register from "./components/Register";
// import Login from "./components/Login";
//add all other components
//add navbar

function App() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>React Authentication Tutorial</h1>

          <section id="navigation">
            <a href="/">Home</a>
            <a href="/free">Free Component</a>
            <a href="/auth">Account Component</a>
          </section>
        </Col>
      </Row>

      <Row>
        <Col className="text-center">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/free" component={Free} />
            <ProtectedRoutes path="/auth" component={Account} />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
