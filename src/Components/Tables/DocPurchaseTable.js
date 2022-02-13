import React, { useState, useEffect } from "react";

export const DocPurchaseTable = React.forwardRef((props, ref) => {
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [filter, setFilter] = useState("");
  const [birdFilter, setBirdFilter] = useState("");
  const [returnedDocPurchase, setReturnedDocPurchase] = useState([]);

  // getting doc purchase start-----------------------------------------------------
  const getAllDocPurchase = async () => {
    try {
      const allDocPurchase = await fetch(
        "https://afarmacco-api.herokuapp.com/api/all-doc-purchase",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
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
      <div className="sort-report">
        <div className="sort-date">
          <label htmlFor="fromDate">From</label>
          <input
            type="date"
            name="fromDate"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label htmlFor="toDate">To</label>
          <input
            type="datetime-local"
            name="toDate"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
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
      </div>
      {sortDocPurchase && sortDocPurchase.length === 0 ? (
        <div className="empty-main-report">
          <h1>Oops! There are no DOC purchase report available yet</h1>
          <p>
            Create a new report by tapping the <span>NEW</span> button...
          </p>
        </div>
      ) : sortDocPurchase ? (
        <div className="table-container" ref={ref}>
          <table>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Invoice No</th>
                <th>Bird Type</th>
                <th>Batch</th>
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
                      <td>{formatMoney(Qty)}</td>
                      <td>{formatMoney(UnitPrice)}.00</td>
                      <td>{formatMoney(Amount)}.00</td>
                      <td>{PmtType}</td>
                      <td>{BankName}</td>
                      <td>{CustomerName}</td>
                    </tr>
                  </tbody>
                );
              })}
            <tfoot className="total-container">
              <tr>
                <th id="total" className="total" colspan="1">
                  Total :
                </th>
                <td className="total"></td>
                <td className="total"></td>
                <td className="total"></td>
                <td className="total">{formatMoney(totalQty)}</td>
                <td className="total"></td>
                <td className="total">{formatMoney(totalAmount)}.00</td>
                <td className="total"></td>
                <td className="total"></td>
                <td className="total"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        "loading, please wait..."
      )}
    </>
  );
});
