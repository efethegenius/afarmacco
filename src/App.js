import "./App.css";
import "./Styles/Form.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
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
import { OpexPage } from "./Pages/OpexPage";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { SiteApp } from "./Website/SiteApp";
import { PolPage } from "./Pages/PolPage";
import { ReportsPage } from "./Pages/ReportsPage";
function App() {
  const [authState, setAuthState] = useState(false);
  const [activeNav, setActiveNav] = useState(false);
  const [upd, setUpd] = useState(true);
  const [opexTxn, setOpexTxn] = useState(false);
  const [capexTxn, setCapexTxn] = useState(false);
  const [expenseTxn, setExpenseTxn] = useState(false);
  const [deprTxn, setDeprTxn] = useState(false);
  const [signIn, setSignIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAuthState(true);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        activeNav,
        setActiveNav,
        upd,
        setUpd,
        opexTxn,
        setOpexTxn,
        capexTxn,
        setCapexTxn,
        expenseTxn,
        setExpenseTxn,
        deprTxn,
        setDeprTxn,
        signIn,
        setSignIn,
      }}
    >
      <Router>
        <Link
          to="/"
          className={opexTxn ? "opex-alert show-opex-alert" : "opex-alert"}
        >
          <p>
            Transaction created successfully. Click here to view your INVENTORY.
          </p>
        </Link>
        <Link
          to="/reports"
          className={expenseTxn ? "opex-alert show-opex-alert" : "opex-alert"}
        >
          <p>
            Transaction created successfully. Click here to view your Financial
            Reports.
          </p>
        </Link>
        <Link
          to="/capex"
          className={deprTxn ? "opex-alert show-opex-alert" : "opex-alert"}
        >
          <p>
            Depreciation calculated successfully. Click here to view your CAPEX
            page.
          </p>
        </Link>
        <div className={capexTxn ? "opex-alert show-opex-alert" : "opex-alert"}>
          <p>Transaction created successfully.</p>
        </div>
        <div className={signIn ? "opex-alert show-opex-alert" : "opex-alert"}>
          <p>Signed in successfully.</p>
        </div>
        <Switch>
          <Route exact path="/register">
            <SignUpPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            {authState ? <Dashboard /> : <SiteApp />}
          </Route>
          <Route exact path="/inventory">
            <Dashboard />
          </Route>
          <Route exact path="/income">
            <Income />
          </Route>
          <Route exact path="/expenses">
            <Expenses />
          </Route>
          <Route exact path="/pol">
            <PolPage />
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
          <Route exact path="/opex">
            <OpexPage />
          </Route>
          <Route exact path="/reports">
            <ReportsPage />
          </Route>
          <Route exact path="/site">
            <SiteApp />
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
