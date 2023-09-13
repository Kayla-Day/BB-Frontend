import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NavigationBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/free" component={Home} />
        <ProtectedRoutes path="/auth" component={Auth} />
      </Switch>
    </>
  );
}

export default App;
