import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import "../Styles/Expense.css";
import { Expense } from "../Components/Expense";
import { BsFileEarmarkText } from "react-icons/bs";
import { Navbar } from "../Components/Navbar";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { AuthContext } from "../helpers/AuthContext";
import { AiOutlineMenu } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { LoggedOut } from "../Components/LoggedOut";
import { Link } from "react-router-dom";
import { ExpenseTable } from "../Components/Tables/ExpenseTable";

export const Expenses = () => {
  const [returnedExpenses, setReturnedExpenses] = useState([]);
  const [returnedActiveCreditors, setReturnedActiveCreditors] = useState([]);
  const [isExpenseForm, setIsExpenseForm] = useState(false);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);
  const [isNav, setIsNav] = useState(false);
  const [isFullReport, setIsFullReport] = useState(false);
  const [isDateFilter, setIsDateFilter] = useState(false);
  const [animState, setAnimState] = useState(true);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //getting the data from the database from the db-----------------------------------------
  const getAllExpenses = async () => {
    try {
      const allExpenses = await fetch("/api/all-expenses", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedExpenses(allExpenses);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllExpenses();
    getActiveCreditors();
  }, []);
  console.log(returnedExpenses);
  //getting the data from the database from the db end-----------------------------------------
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

  let allExpenses = returnedExpenses.name;

  const sortExpense =
    returnedExpenses.name && fromDate && toDate
      ? returnedExpenses.name.filter(
          (sortedExpense) =>
            sortedExpense.ExpenseDate >= fromDate &&
            sortedExpense.ExpenseDate <= toDate
        )
      : allExpenses;

  let activeCreditors;
  if (returnedActiveCreditors.name) {
    activeCreditors = returnedActiveCreditors.name.filter(
      (activeCreditor) =>
        activeCreditor.PurchaseType === "Expense" &&
        activeCreditor.Status === "UNPAID"
    );
  }

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  let totalCredit;
  if (returnedActiveCreditors.name) {
    totalCredit = activeCreditors.reduce((a, v) => (a = a + v.Amount), 0);
  }

  let miniExpenseList;
  if (returnedExpenses.name) {
    {
      miniExpenseList = returnedExpenses.name.map((expense) => {
        const { ExpenseId, ExpenseDate, HeadName, ExpenseName, Amount } =
          expense;
        const newDate = `${new Date(ExpenseDate).toLocaleDateString()}`;
        return (
          <tbody key={ExpenseId}>
            <tr>
              <td>{newDate}</td>
              <td>{ExpenseName}</td>
              <td>{HeadName}</td>
              <td>{Amount}</td>
            </tr>
          </tbody>
        );
      });
    }
  }

  return (
    <div className="expenses">
      <Navbar isNav={isNav} setIsNav={setIsNav} />

      <div
        className={`${isExpenseForm ? "form-background" : "hide-background"}`}
        onClick={() => {
          setAnimState(false);
          setTimeout(() => {
            setAnimState(true);
          }, 1000);
          setIsExpenseForm(false);
        }}
      ></div>

      <div
        className={`${isFullReport ? "form-background" : "hide-background"}`}
        onClick={() => {
          setIsFullReport(false);
        }}
      ></div>

      {authState ? (
        <div className="expense-container">
          <div className="expense-head">
            <AiOutlineMenu className="ham" onClick={() => setIsNav(!isNav)} />
            <div className="expense-heading">
              <h1>Expenses</h1>
            </div>
            <div
              className="new-btn"
              onClick={() => setIsExpenseForm(!isExpenseForm)}
            >
              <div className="plus-circle">
                <HiOutlinePlus />
              </div>
              <p>New</p>
            </div>
          </div>
          <div className="full-expense">
            <div className="all-expenses">
              <Expense
                isExpenseForm={isExpenseForm}
                setIsExpenseForm={setIsExpenseForm}
                getAllExpenses={getAllExpenses}
                animState={animState}
                setAnimState={setAnimState}
                getActiveCreditors={getActiveCreditors}
              />

              {/* Start of new-------------------------------------------------------------------------------------- */}
              {!isFullReport &&
                (miniExpenseList && miniExpenseList.length === 0 ? (
                  <div className="empty-main-report">
                    <h1>There are no Expense reports available yet</h1>
                    <p>
                      Create a new report by tapping the <span>NEW</span>{" "}
                      button...
                    </p>
                  </div>
                ) : miniExpenseList ? (
                  <div className="mini-list">
                    <div className="mini-list-container animate__animated animate__fadeIn">
                      <div className="all-mini-wrapper">
                        <div className="all-mini-list">
                          <div className="bird-mini-list">
                            <div className="mini-table">
                              <p className="title mini-title">
                                {miniExpenseList === 0
                                  ? "You do not have Expense report"
                                  : "Your most recent expenses:"}
                              </p>
                              <table>
                                <tbody>
                                  <tr>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Amount</th>
                                  </tr>
                                </tbody>
                                {returnedExpenses.name &&
                                  miniExpenseList.slice(0, 5)}
                              </table>
                            </div>
                            <button
                              className="view-report"
                              onClick={() => {
                                setIsFullReport(!isFullReport);
                              }}
                            >
                              View full report <BsFileEarmarkText />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="debtors">
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
                                  <p className="debt-amount">
                                    ₦ {formatMoney(Amount)}.00
                                  </p>
                                </Link>
                              );
                            })
                          ) : (
                            <p className="title">
                              You do not have any creditor yet. When you do,
                              they will appear here
                            </p>
                          )}
                        </div>
                        <div className="debtor-list">
                          <p className="title">TOTAL DEBT:</p>
                          <p className="debt-amount">
                            ₦ {formatMoney(totalCredit)}.00
                          </p>
                        </div>
                        {/* <button className="view-all">View All</button> */}
                      </div>
                    </div>
                  </div>
                ) : (
                  "Loading, please wait..."
                ))}
              {/* End of new-------------------------------------------------------------------------------------- */}

              {isFullReport && (
                <div className="full-report">
                  <div className="income-table-head">
                    <h3>Expenses</h3>
                  </div>
                  {<ExpenseTable ref={componentRef} />}
                  <button onClick={handlePrint} className="btn-generate">
                    Generate Report <BsFileEarmarkText className="report" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
