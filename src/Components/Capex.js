import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

import {
  FetchBanks,
  FetchMethods,
  FetchAssetTypes,
  FetchTxnTypes,
} from "../FetchOptions/FetchOptions";

export const Capex = ({
  isCapexForm,
  setIsCapexForm,
  getCapexs,
  animState,
  setAnimState,
  getActiveCreditors,
  getActiveDebtors,
}) => {
  const [returnedData, setReturnedData] = useState();
  const { returnedBanks } = FetchBanks();
  const { returnedMethods } = FetchMethods();
  const [fieldErr, setFieldErr] = useState(false);
  const { returnedAssetTypes } = FetchAssetTypes();
  const { returnedTxnTypes } = FetchTxnTypes();
  const { upd, setUpd, capexTxn, setCapexTxn } = useContext(AuthContext);
  const [capex, setCapex] = useState({
    TxnType: "",
    TxnDate: 0,
    AssetType: "",
    FADesc: "",
    FACode: "",
    Lifespan: 0,
    Amount: 0,
    PmtMethod: "",
    BankName: "",
    Debtor: "",
    Creditor: "",
    UpdType: 1,
    RecId: 0,
  });

  //   OnChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (
      name === "Lifespan" ||
      name === "Amount" ||
      name === "UpdType" ||
      name === "RecId"
    ) {
      setCapex((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setCapex((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Send data to the backend when submitted
  const newCapexTxn = async () => {
    const newData = await fetch("create/capex", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        ...capex,
      }),
    }).then((res) => res.json());
    setReturnedData(newData[0]);
    setIsCapexForm(false);
    setAnimState(false);
    setTimeout(() => {
      setAnimState(true);
    }, 1000);
    setCapexTxn(true);
    setTimeout(() => {
      setCapexTxn(false);
    }, 4000);
  };

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    newCapexTxn();
    setTimeout(() => {
      getActiveCreditors();
      getActiveDebtors();
      getCapexs();
    }, 1500);
  };

  useEffect(() => {
    if (upd) {
      setCapex((prevState) => ({
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
  let assets;
  if (returnedAssetTypes.name) {
    assets = returnedAssetTypes.name.map((asset) => {
      return <option key={asset.AssetTypeId}>{asset.AssetTypeDesc}</option>;
    });
  }
  let txnTypes;
  if (returnedTxnTypes.name) {
    txnTypes = returnedTxnTypes.name.map((txnType) => {
      return <option key={txnType.TxnTypeId}>{txnType.TxnType}</option>;
    });
  }

  return (
    <div
      className={`${
        isCapexForm
          ? "capexs animate__animated animate__fadeInDown"
          : !isCapexForm && animState
          ? "hide-capexs"
          : "capexs animate__animated animate__fadeOutUp"
      }`}
    >
      <section className="form-capex">
        <h2 className="form-head">Capex</h2>
        {fieldErr && (
          <p className="form-err animate__animated animate__shakeX">
            All required fields must be filled
          </p>
        )}
        <div className="double-input">
          <div className="input">
            <label htmlFor="TxnType">Transaction Type</label>
            <select name="TxnType" id="TxnType" onChange={handleChange}>
              <option></option>
              {txnTypes}
            </select>
          </div>
          <div className="input">
            <label htmlFor="TxnDate">Date</label>
            <input
              type="date"
              name="TxnDate"
              id="TxnDate"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="double-input">
          {capex.TxnType !== "Disposal" && (
            <div className="input">
              <label htmlFor="AssetType">Asset Type</label>
              <select name="AssetType" id="AssetType" onChange={handleChange}>
                <option></option>
                {assets}
              </select>
            </div>
          )}
          <div className="input">
            <label htmlFor="FACode">Asset Code</label>
            <input
              type="text"
              name="FACode"
              id="FACode"
              onChange={handleChange}
            />
          </div>
        </div>
        {capex.TxnType !== "Disposal" && (
          <div className="input">
            <label htmlFor="FADesc">Asset Description</label>
            <input
              type="text"
              name="FADesc"
              id="FADesc"
              onChange={handleChange}
            />
          </div>
        )}
        <div className="double-input">
          {capex.TxnType !== "Disposal" && (
            <div className="input">
              <label htmlFor="Lifespan">Lifespan (years)</label>
              <input
                type="number"
                name="Lifespan"
                id="Lifespan"
                onChange={handleChange}
              />
            </div>
          )}
          <div className="input">
            <label htmlFor="Amount">Amount</label>
            <input
              type="number"
              name="Amount"
              id="Amount"
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
        {capex.PmtMethod === "Bank" && (
          <div className="input">
            <label htmlFor="BankName">Bank</label>
            <select name="BankName" id="BankName" onChange={handleChange}>
              <option></option>
              {bankNames}
            </select>
          </div>
        )}
        {capex.TxnType === "Disposal" && capex.PmtMethod === "Credit" && (
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
        {capex.TxnType === "Purchase" && capex.PmtMethod === "Credit" && (
          <div className="input">
            <label htmlFor="Creditor">Creditor</label>
            <input
              type="text"
              name="Creditor"
              id="Creditor"
              onChange={handleChange}
            />
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
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Create
        </button>
        <button
          className="btn-discard"
          onClick={() => {
            setIsCapexForm(false);
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
