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

export const DebtorsPage = () => {
  const [returnedActiveDebtors, setReturnedActiveDebtors] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const [isNav, setIsNav] = useState(false);
  const [isFullReport, setIsFullReport] = useState(false);
  const history = useHistory();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // getting active debtors start-----------------------------------------------------
  const getActiveDebtors = async () => {
    try {
      const activeDebtors = await fetch("/api/active-debtors", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedActiveDebtors(activeDebtors);
    } catch (error) {
      console.log(error);
    }
  };
  // getting active debtors end-----------------------------------------------------

  useEffect(() => {
    getActiveDebtors();
  }, []);

  //   let activeCreditors;
  //   if (returnedActiveCreditors.name) {
  //     activeCreditors = returnedActiveCreditors.name.filter(
  //       (activeCreditor) => activeCreditor.Status === "UNPAID"
  //     );
  //   }

  let activeDebtors;
  if (returnedActiveDebtors.name) {
    activeDebtors = returnedActiveDebtors.name.filter(
      (activeDebtor) => activeDebtor.Status === "UNPAID"
    );
  }

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };
  let totalDebt;
  if (returnedActiveDebtors.name) {
    totalDebt = activeDebtors.reduce((a, v) => (a = a + v.Amount), 0);
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
              <h1>All Debtors</h1>
            </div>
            <p> </p>
          </div>
          {returnedActiveDebtors.name ? (
            <div className="full-expense">
              <div className="debtors all-debtors">
                <p className="title">Active debtors and Amount</p>
                <div className="debtor-list-container animate__animated animate__fadeIn">
                  {activeDebtors && activeDebtors.length !== 0 ? (
                    activeDebtors.map((activeDebtor) => {
                      const { DebtorId, CustomerName, Amount } = activeDebtor;
                      return (
                        <Link
                          to={`/debtor/${DebtorId}`}
                          className="debtor-list"
                          key={DebtorId}
                        >
                          {/* <div key={CustomerId}> */}
                          <p className="d-name">{CustomerName}</p>
                          <p className="debt-amount">{Amount.toFixed(2)}</p>
                          {/* </div> */}
                        </Link>
                      );
                    })
                  ) : (
                    <p className="title">
                      You do not have any debtor yet. When you do, they will
                      appear here
                    </p>
                  )}
                </div>
                <div className="debtor-list">
                  <p className="title">TOTAL DEBT:</p>
                  <p className="debt-amount">{totalDebt.toFixed(2)}</p>
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
