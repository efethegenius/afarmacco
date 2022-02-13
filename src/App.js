import "./App.css";
import "./Styles/Form.css";
import { UserLogin } from "./Components/UserLogin";
import { UserValidation } from "./Components/UserValidation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Income } from "./Pages/Income";
import { Expenses } from "./Pages/Expenses";
import { DocPage } from "./Pages/DocPage";
import { CapexPage } from "./Pages/CapexPage";
import { Debtor } from "./Pages/Debtor";
import { Dashboard } from "./Pages/Dashboard";
import { Error } from "./Pages/Error";
import { DrugPage } from "./Pages/DrugPage";
import { FeedPage } from "./Pages/FeedPage";
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";
import { SignUpPage } from "./Pages/SignUpPage";
import { LoginPage } from "./Pages/LoginPage";
import { Creditor } from "./Pages/Creditor";
import { Health } from "./Pages/Health";
function App() {
  const [authState, setAuthState] = useState(false);
  const [activeNav, setActiveNav] = useState(false);
  const [upd, setUpd] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAuthState(true);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ authState, setAuthState, activeNav, setActiveNav, upd, setUpd }}
    >
      <Router>
        <Switch>
          <Route exact path="/register">
            <SignUpPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/income">
            <Income />
          </Route>
          <Route exact path="/expenses">
            <Expenses />
          </Route>
          <Route exact path="/doc">
            <DocPage />
          </Route>
          <Route exact path="/drug">
            <DrugPage />
          </Route>
          <Route exact path="/feed">
            <FeedPage />
          </Route>
          <Route exact path="/health">
            <Health />
          </Route>
          <Route exact path="/capex">
            <CapexPage />
          </Route>
          <Route path="/creditor/:id" children={<Creditor />}></Route>
          <Route path="/debtor/:id" children={<Debtor />}></Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
