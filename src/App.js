import "./App.css";
import "./Styles/Form.css";
import "./Styles/Table.css";
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
import { Landing } from "./Pages/Landing";
import { CreditorsPage } from "./Pages/CreditorsPage";
import { DebtorsPage } from "./Pages/DebtorsPage";
import { OtherIncomePage } from "./Pages/OtherIncomePage";
import { ComingSoon } from "./Pages/ComingSoon";
import { NewFarmHand } from "./Pages/NewFarmHand";
import { FarmHands } from "./Pages/FarmHands";
import { FarmHand } from "./Pages/FarmHand";
import { ChickenTrade } from "./Pages/ChickenTrade";
import { DocSales } from "./Pages/DocSales";
import { SupplyPipeline } from "./Pages/SupplyPipeline";
import { FeedMart } from "./Pages/FeedMart";
import { DrugMart } from "./Pages/DrugMart";
import { Multivitamins } from "./Pages/Multivitamins";
import { Antibiotics } from "./Pages/Antibiotics";
import { Anticoccidiosis } from "./Pages/Anticoccidiosis";
import { Antiviral } from "./Pages/Antiviral";
import { Vaccines } from "./Pages/Vaccines";
import { Lasota } from "./Pages/Lasota";
import { Gumboro } from "./Pages/Gumboro";
import { Deworm } from "./Pages/Deworm";
import { Coryza } from "./Pages/Coryza";
import { Farmgate } from "./Pages/Farmgate";
import { EggSalePage } from "./Pages/EggSalePage";
import { SalesPage } from "./Pages/SalesPage";
import { FrozenChickenPage } from "./Pages/FrozenChickenPage";
import { FinancialReport } from "./Pages/FinancialReport";
import { PricingTemplate } from "./Pages/PricingTemplate";
import { FarmgateEggs } from "./Pages/FarmgateEggs";
import { Capital } from "./Pages/Capital";
import { CashBook } from "./Pages/CashBook";
import Countdown from "react-countdown";
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
    // <Countdown date={1657446668958 + 2073600000} className="countdown">
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
          to="/inventory"
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
            {authState ? <Landing /> : <SiteApp />}
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
          <Route exact path="/egg-sale">
            <EggSalePage />
          </Route>
          <Route exact path="/sales-page">
            <SalesPage />
          </Route>
          <Route exact path="/frozen-chickens">
            <FrozenChickenPage />
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
          <Route exact path="/creditors">
            <CreditorsPage />
          </Route>
          <Route exact path="/debtors">
            <DebtorsPage />
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
          <Route exact path="/coming-soon">
            <ComingSoon />
          </Route>
          <Route exact path="/chicken-trade">
            <ChickenTrade />
          </Route>
          <Route exact path="/doc-sales">
            <DocSales />
          </Route>
          <Route exact path="/supply-pipeline">
            <SupplyPipeline />
          </Route>
          <Route exact path="/other-income">
            <OtherIncomePage />
          </Route>
          <Route exact path="/new-farm-hand">
            <NewFarmHand />
          </Route>
          <Route exact path="/farm-hands">
            <FarmHands />
          </Route>
          <Route exact path="/feed-mart">
            <FeedMart />
          </Route>
          <Route exact path="/drug-mart">
            <DrugMart />
          </Route>
          <Route exact path="/multivitamins">
            <Multivitamins />
          </Route>
          <Route exact path="/antibiotics">
            <Antibiotics />
          </Route>
          <Route exact path="/anticoccidiosis">
            <Anticoccidiosis />
          </Route>
          <Route exact path="/antiviral">
            <Antiviral />
          </Route>
          <Route exact path="/vaccines">
            <Vaccines />
          </Route>
          <Route exact path="/lasota">
            <Lasota />
          </Route>
          <Route exact path="/gumboro">
            <Gumboro />
          </Route>
          <Route exact path="/deworm">
            <Deworm />
          </Route>
          <Route exact path="/coryza">
            <Coryza />
          </Route>
          <Route exact path="/farmgate">
            <Farmgate />
          </Route>
          <Route exact path="/farmgate-eggs">
            <FarmgateEggs />
          </Route>
          <Route exact path="/financial-report">
            <FinancialReport />
          </Route>
          <Route exact path="/pricing-template">
            <PricingTemplate />
          </Route>
          <Route exact path="/capital">
            <Capital />
          </Route>
          <Route exact path="/cash-book">
            <CashBook />
          </Route>
          <Route exact path="/site">
            <SiteApp />
          </Route>
          <Route path="/creditor/:id" children={<Creditor />}></Route>
          <Route path="/debtor/:id" children={<Debtor />}></Route>
          <Route path="/farm-hand/:id" children={<FarmHand />}></Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
    // </Countdown>
  );
}

export default App;
