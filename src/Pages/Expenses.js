import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import "../Styles/Expense.css";
import { Expense } from "../Components/Expense";
import { BsFileEarmarkText } from "react-icons/bs";
import { Navbar } from "../Components/Navbar";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { AuthContext } from "../helpers/AuthContext";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { LoggedOut } from "../Components/LoggedOut";
import { Link } from "react-router-dom";
import { ExpenseTable } from "../Components/Tables/ExpenseTable";
import { Loading } from "../Components/Loading";

export const Expenses = () => {
  const [returnedExpenses, setReturnedExpenses] = useState([]);
  const [returnedDeprDate, setReturnedDeprDate] = useState([]);
  const [returnedActiveCreditors, setReturnedActiveCreditors] = useState([]);
  const [isExpenseForm, setIsExpenseForm] = useState(false);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);
  const [isNav, setIsNav] = useState(false);
  const [isFullReport, setIsFullReport] = useState(false);
  const [isDateFilter, setIsDateFilter] = useState(false);
  const [animState, setAnimState] = useState(true);
  const [isDeprMsg, setIsDeprMsg] = useState(false);

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
    getDeprDate();
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
  //getting depr date-----------------------------------------
  const getDeprDate = async () => {
    try {
      const deprDate = await fetch("/api/depr-date", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedDeprDate(deprDate);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(returnedDeprDate);
  //getting depr date-----------------------------------------

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
    <div
      className="expenses"
      onClick={() => {
        if (isDeprMsg) {
          setIsDeprMsg(false);
        }
      }}
    >
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
                              View full report
                            </button>
                          </div>
                        </div>
                        {returnedDeprDate.name &&
                        returnedDeprDate.name.length > 0 ? (
                          returnedDeprDate.name.map((deprDate) => {
                            const { LastDeprDate } = deprDate;
                            let NextDeprDate = new Date(LastDeprDate);
                            NextDeprDate.setMonth(NextDeprDate.getMonth() + 1);
                            console.log(NextDeprDate);
                            const newDate = `${new Date(
                              LastDeprDate
                            ).toDateString()}`;
                            return (
                              <div key={LastDeprDate}>
                                <p>Last depreciation was run on {newDate}</p>
                                <p>
                                  Next depreciation to be run on{" "}
                                  {NextDeprDate.toDateString()}{" "}
                                  <AiOutlineQuestionCircle
                                    className="depr-help"
                                    onClick={() => {
                                      setIsDeprMsg(!isDeprMsg);
                                    }}
                                  />
                                </p>
                              </div>
                            );
                          })
                        ) : (
                          <p>
                            Depreciation not calculated yet.{" "}
                            <AiOutlineQuestionCircle
                              className="depr-help"
                              onClick={() => {
                                setIsDeprMsg(!isDeprMsg);
                              }}
                            />
                          </p>
                        )}
                        {isDeprMsg && (
                          <div className="depr-msg-container">
                            <p>
                              Depreciation of assets are done on a monthly
                              basis. At the end of each month, you are expected
                              to perform depreciation to calculate the current
                              value of your assets. The depreciation would
                              automatically run for ALL assets that are due for
                              depreciation so you do not have to manually
                              depreciate each asset. To perform depreciation,
                              click on the NEW button and select DEPRECIATION
                              under the Expense drop-down.
                            </p>
                          </div>
                        )}
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
                                    {formatMoney(Amount)}.00
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
                            {formatMoney(totalCredit)}.00
                          </p>
                        </div>
                        {/* <button className="view-all">View All</button> */}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Loading />
                ))}
              {/* End of new-------------------------------------------------------------------------------------- */}

              {isFullReport && (
                <div className="full-report">
                  <div className="income-table-head">
                    <h3>Expenses</h3>
                    <AiOutlineClose
                      className="btn-close"
                      onClick={() => setIsFullReport(false)}
                    />
                  </div>
                  {<ExpenseTable ref={componentRef} />}
                  <div className="btn-generate-container">
                    <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="download-table-xls-button btn-generate"
                      table="table-to-xls"
                      filename="Afarmacco-Expenses"
                      sheet="Expenses"
                      buttonText="Download as Excel"
                    />
                    <button onClick={handlePrint} className="btn-generate">
                      Generate Report <BsFileEarmarkText className="report" />
                    </button>
                  </div>
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
