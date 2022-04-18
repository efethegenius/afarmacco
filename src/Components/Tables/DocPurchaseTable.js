import React, { useState, useEffect } from "react";
import { Loading } from "../Loading";

export const DocPurchaseTable = React.forwardRef((props, ref) => {
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [filter, setFilter] = useState("");
  const [birdFilter, setBirdFilter] = useState("");
  const [returnedDocPurchase, setReturnedDocPurchase] = useState([]);
  const [isDate, setIsDate] = useState(false);
  const [isPmt, setIsPmt] = useState(false);
  const [isBirdFilter, setIsBirdFilter] = useState(false);

  // getting doc purchase start-----------------------------------------------------
  const getAllDocPurchase = async () => {
    try {
      const allDocPurchase = await fetch("/api/all-doc-purchase", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedDocPurchase(allDocPurchase);
    } catch (error) {
      console.log(error);
    }
  };
  // getting doc purchase end-----------------------------------------------------

  useEffect(() => {
    getAllDocPurchase();
  }, []);

  let allDocPurchase = returnedDocPurchase.name;

  const sortDocPurchase =
    returnedDocPurchase.name && fromDate && toDate
      ? returnedDocPurchase.name.filter(
          (sortedDocPurchase) =>
            sortedDocPurchase.PurchaseDate <= toDate &&
            sortedDocPurchase.PurchaseDate >= fromDate
        )
      : returnedDocPurchase.name && filter
      ? returnedDocPurchase.name.filter(
          (sortedDocPurchase) => sortedDocPurchase.PmtType === filter
        )
      : returnedDocPurchase.name && birdFilter
      ? returnedDocPurchase.name.filter(
          (sortedDocPurchase) => sortedDocPurchase.BirdName === birdFilter
        )
      : allDocPurchase;

  // calculating totals-----------------------------------------------------------------
  let totalAmount;
  if (returnedDocPurchase.name) {
    totalAmount = sortDocPurchase.reduce((a, v) => (a = a + v.Amount), 0);
  }
  let totalQty;
  if (returnedDocPurchase.name) {
    totalQty = sortDocPurchase.reduce((a, v) => (a = a + v.Qty), 0);
  }
  // calculating totals-----------------------------------------------------------------

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  return (
    <>
      <div className="filter-container">
        Filter By:
        <button
          onClick={() => {
            setIsDate(!isDate);
            setIsPmt(false);
            setIsBirdFilter(false);
            setToDate("");
            setFromDate("");
            setFilter("");
            setBirdFilter("");
          }}
        >
          Date
        </button>
        <button
          onClick={() => {
            setIsPmt(!isPmt);
            setIsDate(false);
            setIsBirdFilter(false);
            setToDate("");
            setFromDate("");
            setFilter("");
            setBirdFilter("");
          }}
        >
          Payment method
        </button>
        <button
          onClick={() => {
            setIsBirdFilter(!isBirdFilter);
            setIsDate(false);
            setIsPmt(false);
            setToDate("");
            setFromDate("");
            setFilter("");
            setBirdFilter("");
          }}
        >
          Bird Type
        </button>
      </div>
      <div className="sort-report">
        {isDate && (
          <div className="sort-date">
            <label htmlFor="fromDate">From: </label>
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
            <label htmlFor="filter">Payment Method</label>
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
        {isBirdFilter && (
          <div className="bird-filter">
            <label htmlFor="birdfilter">Bird</label>
            <select
              name="birdfilter"
              id="birdfilter"
              value={birdFilter}
              onChange={(e) => setBirdFilter(e.target.value)}
            >
              <option></option>
              <option>Broiler</option>
              <option>Layer</option>
              <option>Cockerel</option>
              <option>Noiler</option>
              <option>Turkey</option>
            </select>
          </div>
        )}
      </div>
      {sortDocPurchase && sortDocPurchase.length === 0 ? (
        <div className="empty-main-report">
          <h1> There are no DOC purchase report available yet</h1>
          <p>
            Create a new report by tapping the <span>NEW</span> button...
          </p>
        </div>
      ) : sortDocPurchase ? (
        <div className="table-container" ref={ref}>
          <table id="table-to-xls">
            <tbody>
              <tr>
                <th>Date</th>
                <th>Invoice No</th>
                <th>Bird Type</th>
                <th>Batch</th>
                <th>Expense Type</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th>Payment Type</th>
                <th>Bank</th>
                <th>Customer</th>
              </tr>
            </tbody>
            {returnedDocPurchase.name &&
              sortDocPurchase.map((docPurchase) => {
                const {
                  DOCPurchaseId,
                  PurchaseDate,
                  InvoiceNo,
                  BirdName,
                  Batch,
                  ExpenseName,
                  Qty,
                  UnitPrice,
                  Amount,
                  PmtType,
                  BankName,
                  CustomerName,
                } = docPurchase;
                const newDate = `${new Date(
                  PurchaseDate
                ).toLocaleDateString()}`;
                return (
                  <tbody key={DOCPurchaseId}>
                    <tr>
                      <td>{newDate}</td>
                      <td>{InvoiceNo}</td>
                      <td>{BirdName}</td>
                      <td>{Batch}</td>
                      <td>{ExpenseName}</td>
                      <td>{formatMoney(Qty)}</td>
                      <td>{UnitPrice.toFixed(2)}</td>
                      <td>{Amount.toFixed(2)}</td>
                      <td>{PmtType}</td>
                      <td>{BankName}</td>
                      <td>{CustomerName}</td>
                    </tr>
                  </tbody>
                );
              })}
            <tfoot className="total-container">
              <tr>
                <th id="total" className="total" colSpan="1">
                  Total :
                </th>
                <td className="total"></td>
                <td className="total"></td>
                <td className="total"></td>
                <td className="total">{formatMoney(totalQty)}</td>
                <td className="total"></td>
                <td className="total">{totalAmount.toFixed(2)}</td>
                <td className="total"></td>
                <td className="total"></td>
                <td className="total"></td>
                <td className="total"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
});
