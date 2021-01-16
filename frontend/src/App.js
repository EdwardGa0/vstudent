import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./home/home.js"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          {/* login page */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
