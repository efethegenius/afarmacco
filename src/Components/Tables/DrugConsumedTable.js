import React, { useState, useEffect } from "react";

export const DrugConsumedTable = React.forwardRef((props, ref) => {
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [returnedDrugConsumed, setReturnedDrugConsumed] = useState([]);
  const [birdFilter, setBirdFilter] = useState("");
  const [drugFilter, setDrugFilter] = useState("");

  // getting drug consumed start-----------------------------------------------------
  const getAllDrugConsumed = async () => {
    try {
      const allDrugConsumed = await fetch("/api/all-drug-consumed", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedDrugConsumed(allDrugConsumed);
    } catch (error) {
      console.log(error);
    }
  };
  // getting drug consumed end-----------------------------------------------------
  useEffect(() => {
    getAllDrugConsumed();
  }, []);

  let allDrugConsumed = returnedDrugConsumed.name;

  const sortDrugConsumed =
    returnedDrugConsumed.name && fromDate && toDate
      ? returnedDrugConsumed.name.filter(
          (sortedDrugConsumed) =>
            sortedDrugConsumed.ConsumptionDate >= fromDate &&
            sortedDrugConsumed.ConsumptionDate <= toDate
        )
      : returnedDrugConsumed.name && birdFilter
      ? returnedDrugConsumed.name.filter(
          (sortedDrugConsumed) => sortedDrugConsumed.BirdName === birdFilter
        )
      : returnedDrugConsumed.name && drugFilter
      ? returnedDrugConsumed.name.filter(
          (sortedDrugConsumed) => sortedDrugConsumed.DrugName === drugFilter
        )
      : allDrugConsumed;

  // calculating totals-----------------------------------------------------------------
  let totalAmount;
  if (returnedDrugConsumed.name) {
    totalAmount = sortDrugConsumed.reduce((a, v) => (a = a + v.AmountUsed), 0);
  }
  let totalSatchet;
  if (returnedDrugConsumed.name) {
    totalSatchet = sortDrugConsumed.reduce(
      (a, v) => (a = a + v.SatchetQtyUsed),
      0
    );
  }
  let totalSize;
  if (returnedDrugConsumed.name) {
    totalSize = sortDrugConsumed.reduce((a, v) => (a = a + v.SizeQtyUsed), 0);
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
      </div>
      {sortDrugConsumed && sortDrugConsumed.length === 0 ? (
        <div className="empty-main-report">
          <h1>Oops! There are no Drug consumption report available yet</h1>
          <p>
            Create a new report by tapping the <span>NEW</span> button...
          </p>
        </div>
      ) : sortDrugConsumed ? (
        <div className="table-container" ref={ref}>
          <table>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Lot No</th>
                <th>Drug</th>
                <th>Bird Type</th>
                <th>Batch</th>
                <th>Satchet(Qty Used)</th>
                <th>Size (Qty Used)</th>
                <th>Unit Price</th>
                <th>Amount Used</th>
              </tr>
            </tbody>
            {returnedDrugConsumed.name &&
              sortDrugConsumed.map((drugConsumed) => {
                const {
                  DrugConsumptionId,
                  ConsumptionDate,
                  LotNo,
                  DrugName,
                  BirdName,
                  Batch,
                  SatchetQtyUsed,
                  SizeQtyUsed,
                  UnitPrice,
                  AmountUsed,
                } = drugConsumed;
                const newDate = `${new Date(
                  ConsumptionDate
                ).toLocaleDateString()}`;
                return (
                  <tbody key={DrugConsumptionId}>
                    <tr>
                      <td>{newDate}</td>
                      <td>{LotNo}</td>
                      <td>{DrugName}</td>
                      <td>{BirdName}</td>
                      <td>{Batch}</td>
                      <td>{formatMoney(SatchetQtyUsed)}</td>
                      <td>{formatMoney(SizeQtyUsed)}</td>
                      <td>{formatMoney(UnitPrice)}.00</td>
                      <td>{formatMoney(AmountUsed)}.00</td>
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
                <td className="total">{formatMoney(totalSatchet)}</td>
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
