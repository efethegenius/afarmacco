import React, { useState, useEffect, useContext } from "react";
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

export const Expenses = () => {
  const [returnedExpenses, setReturnedExpenses] = useState([]);
  const [returnedActiveCreditors, setReturnedActiveCreditors] = useState([]);
  const [isExpenseForm, setIsExpenseForm] = useState(false);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);
  const [isNav, setIsNav] = useState(false);
  const [isDateFilter, setIsDateFilter] = useState(false);
  const [animState, setAnimState] = useState(true);

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
      (activeCreditor) => activeCreditor.PurchaseType === "Expense"
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

      {authState ? (
        <div className="expense-container">
          <div className="expense-head">
            <AiOutlineMenu className="ham" onClick={() => setIsNav(!isNav)} />
            <div className="expense-heading">
              <h1>Expenses</h1>
              {/* <p>Manage all your expenses here</p> */}
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
              <div className="expense-table-head">
                <h3>Your expenses report: </h3>
                <div className="sort-container">
                  {/* <div className="sort">
                  <p>Filter</p>
                  <IoIosArrowDown className="arrow-down" />
                </div> */}
                </div>
              </div>
              {/* <div className="sort-report">
                <div
                  className={`${
                    isDateFilter
                      ? "sort-date-container"
                      : "sort-date-container expense-date-container"
                  }`}
                >
                  <label htmlFor="fromDate">From</label>
                  <input
                    type="date"
                    name="fromDate"
                    id="fromDate"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                  <label htmlFor="fromDate">To</label>
                  <input
                    type="datetime-local"
                    name="toDate"
                    id="toDate"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
                <FaFilter
                  className="dateFilter"
                  onClick={() => setIsDateFilter(!isDateFilter)}
                />
              </div> */}
              {sortExpense && sortExpense.length === 0 ? (
                <div className="empty-main-report">
                  <h1>Oops! There are no Expense report available yet</h1>
                  <p>
                    Create a new report by tapping the <span>NEW</span>{" "}
                    button...
                  </p>
                </div>
              ) : sortExpense ? (
                <div className="table-container expense-table">
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
                      sortExpense.map((expense) => {
                        const {
                          ExpenseId,
                          ExpenseDate,
                          ExpenseName,
                          HeadName,
                          Amount,
                        } = expense;
                        const newDate = `${new Date(
                          ExpenseDate
                        ).toLocaleDateString()}`;
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
                      })}
                  </table>
                </div>
              ) : (
                "loading, please wait..."
              )}
            </div>
            <div className="suppliers expense-creditors">
              {!activeCreditors ? (
                <p>loading, please wait</p>
              ) : (
                <>
                  <p className="title">Active Creditors and amount</p>
                  <div className="debtor-list-container">
                    {activeCreditors && activeCreditors.length !== 0 ? (
                      activeCreditors.map((activeCreditor) => {
                        const { SupplierId, SupplierName, Amount } =
                          activeCreditor;
                        return (
                          <Link
                            to={`/creditor/${SupplierId}`}
                            key={SupplierId}
                            className="debtor-list"
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
                        You do not have any Expense creditor yet. When you do,
                        they will appear here...
                      </p>
                    )}
                  </div>
                  <div className="debtor-list">
                    <p className="title">TOTAL CREDIT:</p>
                    <p className="debt-amount">
                      ₦ {formatMoney(totalCredit)}.00
                    </p>
                  </div>
                </>
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

// if (returnedExpenses.name) {
//   allExpenses = sortedExpenses.map((expense) => {
//     const { ExpenseId, ExpenseDate, ExpenseName, HeadName, Amount } = expense;
//     return (
//       <tbody key={ExpenseId}>
//         <tr>
//           <td>{ExpenseDate}</td>
//           <td>{ExpenseName}</td>
//           <td>{HeadName}</td>
//           <td>{Amount}</td>
//         </tr>
//       </tbody>
//     );
//   });
// }
