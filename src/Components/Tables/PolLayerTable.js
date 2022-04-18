import React, { useState, useEffect } from "react";
import { Loading } from "../Loading";

export const PolLayerTable = React.forwardRef((props, ref) => {
  const [returnedPolLayers, setReturnedPolLayers] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [filter, setFilter] = useState("");
  const [birdFilter, setBirdFilter] = useState("");
  const [search, setSearch] = useState("");
  const [isDate, setIsDate] = useState(false);
  const [isPmt, setIsPmt] = useState(false);
  const [isBirdFilter, setIsBirdFilter] = useState(false);

  const getAllPolLayers = async () => {
    try {
      const allPolLayers = await fetch("/api/all-pol-layers", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedPolLayers(allPolLayers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPolLayers();
  }, []);

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  let allPolLayers = returnedPolLayers.name;

  // const sortBirdSales =
  //   returnedBirdSales.name && search
  //     ? returnedBirdSales.name.filter(
  //         (sortedBird) =>
  //           sortedBird.Reference.toLowerCase() === search.toLowerCase() ||
  //           sortedBird.BirdName.toLowerCase() === search.toLowerCase()
  //       )
  //     : allBirdSales;
  const sortPolLayers =
    returnedPolLayers.name && fromDate && toDate
      ? returnedPolLayers.name.filter(
          (sortedPolLayer) =>
            sortedPolLayer.TxnDate <= toDate &&
            sortedPolLayer.TxnDate >= fromDate
        )
      : returnedPolLayers.name && filter
      ? returnedPolLayers.name.filter(
          (sortedPolLayer) => sortedPolLayer.PmtType === filter
        )
      : //   : returnedPolLayers.name && birdFilter
        //   ? returnedPolLayers.name.filter(
        //       (sortedPolLayer) => sortedPolLayer.BirdName === birdFilter
        //     )
        allPolLayers;

  // calculating totals-----------------------------------------------------------------
  let totalAmount;
  if (returnedPolLayers.name) {
    totalAmount = sortPolLayers.reduce((a, v) => (a = a + v.Amount), 0);
  }
  let totalQty;
  if (returnedPolLayers.name) {
    totalQty = sortPolLayers.reduce((a, v) => (a = a + v.Qty), 0);
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
        {/* <button
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
        </button> */}
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
        {/* {isBirdFilter && (
          <div className="bird-filter">
            <label htmlFor="birdfilter">Bird:</label>
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
        )} */}
        {/* <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}
      </div>
      {sortPolLayers && sortPolLayers.length === 0 ? (
        <div className="empty-main-report">
          <h1> There are no POL Layers report available yet</h1>
          <p>
            Create a new report by tapping the <span>NEW</span> button...
          </p>
        </div>
      ) : sortPolLayers ? (
        <div className="table-container" ref={ref}>
          <table id="table-to-xls">
            <tbody className="table-head">
              <tr>
                <th>Date</th>
                <th>Invoice No</th>
                <th>Batch</th>
                <th>Quantity (Purchased)</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th>Expense Type</th>
                <th>Payment Type</th>
                <th>Bank</th>
                <th>Supplier</th>
              </tr>
            </tbody>
            {returnedPolLayers.name &&
              sortPolLayers.map((polLayer) => {
                const {
                  PolConvertId,
                  TxnDate,
                  InvoiceNo,
                  Batch,
                  Qty,
                  UnitPrice,
                  Amount,
                  ExpenseName,
                  PmtType,
                  BankName,
                  SupplierName,
                } = polLayer;
                const newDate = `${new Date(TxnDate).toLocaleDateString()}`;
                return (
                  <tbody key={PolConvertId}>
                    <tr>
                      <td>{newDate}</td>
                      <td>{InvoiceNo}</td>
                      <td>{Batch}</td>
                      <td>{formatMoney(Qty)}</td>
                      <td>{UnitPrice.toFixed(2)}</td>
                      <td>{Amount.toFixed(2)}</td>
                      <td>{ExpenseName}</td>
                      <td>{PmtType}</td>
                      <td>{BankName}</td>
                      <td>{SupplierName}</td>
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
