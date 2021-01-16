import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./home/home.js";
import Room from "./call/room.js";
import config from "./config";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">{/* login page */}</Route>
        {/* temporary path */}
        <Route path="/room">
          <Room
            apiKey={config.API_KEY}
            sessionId={config.SESSION_ID}
            token={config.TOKEN}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
