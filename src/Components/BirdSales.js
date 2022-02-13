import React, { useState, useContext, useEffect } from "react";
import {
  FetchBanks,
  FetchBirds,
  FetchMethods,
} from "../FetchOptions/FetchOptions";
import { AuthContext } from "../helpers/AuthContext";
import "animate.css";

export const BirdSales = ({
  isBirdForm,
  getAllBirdSales,
  setIsBirdForm,
  getActiveDebtors,
  animState,
  setAnimState,
}) => {
  const [returnedData, setReturnedData] = useState();
  const { returnedBirds } = FetchBirds();
  const { returnedBanks } = FetchBanks();
  const { returnedMethods } = FetchMethods();
  const { upd, setUpd } = useContext(AuthContext);

  const [sales, setSales] = useState({
    SalesDate: 0,
    Reference: 0,
    BirdType: "",
    Batch: 0,
    Qty: 0,
    UnitPrice: 0,
    PmtMethod: "",
    Debtor: "",
    BankName: "",
    UpdType: 1,
    RecId: 0,
  });

  const newSales = async () => {
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
    console.log(newData);
    setReturnedData(newData[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    if (
      name === "Reference" ||
      name === "Batch" ||
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

  const handleSubmit = () => {
    newSales();
    setTimeout(() => {
      getAllBirdSales();
      getActiveDebtors();
    }, 1500);
  };

  useEffect(() => {
    if (upd) {
      setSales((prevState) => ({
        ...prevState,
        UpdType: 1,
      }));
    }
  }, []);

  let birdTypes;
  if (returnedBirds.name) {
    birdTypes = returnedBirds.name.map((bird) => {
      return <option key={bird.BirdTypeId}>{bird.BirdName}</option>;
    });
  }
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

  return (
    <div
      className={`${
        isBirdForm && animState
          ? "bird-sale animate__animated animate__fadeInDown"
          : !isBirdForm && animState
          ? "hide-bird-sale"
          : "bird-sale animate__animated animate__fadeOutUp"
      }`}
    >
      <section className="form-bird-sale">
        <h2 className="form-head">Bird Sale</h2>
        <div className="input">
          <label htmlFor="SalesDate"> Date</label>
          <input
            type="date"
            name="SalesDate"
            id="SalesDate"
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
        <div className="bird-type-container">
          <div className="input">
            <label htmlFor="BirdType">Bird</label>
            <select name="BirdType" id="BirdType" onChange={handleChange}>
              <option></option>
              {birdTypes}
            </select>
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
            setIsBirdForm(false);
            setAnimState(false);
            setTimeout(() => {
              setAnimState(true);
            }, 1000);
          }}
        >
          Create
        </button>
        <button
          className="btn-discard"
          onClick={() => {
            setIsBirdForm(false);
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
