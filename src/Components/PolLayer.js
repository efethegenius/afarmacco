import React, { useState, useContext, useEffect } from "react";
import { FetchBanks, FetchMethods } from "../FetchOptions/FetchOptions";
import { AuthContext } from "../helpers/AuthContext";
import "animate.css";

export const PolLayer = ({
  isPolLayerForm,
  setIsPolLayerForm,
  getAllPolLayers,
  animState,
  setAnimState,
  getActiveDebtors,
}) => {
  const [returnedData, setReturnedData] = useState([]);
  const [returnedSalesData, setReturnedSalesData] = useState([]);
  const [returnedPolSales, setReturnedPolSales] = useState([]);
  const [returnedPolMortality, setReturnedPolMortality] = useState([]);
  const [pmtErr, setPmtErr] = useState(false);
  const [fieldErr, setFieldErr] = useState(false);
  const { returnedMethods } = FetchMethods();
  const { upd, setUpd, setOpexTxn, opexTxn } = useContext(AuthContext);
  const { returnedBanks } = FetchBanks();
  const [txnType, setTxnType] = useState("");

  const [convert, setConvert] = useState({
    TxnDate: 0,
    InvoiceNo: 0,
    Batch: 0,
    Qty: 0,
    UnitPrice: 0,
    PmtMethod: "",
    Debtor: "",
    BankName: "",
    UpdType: 1,
    RecId: 0,
  });

  const [sales, setSales] = useState({
    TxnDate: 0,
    InvoiceNo: 0,
    BirdType: "Layer",
    Batch: 0,
    Qty: 0,
    UnitPrice: 0,
    PmtMethod: "",
    Debtor: "",
    BankName: "",
    UpdType: 1,
    RecId: 0,
  });

  const [polSales, setPolSales] = useState({
    TxnDate: 0,
    InvoiceNo: 0,
    Batch: 0,
    Qty: 0,
    UnitPrice: 0,
    PmtMethod: "",
    Debtor: "",
    BankName: "",
    UpdType: 1,
    RecId: 0,
  });

  const [polMortality, setPolMortality] = useState({
    TxnDate: 0,
    Batch: 0,
    Qty: 0,
    UpdType: 1,
    RecId: 0,
  });

  const newConvert = async () => {
    // if (
    //   !sales.Batch ||
    //   !sales.PmtMethod ||
    //   !sales.CrateQty ||
    //   !sales.TxnDate ||
    //   !sales.UnitPrice
    // ) {
    //   setFieldErr(true);
    //   setTimeout(function () {
    //     setFieldErr(false);
    //   }, 4000);
    //   return;
    // }
    // if (
    //   !sales.BankName &&
    //   !sales.Debtor &&
    //   sales.PmtMethod !== "Cash" &&
    //   sales.PmtMethod !== "Other"
    // ) {
    //   setPmtErr(true);
    //   setTimeout(function () {
    //     setPmtErr(false);
    //   }, 4000);
    //   return;
    // }

    const newData = await fetch("create/pol_layer", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        ...convert,
      }),
    }).then((res) => res.json());
    setReturnedData(newData[0]);
    setIsPolLayerForm(false);
    setAnimState(false);
    setTimeout(() => {
      setAnimState(true);
    }, 1000);
    setOpexTxn(true);
    setTimeout(() => {
      setOpexTxn(false);
    }, 4000);
  };

  const newSales = async () => {
    // if (
    //   !sales.Batch ||
    //   !sales.BirdType ||
    //   !sales.PmtMethod ||
    //   !sales.Qty ||
    //   !sales.TxnDate ||
    //   !sales.UnitPrice
    // ) {
    //   setFieldErr(true);
    //   setTimeout(function () {
    //     setFieldErr(false);
    //   }, 4000);
    //   return;
    // }
    // if (
    //   !sales.BankName &&
    //   !sales.Debtor &&
    //   sales.PmtMethod !== "Cash" &&
    //   sales.PmtMethod !== "Other"
    // ) {
    //   setPmtErr(true);
    //   setTimeout(function () {
    //     setPmtErr(false);
    //   }, 4000);
    //   return;
    // }

    const newData = await fetch("/create/bird_sales", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        ...sales,
      }),
    }).then((res) => res.json());
    setReturnedSalesData(newData[0]);
    setIsPolLayerForm(false);
    setAnimState(false);
    setTimeout(() => {
      setAnimState(true);
    }, 1000);
    setOpexTxn(true);
    setTimeout(() => {
      setOpexTxn(false);
    }, 4000);
  };
  const newPolSales = async () => {
    // if (
    //   !sales.Batch ||
    //   !sales.BirdType ||
    //   !sales.PmtMethod ||
    //   !sales.Qty ||
    //   !sales.TxnDate ||
    //   !sales.UnitPrice
    // ) {
    //   setFieldErr(true);
    //   setTimeout(function () {
    //     setFieldErr(false);
    //   }, 4000);
    //   return;
    // }
    // if (
    //   !sales.BankName &&
    //   !sales.Debtor &&
    //   sales.PmtMethod !== "Cash" &&
    //   sales.PmtMethod !== "Other"
    // ) {
    //   setPmtErr(true);
    //   setTimeout(function () {
    //     setPmtErr(false);
    //   }, 4000);
    //   return;
    // }

    const newData = await fetch("/create/pol_sales", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        ...polSales,
      }),
    }).then((res) => res.json());
    setReturnedPolSales(newData[0]);
    setIsPolLayerForm(false);
    setAnimState(false);
    setTimeout(() => {
      setAnimState(true);
    }, 1000);
    setOpexTxn(true);
    setTimeout(() => {
      setOpexTxn(false);
    }, 4000);
  };

  const newPolMortality = async () => {
    // if (
    //   !sales.Batch ||
    //   !sales.BirdType ||
    //   !sales.PmtMethod ||
    //   !sales.Qty ||
    //   !sales.TxnDate ||
    //   !sales.UnitPrice
    // ) {
    //   setFieldErr(true);
    //   setTimeout(function () {
    //     setFieldErr(false);
    //   }, 4000);
    //   return;
    // }
    // if (
    //   !sales.BankName &&
    //   !sales.Debtor &&
    //   sales.PmtMethod !== "Cash" &&
    //   sales.PmtMethod !== "Other"
    // ) {
    //   setPmtErr(true);
    //   setTimeout(function () {
    //     setPmtErr(false);
    //   }, 4000);
    //   return;
    // }

    const newData = await fetch("/create/pol_mortality", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        ...polMortality,
      }),
    }).then((res) => res.json());
    setReturnedPolMortality(newData[0]);
    setIsPolLayerForm(false);
    setAnimState(false);
    setTimeout(() => {
      setAnimState(true);
    }, 1000);
    setOpexTxn(true);
    setTimeout(() => {
      setOpexTxn(false);
    }, 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (
      name === "InvoiceNo" ||
      name === "InvoiceNo" ||
      name === "Batch" ||
      name === "Qty" ||
      name === "UnitPrice" ||
      name === "UpdType" ||
      name === "RecId"
    ) {
      setConvert((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      setSales((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      setPolSales((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      setPolMortality((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setConvert((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setSales((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setPolSales((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setPolMortality((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    newConvert();
    newSales();
    setTimeout(() => {
      getAllPolLayers();
      getActiveDebtors();
    }, 1500);
  };

  const handlePolSales = () => {
    newPolSales();
    setTimeout(() => {
      getAllPolLayers();
      getActiveDebtors();
    }, 1500);
  };
  const handlePolMortality = () => {
    newPolMortality();
    setTimeout(() => {
      getAllPolLayers();
      getActiveDebtors();
    }, 1500);
  };

  let bankNames;
  if (returnedBanks.name) {
    bankNames = returnedBanks.name.map((bank) => {
      return <option key={bank.BankId}>{bank.BankName}</option>;
    });
  }
  let methods;
  if (returnedMethods.name) {
    methods = returnedMethods.name.map((method) => {
      return <option key={method.PmtMethodId}>{method.PmtType}</option>;
    });
  }
  useEffect(() => {
    if (upd) {
      setConvert((prevState) => ({
        ...prevState,
        UpdType: 1,
      }));
    }
  }, []);

  return (
    <div
      className={`${
        isPolLayerForm && animState
          ? "bird-sale animate__animated animate__fadeInDown"
          : !isPolLayerForm && animState
          ? "hide-bird-sale"
          : "bird-sale animate__animated animate__fadeOutUp"
      }`}
    >
      <section className="form-bird-sale">
        <h2 className="form-head">POL Transactions</h2>
        {fieldErr && (
          <p className="form-err animate__animated animate__shakeX">
            All required fields must be filled
          </p>
        )}
        <div className="input">
          <label htmlFor="TxnType">Transaction Type</label>
          <select
            name="txnType"
            id="txnType"
            value={txnType}
            onChange={(e) => setTxnType(e.target.value)}
          >
            <option></option>
            <option>DOC layer to POL</option>
            <option>POL Sales</option>
            <option>POL Mortality</option>
          </select>
        </div>
        {/* General----------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        {txnType === "DOC layer to POL" && (
          <>
            <div className="input">
              <label htmlFor="TxnDate"> Date</label>
              <input
                type="date"
                name="TxnDate"
                id="TxnDate"
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="InvoiceNo">Invoice No</label>
              <input
                type="number"
                name="InvoiceNo"
                id="InvoiceNo"
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Batch">Batch</label>
              <input
                type="number"
                name="Batch"
                id="Batch"
                onChange={handleChange}
              />
            </div>
            <div className="sale-qty-container">
              <div className="input">
                <label htmlFor="Qty">Qty</label>
                <input
                  type="number"
                  name="Qty"
                  id="Qty"
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <label htmlFor="UnitPrice">Unit Price</label>
                <input
                  type="number"
                  name="UnitPrice"
                  id="UnitPrice"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input">
              <label htmlFor="PmtMethod">Payment Method</label>
              <select name="PmtMethod" id="PmtMethod" onChange={handleChange}>
                <option></option>
                {methods}
              </select>
            </div>
            {pmtErr && (
              <p className="form-err animate__animated animate__shakeX">
                Please select a payment method
              </p>
            )}
            {convert.PmtMethod === "Credit" && (
              <div className="input">
                <label htmlFor="Debtor">Debtor</label>
                <input
                  type="text"
                  name="Debtor"
                  id="Debtor"
                  onChange={handleChange}
                />
              </div>
            )}
            {convert.PmtMethod === "Bank" && (
              <div className="input">
                <label htmlFor="BankName">Bank</label>
                <select name="BankName" id="BankName" onChange={handleChange}>
                  <option></option>
                  {bankNames}
                </select>
              </div>
            )}
          </>
        )}

        {/* sales----------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        {txnType === "POL Sales" && (
          <>
            <div className="input">
              <label htmlFor="TxnDate"> Date</label>
              <input
                type="date"
                name="TxnDate"
                id="TxnDate"
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="InvoiceNo">Invoice No</label>
              <input
                type="number"
                name="InvoiceNo"
                id="InvoiceNo"
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Batch">Batch</label>
              <input
                type="number"
                name="Batch"
                id="Batch"
                onChange={handleChange}
              />
            </div>
            <div className="sale-qty-container">
              <div className="input">
                <label htmlFor="Qty">Qty</label>
                <input
                  type="number"
                  name="Qty"
                  id="Qty"
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <label htmlFor="UnitPrice">Unit Price</label>
                <input
                  type="number"
                  name="UnitPrice"
                  id="UnitPrice"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input">
              <label htmlFor="PmtMethod">Payment Method</label>
              <select name="PmtMethod" id="PmtMethod" onChange={handleChange}>
                <option></option>
                {methods}
              </select>
            </div>
            {pmtErr && (
              <p className="form-err animate__animated animate__shakeX">
                Please select a payment method
              </p>
            )}
            {convert.PmtMethod === "Credit" && (
              <div className="input">
                <label htmlFor="Debtor">Debtor</label>
                <input
                  type="text"
                  name="Debtor"
                  id="Debtor"
                  onChange={handleChange}
                />
              </div>
            )}
            {convert.PmtMethod === "Bank" && (
              <div className="input">
                <label htmlFor="BankName">Bank</label>
                <select name="BankName" id="BankName" onChange={handleChange}>
                  <option></option>
                  {bankNames}
                </select>
              </div>
            )}
          </>
        )}
        {/* mortality----------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        {txnType === "POL Mortality" && (
          <>
            <div className="input">
              <label htmlFor="TxnDate"> Date</label>
              <input
                type="date"
                name="TxnDate"
                id="TxnDate"
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Batch">Batch</label>
              <input
                type="number"
                name="Batch"
                id="Batch"
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Qty">Qty</label>
              <input
                type="number"
                name="Qty"
                id="Qty"
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div className="input upd-type">
          <label htmlFor="UpdType">Upd Type</label>
          <input
            type="number"
            name="UpdType"
            id="UpdType"
            onChange={handleChange}
          />
        </div>
        <div className="input rec-id">
          <label htmlFor="RecId">Rec Id</label>
          <input
            type="number"
            name="RecId"
            id="RecId"
            onChange={handleChange}
          />
        </div>
      </section>
      <div className="new-order-wrapper">
        <button
          className="btn-order"
          type="submit"
          onClick={() => {
            if (txnType === "DOC layer to POL") {
              handleSubmit();
              return;
            }
            if (txnType === "POL Sales") {
              handlePolSales();
              return;
            }
            if (txnType === "POL Mortality") {
              handlePolMortality();
              return;
            }
          }}
        >
          Create
        </button>
        <button
          className="btn-discard"
          onClick={() => {
            setIsPolLayerForm(false);
            setAnimState(false);
            setTimeout(() => {
              setAnimState(true);
            }, 1000);
          }}
        >
          Discard
        </button>
      </div>
    </div>
  );
};
