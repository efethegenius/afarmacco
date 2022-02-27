import React, { useState, useEffect } from "react";
import { Loading } from "../Loading";

export const DocMortalityTable = React.forwardRef((props, ref) => {
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [returnedDocMortality, setReturnedDocMortality] = useState([]);
  const [birdFilter, setBirdFilter] = useState("");
  const [isDate, setIsDate] = useState(false);
  const [isBirdFilter, setIsBirdFilter] = useState(false);

  // getting doc mortality start-----------------------------------------------------
  const getAllDocMortality = async () => {
    try {
      const allDocMortality = await fetch("/api/all-doc-mortality", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedDocMortality(allDocMortality);
    } catch (error) {
      console.log(error);
    }
  };
  // getting doc mortality end-----------------------------------------------------

  useEffect(() => {
    getAllDocMortality();
  }, []);

  let allDocMortality = returnedDocMortality.name;

  const sortDocMortality =
    returnedDocMortality.name && fromDate && toDate
      ? returnedDocMortality.name.filter(
          (sortedDocMortality) =>
            sortedDocMortality.MortalityDate >= fromDate &&
            sortedDocMortality.MortalityDate <= toDate
        )
      : returnedDocMortality.name && birdFilter
      ? returnedDocMortality.name.filter(
          (sortedDocMortality) => sortedDocMortality.BirdName === birdFilter
        )
      : allDocMortality;

  // calculating totals-----------------------------------------------------------------
  let totalQty;
  if (returnedDocMortality.name) {
    totalQty = sortDocMortality.reduce((a, v) => (a = a + v.Qty), 0);
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
            setIsBirdFilter(false);
            setToDate("");
            setFromDate("");
            setBirdFilter("");
          }}
        >
          Date
        </button>
        <button
          onClick={() => {
            setIsBirdFilter(!isBirdFilter);
            setIsDate(false);
            setToDate("");
            setFromDate("");
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
      {sortDocMortality && sortDocMortality.length === 0 ? (
        <div className="empty-main-report">
          <h1>Oops! There are no DOC mortality report available yet</h1>
          <p>
            Create a new report by tapping the <span>NEW</span> button...
          </p>
        </div>
      ) : sortDocMortality ? (
        <div className="table-container" ref={ref}>
          <table id="table-to-xls">
            <tbody>
              <tr>
                <th>Date</th>
                <th>Bird Type</th>
                <th>Batch</th>
                <th>Quantity</th>
              </tr>
            </tbody>
            {returnedDocMortality.name &&
              sortDocMortality.map((docMortality) => {
                const { MortalityId, MortalityDate, BirdName, Batch, Qty } =
                  docMortality;
                const newDate = `${new Date(
                  MortalityDate
                ).toLocaleDateString()}`;
                return (
                  <tbody key={MortalityId}>
                    <tr>
                      <td>{newDate}</td>
                      <td>{BirdName}</td>
                      <td>{Batch}</td>
                      <td>{formatMoney(Qty)}</td>
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
                <td className="total">{formatMoney(totalQty)}</td>
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
