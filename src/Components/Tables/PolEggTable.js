import React, { useState, useEffect } from "react";
import { Loading } from "../Loading";

export const PolEggTable = React.forwardRef((props, ref) => {
  const [returnedPolEggs, setReturnedPolEggs] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [filter, setFilter] = useState("");
  const [birdFilter, setBirdFilter] = useState("");
  const [search, setSearch] = useState("");
  const [isDate, setIsDate] = useState(false);
  const [isPmt, setIsPmt] = useState(false);
  const [isBirdFilter, setIsBirdFilter] = useState(false);

  const getAllPolEggs = async () => {
    try {
      const allPolEggs = await fetch("/api/all-pol-eggs", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedPolEggs(allPolEggs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPolEggs();
  }, []);

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  let allPolEggs = returnedPolEggs.name;

  // const sortBirdSales =
  //   returnedBirdSales.name && search
  //     ? returnedBirdSales.name.filter(
  //         (sortedBird) =>
  //           sortedBird.Reference.toLowerCase() === search.toLowerCase() ||
  //           sortedBird.BirdName.toLowerCase() === search.toLowerCase()
  //       )
  //     : allBirdSales;
  const sortPolEggs =
    returnedPolEggs.name && fromDate && toDate
      ? returnedPolEggs.name.filter(
          (sortedPolEgg) =>
            sortedPolEgg.TxnDate <= toDate && sortedPolEgg.SalesDate >= fromDate
        )
      : returnedPolEggs.name && filter
      ? returnedPolEggs.name.filter(
          (sortedPolEgg) => sortedPolEgg.PmtType === filter
        )
      : //   : returnedPolEggs.name && birdFilter
        //   ? returnedPolEggs.name.filter(
        //       (sortedPolEgg) => sortedPolEgg.BirdName === birdFilter
        //     )
        allPolEggs;

  // calculating totals-----------------------------------------------------------------
  let totalAmount;
  if (returnedPolEggs.name) {
    totalAmount = sortPolEggs.reduce((a, v) => (a = a + v.Amount), 0);
  }
  let totalQty;
  if (returnedPolEggs.name) {
    totalQty = sortPolEggs.reduce((a, v) => (a = a + v.CrateQty), 0);
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
      {sortPolEggs && sortPolEggs.length === 0 ? (
        <div className="empty-main-report">
          <h1> There are no Eggs report available yet</h1>
          <p>
            Create a new report by tapping the <span>NEW</span> button...
          </p>
        </div>
      ) : sortPolEggs ? (
        <div className="table-container" ref={ref}>
          <table id="table-to-xls">
            <tbody className="table-head">
              <tr>
                <th>Date</th>
                <th>Invoice No</th>
                <th>Batch</th>
                <th>Quantity (Crates)</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th>Payment Type</th>
                <th>Bank</th>
                <th>Customer</th>
              </tr>
            </tbody>
            {returnedPolEggs.name &&
              sortPolEggs.map((polEgg) => {
                const {
                  PolEggId,
                  TxnDate,
                  InvoiceNo,
                  Batch,
                  CrateQty,
                  UnitPrice,
                  Amount,
                  PmtType,
                  BankName,
                  CustomerName,
                } = polEgg;
                const newDate = `${new Date(TxnDate).toLocaleDateString()}`;
                return (
                  <tbody key={PolEggId}>
                    <tr>
                      <td>{newDate}</td>
                      <td>{InvoiceNo}</td>
                      <td>{Batch}</td>
                      <td>{formatMoney(CrateQty)}</td>
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
                <td className="total">{formatMoney(totalQty)}</td>
                <td className="total"></td>
                <td className="total">{totalAmount.toFixed(2)}</td>
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
