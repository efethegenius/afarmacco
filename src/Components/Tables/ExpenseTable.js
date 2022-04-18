import React, { useState, useEffect } from "react";
import { Loading } from "../Loading";

export const ExpenseTable = React.forwardRef((props, ref) => {
  const [returnedExpenses, setReturnedExpenses] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [filter, setFilter] = useState("");
  const [birdFilter, setBirdFilter] = useState("");
  const [search, setSearch] = useState("");
  const [isDate, setIsDate] = useState(false);
  const [isPmt, setIsPmt] = useState(false);

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
  //getting the data from the database from the db end-----------------------------------------

  useEffect(() => {
    getAllExpenses();
  }, []);

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  let allExpenses = returnedExpenses.name;

  // const sortBirdSales =
  //   returnedBirdSales.name && search
  //     ? returnedBirdSales.name.filter(
  //         (sortedBird) =>
  //           sortedBird.Reference.toLowerCase() === search.toLowerCase() ||
  //           sortedBird.BirdName.toLowerCase() === search.toLowerCase()
  //       )
  //     : allBirdSales;
  const sortExpense =
    returnedExpenses.name && fromDate && toDate
      ? returnedExpenses.name.filter(
          (sortedExpense) =>
            sortedExpense.SalesDate <= toDate &&
            sortedExpense.SalesDate >= fromDate
        )
      : returnedExpenses.name && filter
      ? returnedExpenses.name.filter(
          (sortedExpense) => sortedExpense.PmtType === filter
        )
      : //  : returnedExpenses.name && birdFilter
        //  ? returnedExpenses.name.filter(
        //      (sortedExpense) => sortedExpense.BirdName === birdFilter
        //    )
        allExpenses;

  // calculating totals-----------------------------------------------------------------
  let totalAmount;
  if (returnedExpenses.name) {
    totalAmount = sortExpense.reduce((a, v) => (a = a + v.Amount), 0);
  }
  // calculating totals-----------------------------------------------------------------

  return (
    <>
      <div className="filter-container">
        Filter By:
        <button
          onClick={() => {
            setIsDate(!isDate);
            setIsPmt(false);
            setToDate("");
            setFromDate("");
            setFilter("");
          }}
        >
          Date
        </button>
        <button
          onClick={() => {
            setIsPmt(!isPmt);
            setIsDate(false);
            setToDate("");
            setFromDate("");
            setFilter("");
          }}
        >
          Payment method
        </button>
      </div>
      <div className="sort-report">
        {isDate && (
          <div className="sort-date">
            <label htmlFor="fromDate">From:</label>
            <input
              type="date"
              name="fromDate"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <label className="to" htmlFor="toDate">
              To:
            </label>
            <input
              type="datetime-local"
              name="toDate"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        )}
        {isPmt && (
          <div className="pmt-filter">
            <label htmlFor="filter">Payment Method:</label>
            <select
              name="filter"
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option></option>
              <option>Bank</option>
              <option>Credit</option>
              <option>Cash</option>
            </select>
          </div>
        )}
      </div>
      {sortExpense && sortExpense.length === 0 ? (
        <div className="empty-main-report">
          <h1> There are no Expense report available yet</h1>
          <p>
            Create a new report by tapping the <span>NEW</span> button...
          </p>
        </div>
      ) : sortExpense ? (
        <div className="table-container" ref={ref}>
          <table id="table-to-xls">
            <tbody className="table-head">
              <tr>
                <th>Date</th>
                <th>Invoice No</th>
                <th>Type</th>
                <th>Name</th>
                <th>Payment Type</th>
                <th>Bank</th>
                <th>Creditor</th>
                <th>Amount</th>
              </tr>
            </tbody>
            {returnedExpenses.name &&
              sortExpense.map((expense) => {
                const {
                  ExpenseId,
                  ExpenseDate,
                  InvoiceNo,
                  ExpenseName,
                  HeadName,
                  PmtType,
                  BankName,
                  SupplierName,
                  Amount,
                } = expense;
                const newDate = `${new Date(ExpenseDate).toLocaleDateString()}`;
                return (
                  <tbody key={ExpenseId}>
                    <tr>
                      <td>{newDate}</td>
                      <td>{InvoiceNo}</td>
                      <td>{ExpenseName}</td>
                      <td>{HeadName}</td>
                      <td>{PmtType}</td>
                      <td>{BankName}</td>
                      <td>{SupplierName}</td>
                      <td>{Amount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
});
