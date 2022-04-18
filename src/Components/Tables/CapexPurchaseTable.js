import React, { useState, useEffect } from "react";
import { Loading } from "../Loading";

export const CapexPurchaseTable = React.forwardRef((props, ref) => {
  const [returnedCapexPurchase, setReturnedCapexPurchase] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [isDate, setIsDate] = useState(false);
  const [isStatus, setIsStatus] = useState(false);

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
      setReturnedCapexPurchase(capexs);
    } catch (error) {
      console.log(error);
    }
  };
  // getting Capex-----------------------------------------------------
  useEffect(() => {
    getCapexs();
  }, []);

  let allCapexPurchase = returnedCapexPurchase.name;

  const sortCapexPurchase =
    returnedCapexPurchase.name && fromDate && toDate
      ? returnedCapexPurchase.name.filter(
          (sortedCapexPurchase) =>
            sortedCapexPurchase.PurchaseDate <= toDate &&
            sortedCapexPurchase.PurchaseDate >= fromDate
        )
      : returnedCapexPurchase.name && itemStatus
      ? returnedCapexPurchase.name.filter(
          (sortedCapexPurchase) => sortedCapexPurchase.StatusDesc === itemStatus
        )
      : // : returnedDrugPurchase.name && drugFilter
        // ? returnedDrugPurchase.name.filter(
        //     (sortedDrugPurchase) => sortedDrugPurchase.DrugName === drugFilter
        //   )
        allCapexPurchase;

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
      <div className="filter-container">
        Filter By:
        <button
          onClick={() => {
            setIsDate(!isDate);
            setIsStatus(false);
            setItemStatus("");
          }}
        >
          Date
        </button>
        <button
          onClick={() => {
            setIsDate(false);
            setIsStatus(!isStatus);
            setFromDate("");
            setToDate("");
          }}
        >
          Status
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
        {isStatus && (
          <div className="status-filter">
            <label htmlFor="filter">Status: </label>
            <select
              name="itemStatus"
              id="itemStatus"
              value={itemStatus}
              onChange={(e) => setItemStatus(e.target.value)}
            >
              <option></option>
              <option>Depreciated</option>
              <option>Disposed</option>
              <option>Active</option>
            </select>
          </div>
        )}
      </div>
      {sortCapexPurchase && sortCapexPurchase.length === 0 ? (
        <div className="empty-main-report">
          <h1> There are no Capex report available yet</h1>
          <p>
            Create a new report by tapping the <span>NEW</span> button...
          </p>
        </div>
      ) : sortCapexPurchase ? (
        <div className="table-container" ref={ref}>
          <table id="table-to-xls">
            <tbody>
              <tr>
                <th>Date Purchased</th>
                <th>Asset Code</th>
                <th>Asset Type</th>
                <th>Lifespan(years)</th>
                <th>Cost</th>
                <th>Monthly Depreciation</th>
                <th>Accumulated Depreciation</th>
                <th>Net-Book Value</th>
                <th>Status</th>
              </tr>
            </tbody>
            {returnedCapexPurchase.name &&
              sortCapexPurchase.map((capexPurchase) => {
                const {
                  FAId,
                  PurchaseDate,
                  AssetTypeDesc,
                  FACode,
                  Lifespan,
                  FACost,
                  DeprAmount,
                  AccumDepr,
                  StatusDesc,
                } = capexPurchase;
                const newDate = `${new Date(
                  PurchaseDate
                ).toLocaleDateString()}`;
                return (
                  <tbody key={FAId}>
                    <tr>
                      <td>{newDate}</td>
                      <td>{FACode}</td>
                      <td>{AssetTypeDesc}</td>
                      <td>{Lifespan}</td>
                      <td>{FACost.toFixed(2)}</td>
                      <td>{(Math.round(DeprAmount * 100) / 100).toFixed(2)}</td>
                      <td>{(Math.round(AccumDepr * 100) / 100).toFixed(2)}</td>
                      <td>{(FACost - AccumDepr).toFixed(2)}</td>
                      <td>{StatusDesc}</td>
                    </tr>
                  </tbody>
                );
              })}
            {/* <tfoot className="total-container">
              <tr>
                <th id="total" className="total" colSpan="1">
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
        <Loading />
      )}
    </>
  );
});
