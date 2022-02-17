import React, { useState, useEffect } from "react";

export const FeedPurchaseTable = React.forwardRef((props, ref) => {
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [filter, setFilter] = useState("");
  const [feedFilter, setFeedFilter] = useState("");
  const [returnedFeedPurchase, setReturnedFeedPurchase] = useState([]);
  const [isDate, setIsDate] = useState(false);
  const [isPmt, setIsPmt] = useState(false);
  const [isFeedFilter, setIsFeedFilter] = useState(false);

  // getting feed purchase start-----------------------------------------------------
  const getAllFeedPurchase = async () => {
    try {
      const allFeedPurchase = await fetch("/api/all-feed-purchase", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedFeedPurchase(allFeedPurchase);
    } catch (error) {
      console.log(error);
    }
  };
  // getting feed purchase end-----------------------------------------------------

  useEffect(() => {
    getAllFeedPurchase();
  }, []);

  let allFeedPurchase = returnedFeedPurchase.name;

  const sortFeedPurchase =
    returnedFeedPurchase.name && fromDate && toDate
      ? returnedFeedPurchase.name.filter(
          (sortedFeedPurchase) =>
            sortedFeedPurchase.PurchaseDate <= toDate &&
            sortedFeedPurchase.PurchaseDate >= fromDate
        )
      : returnedFeedPurchase.name && filter
      ? returnedFeedPurchase.name.filter(
          (sortedFeedPurchase) => sortedFeedPurchase.PmtType === filter
        )
      : returnedFeedPurchase.name && feedFilter
      ? returnedFeedPurchase.name.filter(
          (sortedFeedPurchase) => sortedFeedPurchase.FeedName === feedFilter
        )
      : allFeedPurchase;

  // calculating totals-----------------------------------------------------------------
  let totalAmount;
  if (returnedFeedPurchase.name) {
    totalAmount = sortFeedPurchase.reduce((a, v) => (a = a + v.Amount), 0);
  }
  let totalQty;
  if (returnedFeedPurchase.name) {
    totalQty = returnedFeedPurchase.name.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let totalBagWeight;
  if (returnedFeedPurchase.name) {
    totalBagWeight = returnedFeedPurchase.name.reduce(
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
      <div className="filter-container">
        Filter By:
        <button
          onClick={() => {
            setIsDate(!isDate);
            setIsPmt(false);
            setIsFeedFilter(false);
            setToDate("");
            setFromDate("");
            setFilter("");
            setFeedFilter("");
          }}
        >
          Date
        </button>
        <button
          onClick={() => {
            setIsPmt(!isPmt);
            setIsDate(false);
            setIsFeedFilter(false);
            setToDate("");
            setFromDate("");
            setFilter("");
            setFeedFilter("");
          }}
        >
          Payment method
        </button>
        <button
          onClick={() => {
            setIsFeedFilter(!isFeedFilter);
            setIsDate(false);
            setIsPmt(false);
            setToDate("");
            setFromDate("");
            setFilter("");
            setFeedFilter("");
          }}
        >
          Feed Type
        </button>
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
        {isFeedFilter && (
          <div className="feed-filter">
            <label htmlFor="feedfilter">Feed:</label>
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
        )}
      </div>
      {sortFeedPurchase && sortFeedPurchase.length === 0 ? (
        <div className="empty-main-report">
          <h1>Oops! There are no Feed purchase report available yet</h1>
          <p>
            Create a new report by tapping the <span>NEW</span> button...
          </p>
        </div>
      ) : sortFeedPurchase ? (
        <div className="table-container" ref={ref}>
          <table>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Lot No</th>
                <th>Invoice No</th>
                <th>Feed</th>
                <th>Bag Weight</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th>Payment Type</th>
                <th>Bank</th>
                <th>Supplier</th>
              </tr>
            </tbody>
            {returnedFeedPurchase.name &&
              sortFeedPurchase.map((feedPurchase) => {
                const {
                  FeedPurchaseId,
                  PurchaseDate,
                  LotNo,
                  InvoiceNo,
                  FeedName,
                  BagWeight,
                  Qty,
                  UnitPrice,
                  Amount,
                  PmtType,
                  BankName,
                  SupplierName,
                } = feedPurchase;
                const newDate = `${new Date(
                  PurchaseDate
                ).toLocaleDateString()}`;
                return (
                  <tbody key={FeedPurchaseId}>
                    <tr>
                      <td>{newDate}</td>
                      <td>{LotNo}</td>
                      <td>{InvoiceNo}</td>
                      <td>{FeedName}</td>
                      <td>{BagWeight}</td>
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
