import React, { useState, useEffect } from "react";

export const DrugPurchaseTable = React.forwardRef((props, ref) => {
  const [returnedDrugPurchase, setReturnedDrugPurchase] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [filter, setFilter] = useState("");
  const [drugFilter, setDrugFilter] = useState("");

  // getting drug purchase start-----------------------------------------------------
  const getAllDrugPurchase = async () => {
    try {
      const allDrugPurchase = await fetch("/api/all-drug-purchase", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedDrugPurchase(allDrugPurchase);
    } catch (error) {
      console.log(error);
    }
  };
  // getting drug purchase end-----------------------------------------------------
  useEffect(() => {
    getAllDrugPurchase();
  }, []);

  let allDrugPurchase = returnedDrugPurchase.name;

  const sortDrugPurchase =
    returnedDrugPurchase.name && fromDate && toDate
      ? returnedDrugPurchase.name.filter(
          (sortedDrugPurchase) =>
            sortedDrugPurchase.PurchaseDate <= toDate &&
            sortedDrugPurchase.PurchaseDate >= fromDate
        )
      : returnedDrugPurchase.name && filter
      ? returnedDrugPurchase.name.filter(
          (sortedDrugPurchase) => sortedDrugPurchase.PmtType === filter
        )
      : returnedDrugPurchase.name && drugFilter
      ? returnedDrugPurchase.name.filter(
          (sortedDrugPurchase) => sortedDrugPurchase.DrugName === drugFilter
        )
      : allDrugPurchase;

  // calculating totals-----------------------------------------------------------------
  let totalAmount;
  if (returnedDrugPurchase.name) {
    totalAmount = sortDrugPurchase.reduce((a, v) => (a = a + v.Amount), 0);
  }
  let totalQty;
  if (returnedDrugPurchase.name) {
    totalQty = sortDrugPurchase.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let totalBagWeight;
  if (returnedDrugPurchase.name) {
    totalBagWeight = sortDrugPurchase.reduce(
      (a, v) => (a = a + v.BagWeight),
      0
    );
  }
  // calculating totals-----------------------------------------------------------------

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  return (
    <>
      <div className="sort-report">
        <div className="sort-date">
          <label htmlFor="fromDate">From:</label>
          <input
            type="date"
            name="fromDate"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label htmlFor="toDate">To:</label>
          <input
            type="datetime-local"
            name="toDate"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
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
        <div className="drug-filter">
          <label htmlFor="drugfilter">Drug:</label>
          <select
            name="drugfilter"
            id="drugfilter"
            value={drugFilter}
            onChange={(e) => setDrugFilter(e.target.value)}
          >
            <option></option>
            <option>Antibiotics</option>
            <option>Anticoccidiosis</option>
            <option>Antiviral</option>
            <option>Coryza</option>
            <option>Deworm</option>
            <option>Multivitamin</option>
            <option>Vaccine</option>
          </select>
        </div>
      </div>
      {sortDrugPurchase && sortDrugPurchase.length === 0 ? (
        <div className="empty-main-report">
          <h1>Oops! There are no Drug purchase report available yet</h1>
          <p>
            Create a new report by tapping the <span>NEW</span> button...
          </p>
        </div>
      ) : sortDrugPurchase ? (
        <div className="table-container" ref={ref}>
          <table>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Invoice No</th>
                <th>Lot No</th>
                <th>Drug</th>
                <th>Bag Weight</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th>Payment Type</th>
                <th>Bank</th>
                <th>Supplier</th>
              </tr>
            </tbody>
            {returnedDrugPurchase.name &&
              sortDrugPurchase.map((drugPurchase) => {
                const {
                  DrugPurchaseId,
                  PurchaseDate,
                  InvoiceNo,
                  LotNo,
                  DrugName,
                  BagWeight,
                  Qty,
                  UnitPrice,
                  Amount,
                  PmtType,
                  BankName,
                  SupplierName,
                } = drugPurchase;
                const newDate = `${new Date(
                  PurchaseDate
                ).toLocaleDateString()}`;
                return (
                  <tbody key={DrugPurchaseId}>
                    <tr>
                      <td>{newDate}</td>
                      <td>{InvoiceNo}</td>
                      <td>{LotNo}</td>
                      <td>{DrugName}</td>
                      <td>{formatMoney(BagWeight)}</td>
                      <td>{formatMoney(Qty)}</td>
                      <td>{formatMoney(UnitPrice)}.00</td>
                      <td>{formatMoney(Amount)}.00</td>
                      <td>{PmtType}</td>
                      <td>{BankName}</td>
                      <td>{SupplierName}</td>
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
                <td className="total">{formatMoney(totalBagWeight)}</td>
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
