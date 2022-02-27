import React, { useEffect, useState } from "react";
import { Loading } from "../Loading";

export const OtherSalesTable = React.forwardRef((props, ref) => {
  const [toDate, setToDate] = useState("");
  const [returnedOtherSales, setReturnedOtherSales] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [filter, setFilter] = useState("");
  const [itemFilter, setItemFilter] = useState("");
  const [isDate, setIsDate] = useState(false);
  const [isPmt, setIsPmt] = useState(false);
  const [isItemFilter, setIsItemFilter] = useState(false);

  // getting other sales start-----------------------------------------------------
  const getAllOtherSales = async () => {
    try {
      const allOtherSales = await fetch("/api/all-other-sales", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedOtherSales(allOtherSales);
    } catch (error) {
      console.log(error);
    }
  };
  // getting other sales end-----------------------------------------------------

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  let allOtherSales = returnedOtherSales.name;

  const sortOtherSales =
    returnedOtherSales.name && fromDate && toDate
      ? returnedOtherSales.name.filter(
          (sortedSale) =>
            sortedSale.ItemDate >= fromDate && sortedSale.ItemDate <= toDate
        )
      : returnedOtherSales.name && filter
      ? returnedOtherSales.name.filter(
          (sortedSale) => sortedSale.PmtType === filter
        )
      : returnedOtherSales.name && itemFilter
      ? returnedOtherSales.name.filter(
          (sortedSale) => sortedSale.ItemName === itemFilter
        )
      : allOtherSales;

  useEffect(() => {
    getAllOtherSales();
  }, []);

  // calculating totals-----------------------------------------------------------------
  let totalAmount;
  if (returnedOtherSales.name) {
    totalAmount = sortOtherSales.reduce((a, v) => (a = a + v.Amount), 0);
  }
  let totalQty;
  if (returnedOtherSales.name) {
    totalQty = sortOtherSales.reduce((a, v) => (a = a + v.Qty), 0);
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
            setIsItemFilter(false);
            setToDate("");
            setFromDate("");
            setFilter("");
            setItemFilter("");
          }}
        >
          Date
        </button>
        <button
          onClick={() => {
            setIsPmt(!isPmt);
            setIsDate(false);
            setIsItemFilter(false);
            setToDate("");
            setFromDate("");
            setFilter("");
            setItemFilter("");
          }}
        >
          Payment method
        </button>
        <button
          onClick={() => {
            setIsItemFilter(!isItemFilter);
            setIsDate(false);
            setIsPmt(false);
            setToDate("");
            setFromDate("");
            setFilter("");
            setItemFilter("");
          }}
        >
          Item
        </button>
      </div>
      <div className="sort-report">
        {isDate && (
          <div className="sort-date">
            <label htmlFor="fromDate">From</label>
            <input
              type="date"
              name="fromDate"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <label htmlFor="toDate">To</label>
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
            <label htmlFor="filter">Payment Method</label>
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
        {isItemFilter && (
          <div className="item-filter">
            <label htmlFor="itemfilter">Item</label>
            <select
              name="itemfilter"
              id="itemfilter"
              value={itemFilter}
              onChange={(e) => setItemFilter(e.target.value)}
            >
              <option></option>
              <option>Used Bags</option>
              <option>Chicken Manure</option>
              <option>Discarded Utensils</option>
              <option>Others</option>
            </select>
          </div>
        )}
      </div>
      {sortOtherSales && sortOtherSales.length === 0 ? (
        <div className="empty-main-report">
          <h1>Oops! There are no Other Income report available yet</h1>
          <p>
            Create a new report by tapping the <span>NEW</span> button...
          </p>
        </div>
      ) : sortOtherSales ? (
        <div className="table-container" ref={ref}>
          <table id="table-to-xls">
            <tbody>
              <tr>
                <th>Date</th>
                <th>Ref</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th>Payment Type</th>
                <th>Bank</th>
                <th>Customer</th>
              </tr>
            </tbody>
            {returnedOtherSales.name &&
              sortOtherSales.map((otherSale) => {
                const {
                  OtherSalesId,
                  ItemDate,
                  Reference,
                  ItemName,
                  Qty,
                  UnitPrice,
                  Amount,
                  PmtType,
                  BankName,
                  CustomerName,
                } = otherSale;
                const newDate = `${new Date(ItemDate).toDateString()}`;
                return (
                  <tbody key={OtherSalesId}>
                    <tr>
                      <td>{newDate}</td>
                      <td>{Reference}</td>
                      <td>{ItemName}</td>
                      <td>{formatMoney(Qty)}</td>
                      <td>{formatMoney(UnitPrice)}.00</td>
                      <td>{formatMoney(Amount)}.00</td>
                      <td>{PmtType}</td>
                      <td>{BankName}</td>
                      <td>{CustomerName}</td>
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
                <td className="total"></td>
                <td className="total">{formatMoney(totalAmount)}.00</td>
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
