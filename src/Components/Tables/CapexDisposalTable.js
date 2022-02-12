import React, { useState, useEffect } from "react";

export const CapexDisposalTable = React.forwardRef((props, ref) => {
  const [returnedCapexDisposal, setReturnedCapexDisposal] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [filter, setFilter] = useState("");
  // getting capex start-----------------------------------------------------
  const getCapexs = async () => {
    try {
      const capexs = await fetch("/api/capexs", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedCapexDisposal(capexs);
    } catch (error) {
      console.log(error);
    }
  };
  // getting Capex-----------------------------------------------------
  useEffect(() => {
    getCapexs();
  }, []);

  let disposedItems;
  if (returnedCapexDisposal.name) {
    disposedItems = returnedCapexDisposal.name.filter(
      (capex) => capex.StatusDesc === "Disposed"
    );
  }

  //   let allCapexPurchase = returnedCapexPurchase.name;

  const sortCapexDisposal =
    returnedCapexDisposal.name && fromDate && toDate
      ? returnedCapexDisposal.name.filter(
          (sortedCapexDisposal) =>
            sortedCapexDisposal.PurchaseDate <= toDate &&
            sortedCapexDisposal.PurchaseDate >= fromDate
        )
      : returnedCapexDisposal.name && filter
      ? returnedCapexDisposal.name.filter(
          (sortedCapexDisposal) => sortedCapexDisposal.PmtType === filter
        )
      : // : returnedDrugPurchase.name && drugFilter
        // ? returnedDrugPurchase.name.filter(
        //     (sortedDrugPurchase) => sortedDrugPurchase.DrugName === drugFilter
        //   )
        disposedItems;

  // calculating totals-----------------------------------------------------------------
  //   let totalAmount;
  //   if (returnedDrugPurchase.name) {
  //     totalAmount = sortDrugPurchase.reduce((a, v) => (a = a + v.Amount), 0);
  //   }
  //   let totalQty;
  //   if (returnedDrugPurchase.name) {
  //     totalQty = sortDrugPurchase.reduce((a, v) => (a = a + v.Qty), 0);
  //   }
  //   let totalBagWeight;
  //   if (returnedDrugPurchase.name) {
  //     totalBagWeight = sortDrugPurchase.reduce(
  //       (a, v) => (a = a + v.BagWeight),
  //       0
  //     );
  //   }
  // calculating totals-----------------------------------------------------------------

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  return (
    <>
      {/* <div className="sort-report">
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
      </div> */}
      {sortCapexDisposal && sortCapexDisposal.length === 0 ? (
        <div className="empty-main-report">
          <h1>Oops! There are no Disposal report available yet</h1>
          <p>
            Create a new report by tapping the <span>NEW</span> button...
          </p>
        </div>
      ) : sortCapexDisposal ? (
        <div className="table-container" ref={ref}>
          <table>
            <tbody>
              <tr>
                <th>Asset Code</th>
                <th>Date Purchased</th>
                <th>Date Sold</th>
                <th>Accumulated Depreciation</th>
                <th>Purchase Cost</th>
                <th>Net-Book Value</th>
                <th>Sale Value</th>
                <th>Profit/Loss</th>
                <th>Status</th>
              </tr>
            </tbody>
            {returnedCapexDisposal.name &&
              sortCapexDisposal.map((capexDisposal) => {
                const {
                  FAId,
                  FACode,
                  PurchaseDate,
                  DisposalDate,
                  AccumDepr,
                  FACost,
                  SaleValue,
                  StatusDesc,
                } = capexDisposal;
                const newDate = `${new Date(
                  PurchaseDate
                ).toLocaleDateString()}`;
                const newDate2 = `${new Date(
                  DisposalDate
                ).toLocaleDateString()}`;
                return (
                  <tbody key={FAId}>
                    <tr>
                      <td>{FACode}</td>
                      <td>{newDate}</td>
                      <td>{newDate2}</td>
                      <td>{AccumDepr}</td>
                      <td>{FACost}</td>
                      <td>{FACost - AccumDepr}</td>
                      <td>{SaleValue}</td>
                      <td>{SaleValue - (FACost - AccumDepr)}</td>
                      <td>{StatusDesc}</td>
                    </tr>
                  </tbody>
                );
              })}
            {/* <tfoot className="total-container">
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
            </tfoot> */}
          </table>
        </div>
      ) : (
        "loading, please wait..."
      )}
    </>
  );
});
