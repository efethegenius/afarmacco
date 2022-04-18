import React, { useState, useEffect } from "react";
import { Loading } from "../Loading";

export const ReportsTable = React.forwardRef((props, ref) => {
  const [returnedReports, setReturnedReports] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [filter, setFilter] = useState("");
  const [birdFilter, setBirdFilter] = useState("");
  const [search, setSearch] = useState("");
  const [isDate, setIsDate] = useState(false);
  const [isPmt, setIsPmt] = useState(false);
  const [isBirdFilter, setIsBirdFilter] = useState(false);

  const getReports = async () => {
    try {
      const reports = await fetch("/api/reports", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedReports(reports);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  let allReports = returnedReports.name;

  // const sortBirdSales =
  //   returnedBirdSales.name && search
  //     ? returnedBirdSales.name.filter(
  //         (sortedBird) =>
  //           sortedBird.Reference.toLowerCase() === search.toLowerCase() ||
  //           sortedBird.BirdName.toLowerCase() === search.toLowerCase()
  //       )
  //     : allBirdSales;
  const sortReports =
    returnedReports.name && fromDate && toDate
      ? returnedReports.name.filter(
          (sortedReport) =>
            sortedReport.TxnDate <= toDate && sortedReport.TxnDate >= fromDate
        )
      : //   : returnedPolLayers.name && filter
        //   ? returnedPolLayers.name.filter(
        //       (sortedPolLayer) => sortedPolLayer.PmtType === filter
        //     )
        //   : returnedPolLayers.name && birdFilter
        //   ? returnedPolLayers.name.filter(
        //       (sortedPolLayer) => sortedPolLayer.BirdName === birdFilter
        //     )
        allReports;

  // calculating totals-----------------------------------------------------------------
  let totalAmount;
  if (returnedReports.name) {
    totalAmount = sortReports.reduce((a, v) => (a = a + v.Amount), 0);
  }
  //   let totalQty;
  //   if (returnedPolLayers.name) {
  //     totalQty = sortPolLayers.reduce((a, v) => (a = a + v.Qty), 0);
  //   }
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
        {/* <button
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
        </button> */}
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
        {/* {isPmt && (
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
        )} */}
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
      {sortReports && sortReports.length === 0 ? (
        <div className="empty-main-report">
          <h1> There are no Financial reports available yet</h1>
          <p>
            When you make transactions, Financial reports would be available
            here
          </p>
        </div>
      ) : sortReports ? (
        <div className="table-container report-table-container" ref={ref}>
          <table id="table-to-xls">
            <tbody className="table-head">
              <tr>
                <th>Date</th>
                <th>Details</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </tbody>
            {returnedReports.name &&
              sortReports.map((report) => {
                const { ReportId, TxnDate, ReportDetails, ReportType, Amount } =
                  report;
                const newDate = `${new Date(TxnDate).toLocaleDateString()}`;
                return (
                  <tbody key={ReportId}>
                    <tr>
                      <td>{newDate}</td>
                      <td>{ReportDetails}</td>
                      <td>{ReportType}</td>
                      <td>{formatMoney(Amount)}.00</td>
                    </tr>
                  </tbody>
                );
              })}
            <tfoot className="total-container">
              <tr>
                <th id="total" className="total" colSpan="1">
                  Gross Profit :
                </th>
                <td className="total"></td>
                <td className="total"></td>
                <td className="total">{formatMoney(totalAmount)}.00</td>
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
