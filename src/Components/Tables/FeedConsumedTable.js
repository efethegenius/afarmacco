import React, { useState, useEffect } from "react";

export const FeedConsumedTable = React.forwardRef((props, ref) => {
  const [returnedFeedConsumed, setReturnedFeedConsumed] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [birdFilter, setBirdFilter] = useState("");
  const [feedFilter, setFeedFilter] = useState("");

  // getting feed consumed start-----------------------------------------------------
  const getAllFeedConsumed = async () => {
    try {
      const allFeedConsumed = await fetch(
        "https://afarmacco-api.herokuapp.com/api/all-feed-consumed",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedFeedConsumed(allFeedConsumed);
    } catch (error) {
      console.log(error);
    }
  };
  // getting feed consumed end-----------------------------------------------------

  useEffect(() => {
    getAllFeedConsumed();
  }, []);

  let allFeedConsumed = returnedFeedConsumed.name;

  const sortFeedConsumed =
    returnedFeedConsumed.name && fromDate && toDate
      ? returnedFeedConsumed.name.filter(
          (sortedFeedConsumed) =>
            sortedFeedConsumed.ConsumptionDate >= fromDate &&
            sortedFeedConsumed.ConsumptionDate <= toDate
        )
      : returnedFeedConsumed.name && birdFilter
      ? returnedFeedConsumed.name.filter(
          (sortedFeedConsumed) => sortedFeedConsumed.BirdName === birdFilter
        )
      : returnedFeedConsumed.name && feedFilter
      ? returnedFeedConsumed.name.filter(
          (sortedFeedConsumed) => sortedFeedConsumed.FeedName === feedFilter
        )
      : allFeedConsumed;

  // calculating totals-----------------------------------------------------------------
  let totalAmount;
  if (returnedFeedConsumed.name) {
    totalAmount = sortFeedConsumed.reduce((a, v) => (a = a + v.ValueUsed), 0);
  }
  let totalBag;
  if (returnedFeedConsumed.name) {
    totalBag = sortFeedConsumed.reduce((a, v) => (a = a + v.BagQtyUsed), 0);
  }
  let totalSize;
  if (returnedFeedConsumed.name) {
    totalSize = sortFeedConsumed.reduce((a, v) => (a = a + v.SizeQtyUsed), 0);
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
        <div className="feed-filter">
          <label htmlFor="feedfilter">Drug:</label>
          <select
            name="feedfilter"
            id="feedfilter"
            value={feedFilter}
            onChange={(e) => setFeedFilter(e.target.value)}
          >
            <option></option>
            <option>Starter</option>
            <option>Grower</option>
            <option>Finisher</option>
          </select>
        </div>
      </div>
      {sortFeedConsumed && sortFeedConsumed.length === 0 ? (
        <div className="empty-main-report">
          <h1>Oops! There are no Feed Consumed report available yet</h1>
          <p>
            Create a new report by tapping the <span>NEW</span> button...
          </p>
        </div>
      ) : sortFeedConsumed ? (
        <div className="table-container" ref={ref}>
          <table>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Lot No</th>
                <th>Feed</th>
                <th>Bird Type</th>
                <th>Batch</th>
                <th>Bag (Qty Used)</th>
                <th>Size (Qty Used)</th>
                <th>Unit Price</th>
                <th>Amount Used</th>
              </tr>
            </tbody>
            {returnedFeedConsumed.name &&
              sortFeedConsumed.map((feedConsumed) => {
                const {
                  FeedConsumptionId,
                  ConsumptionDate,
                  LotNo,
                  FeedName,
                  BirdName,
                  Batch,
                  BagQtyUsed,
                  SizeQtyUsed,
                  UnitPrice,
                  ValueUsed,
                } = feedConsumed;
                const newDate = `${new Date(
                  ConsumptionDate
                ).toLocaleDateString()}`;
                return (
                  <tbody key={FeedConsumptionId}>
                    <tr>
                      <td>{newDate}</td>
                      <td>{LotNo}</td>
                      <td>{FeedName}</td>
                      <td>{BirdName}</td>
                      <td>{Batch}</td>
                      <td>{formatMoney(BagQtyUsed)}</td>
                      <td>{formatMoney(SizeQtyUsed)}</td>
                      <td>{formatMoney(UnitPrice)}.00</td>
                      <td>{formatMoney(ValueUsed)}.00</td>
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
                <td className="total"></td>
                <td className="total">{formatMoney(totalBag)}</td>
                <td className="total">{formatMoney(totalSize)}</td>
                <td className="total"></td>
                <td className="total">{formatMoney(totalAmount)}.00</td>
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
