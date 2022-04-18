import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import "../Styles/Expense.css";
import { Navbar } from "../Components/Navbar";
import { AuthContext } from "../helpers/AuthContext";
import { AiOutlineMenu, AiOutlineLeft } from "react-icons/ai";
import { LoggedOut } from "../Components/LoggedOut";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Loading } from "../Components/Loading";

export const CreditorsPage = () => {
  const [returnedActiveCreditors, setReturnedActiveCreditors] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const history = useHistory();
  const [isNav, setIsNav] = useState(false);
  const [isFullReport, setIsFullReport] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // getting active creditors start-----------------------------------------------------
  const getActiveCreditors = async () => {
    try {
      const activeCreditors = await fetch("/api/active-creditors", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedActiveCreditors(activeCreditors);
    } catch (error) {
      console.log(error);
    }
  };
  // getting active creditors end-----------------------------------------------------

  useEffect(() => {
    getActiveCreditors();
  }, []);

  let activeCreditors;
  if (returnedActiveCreditors.name) {
    activeCreditors = returnedActiveCreditors.name.filter(
      (activeCreditor) => activeCreditor.Status === "UNPAID"
    );
  }

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  let totalCredit;
  if (returnedActiveCreditors.name) {
    totalCredit = activeCreditors.reduce((a, v) => (a = a + v.Amount), 0);
  }

  return (
    <div className="expenses">
      {/* <Navbar isNav={isNav} setIsNav={setIsNav} /> */}
      <div
        className={`${isFullReport ? "form-background" : "hide-background"}`}
        onClick={() => {
          setIsFullReport(false);
        }}
      ></div>

      {authState ? (
        <div className="expense-container">
          <div className="expense-head">
            <button className="back-btn" onClick={() => history.goBack()}>
              <AiOutlineLeft /> Go back
            </button>
            <div className="expense-heading">
              <h1>All Creditors</h1>
            </div>
            <p> </p>
          </div>
          {returnedActiveCreditors.name ? (
            <div className="full-expense">
              <div className="debtors all-creditors">
                <p className="title">Active Creditors and Amount</p>
                <div className="debtor-list-container animate__animated animate__fadeIn">
                  {activeCreditors && activeCreditors.length !== 0 ? (
                    activeCreditors.map((activeCreditor) => {
                      const { CreditorId, SupplierName, Amount } =
                        activeCreditor;
                      return (
                        <Link
                          to={`/creditor/${CreditorId}`}
                          className="debtor-list"
                          key={CreditorId}
                        >
                          <p className="d-name">{SupplierName}</p>
                          <p className="debt-amount">{Amount.toFixed(2)}</p>
                        </Link>
                      );
                    })
                  ) : (
                    <p className="title">
                      You do not have any creditor yet. When you do, they will
                      appear here
                    </p>
                  )}
                </div>
                <div className="debtor-list">
                  <p className="title">TOTAL DEBT:</p>
                  <p className="debt-amount">{totalCredit.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
