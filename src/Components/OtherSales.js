import React, { useState, useContext, useEffect } from "react";
import {
  FetchBanks,
  FetchOtherItems,
  FetchMethods,
} from "../FetchOptions/FetchOptions";
import { AuthContext } from "../helpers/AuthContext";

export const OtherSales = ({
  isOtherForm,
  getAllOtherSales,
  setIsOtherForm,
  getActiveDebtors,
  animState,
  setAnimState,
}) => {
  const [returnedData, setReturnedData] = useState();
  const { returnedBanks } = FetchBanks();
  const { returnedMethods } = FetchMethods();
  const { returnedOtherItems } = FetchOtherItems();
  const { upd, setUpd } = useContext(AuthContext);
  const [fieldErr, setFieldErr] = useState(false);
  const [pmtErr, setPmtErr] = useState(false);

  const [sales, setSales] = useState({
    ItemDate: 0,
    Reference: 0,
    Item: "",
    Qty: 0,
    UnitPrice: 0,
    PmtMethod: "",
    Debtor: "",
    BankName: "",
    UpdType: 1,
    RecId: 0,
  });

  const newSales = async () => {
    if (
      !sales.Item ||
      !sales.ItemDate ||
      !sales.Qty ||
      !sales.UnitPrice ||
      !sales.PmtMethod
    ) {
      setFieldErr(true);
      setTimeout(function () {
        setFieldErr(false);
      }, 4000);
      return;
    }

    if (!sales.BankName && !sales.Debtor && sales.PmtMethod !== "Cash") {
      setPmtErr(true);
      setTimeout(function () {
        setPmtErr(false);
      }, 4000);
      return;
    }
    const newData = await fetch("/create/other_sales", {
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
    setReturnedData(newData[0]);
    setIsOtherForm(false);
    setAnimState(false);
    setTimeout(() => {
      setAnimState(true);
    }, 1000);
  };

  const handleSubmit = () => {
    newSales();
    setTimeout(() => {
      getAllOtherSales();
      getActiveDebtors();
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (
      name === "Reference" ||
      name === "Qty" ||
      name === "UnitPrice" ||
      name === "UpdType" ||
      name === "RecId"
    ) {
      setSales((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setSales((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (upd) {
      //changing the value of the action when the button is clicked
      setSales((prevState) => ({
        ...prevState,
        UpdType: 1,
      }));
    }
  }, []);

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
  let otherItems;
  if (returnedOtherItems.name) {
    otherItems = returnedOtherItems.name.map((otherItem) => {
      return <option key={otherItem.ItemId}>{otherItem.ItemName}</option>;
    });
  }

  return (
    <div
      className={`${
        isOtherForm && animState
          ? "other-sales animate__animated animate__fadeInDown"
          : !isOtherForm && animState
          ? "hide-other-sales"
          : "other-sales animate__animated animate__fadeOutUp"
      }`}
    >
      <section className="form-other-sales">
        <h2 className="form-head">Other Sale</h2>
        {fieldErr && (
          <p className="form-err animate__animated animate__shakeX">
            All required fields must be filled
          </p>
        )}
        <div className="input">
          <label htmlFor="ItemDate">Date</label>
          <input
            type="date"
            name="ItemDate"
            id="ItemDate"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="Reference">Reference</label>
          <input
            type="number"
            name="Reference"
            id="Reference"
            onChange={handleChange}
          />
        </div>

        <div className="input">
          <label htmlFor="Item">Item</label>
          <select name="Item" id="Item" onChange={handleChange}>
            <option></option>
            {otherItems}
          </select>
        </div>

        <div className="sale-qty-container">
          <div className="input">
            <label htmlFor="Qty">Quantity</label>
            <input type="number" name="Qty" id="Qty" onChange={handleChange} />
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
        {sales.PmtMethod === "Credit" && (
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

        {sales.PmtMethod === "Bank" && (
          <div className="input">
            <label htmlFor="BankName">Bank</label>
            <select name="BankName" id="BankName" onChange={handleChange}>
              <option></option>
              {bankNames}
            </select>
          </div>
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
            handleSubmit();
          }}
        >
          Create
        </button>
        <button
          className="btn-discard"
          onClick={() => {
            setIsOtherForm(false);
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
