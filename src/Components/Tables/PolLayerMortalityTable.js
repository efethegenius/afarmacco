import React, { useState, useEffect } from "react";
import { Loading } from "../Loading";

export const PolLayerMortalityTable = React.forwardRef((props, ref) => {
  const [returnedPolMortality, setReturnedPolMortality] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [filter, setFilter] = useState("");
  const [birdFilter, setBirdFilter] = useState("");
  const [search, setSearch] = useState("");
  const [isDate, setIsDate] = useState(false);
  const [isPmt, setIsPmt] = useState(false);
  const [isBirdFilter, setIsBirdFilter] = useState(false);

  const getAllPolMortality = async () => {
    try {
      const allPolMortality = await fetch("api/all-pol-mortality", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedPolMortality(allPolMortality);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPolMortality();
  }, []);

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  let allPolMortality = returnedPolMortality.name;

  // const sortBirdSales =
  //   returnedBirdSales.name && search
  //     ? returnedBirdSales.name.filter(
  //         (sortedBird) =>
  //           sortedBird.Reference.toLowerCase() === search.toLowerCase() ||
  //           sortedBird.BirdName.toLowerCase() === search.toLowerCase()
  //       )
  //     : allBirdSales;
  const sortPolMortality =
    returnedPolMortality.name && fromDate && toDate
      ? returnedPolMortality.name.filter(
          (sortedPolMortality) =>
            sortedPolMortality.TxnDate <= toDate &&
            sortedPolMortality.TxnDate >= fromDate
        )
      : //   : returnedPolMortality.name && filter
        //   ? returnedPolMortality.name.filter(
        //       (sortedPolMortality) => sortedPolMortality.PmtType === filter
        //     )
        //   : returnedPolLayers.name && birdFilter
        //   ? returnedPolLayers.name.filter(
        //       (sortedPolLayer) => sortedPolLayer.BirdName === birdFilter
        //     )
        allPolMortality;

  // calculating totals-----------------------------------------------------------------
  //   let totalAmount;
  //   if (returnedPolSales.name) {
  //     totalAmount = sortPolSales.reduce((a, v) => (a = a + v.Amount), 0);
  //   }
  let totalQty;
  if (returnedPolMortality.name) {
    totalQty = sortPolMortality.reduce((a, v) => (a = a + v.Qty), 0);
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
              <option>Other</option>
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
      {sortPolMortality && sortPolMortality.length === 0 ? (
        <div className="empty-main-report">
          <h1> There are no POL Mortality report available yet</h1>
          <p>
            Create a new report by tapping the <span>NEW</span> button...
          </p>
        </div>
      ) : sortPolMortality ? (
        <div className="table-container" ref={ref}>
          <table id="table-to-xls">
            <tbody className="table-head">
              <tr>
                <th>Date</th>
                <th>Batch</th>
                <th>Quantity</th>
              </tr>
            </tbody>
            {returnedPolMortality.name &&
              sortPolMortality.map((polMortality) => {
                const { MortalityId, TxnDate, Batch, Qty } = polMortality;
                const newDate = `${new Date(TxnDate).toLocaleDateString()}`;
                return (
                  <tbody key={MortalityId}>
                    <tr>
                      <td>{newDate}</td>
                      <td>{Batch}</td>
                      <td>{formatMoney(Qty)}</td>
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
