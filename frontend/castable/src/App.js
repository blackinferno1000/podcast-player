import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Podcast from "./components/Podcast";
import Profile from "./components/Profile";

function App() {
  return (
    <main className="App">
      <Router>
        <Navbar>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/:id">
              <Podcast />
            </Route>
          </Switch>
        </Navbar>
      </Router>
    </main>
  );
}

export default App;
