import React, { useState, useContext, useEffect } from "react";

import {
  FetchDrugs,
  FetchBanks,
  FetchMethods,
} from "../FetchOptions/FetchOptions";
import { AuthContext } from "../helpers/AuthContext";

export const DrugPurchase = ({
  isDrugPurchaseForm,
  getAllDrugPurchase,
  getActiveCreditors,
  setIsDrugPurchaseForm,
  animState,
  setAnimState,
}) => {
  const [returnedData, setReturnedData] = useState();
  const { returnedDrugs } = FetchDrugs();
  const { returnedBanks } = FetchBanks();
  const { returnedMethods } = FetchMethods();
  const { upd, setUpd } = useContext(AuthContext);

  const [purchase, setPurchase] = useState({
    LotNo: 0,
    PurchaseDate: 0,
    InvoiceNo: 0,
    DrugName: "",
    BagWeight: 0,
    Qty: 0,
    UnitPrice: 0,
    PmtMethod: "",
    Creditor: "",
    BankName: "",
    Updtype: 1,
    RecId: 0,
  });

  let drugTypes;
  if (returnedDrugs.name) {
    drugTypes = returnedDrugs.name.map((drug) => {
      return <option key={drug.DrugTypeId}>{drug.DrugName}</option>;
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

  const newPurchase = async () => {
    const newData = await fetch(
      "https://afarmacco-api.herokuapp.com/create/drug_purchase",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          ...purchase,
        }),
      }
    ).then((res) => res.json());
    console.log(newData);
    setReturnedData(newData[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (
      name === "LotNo" ||
      name === "InvoiceNo" ||
      name === "BagWeight" ||
      name === "Qty" ||
      name === "UnitPrice" ||
      name === "UpdType" ||
      name === "RecId"
    ) {
      setPurchase((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setPurchase((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    newPurchase();
    setTimeout(() => {
      getAllDrugPurchase();
      getActiveCreditors();
    }, 1500);
  };

  useEffect(() => {
    if (upd) {
      setPurchase((prevState) => ({
        ...prevState,
        UpdType: 1,
      }));
    }
  }, []);

  return (
    <div
      className={`${
        isDrugPurchaseForm && animState
          ? "drug-purchase animate__animated animate__fadeInDown"
          : !isDrugPurchaseForm && animState
          ? "hide-drug-purchase"
          : "drug-purchase animate__animated animate__fadeOutUp"
      }`}
    >
      <section className="form-drug-purchase">
        <h2 className="form-head">Drug Purchase</h2>
        <div className="input">
          <label htmlFor="PurchaseDate">Date</label>
          <input
            type="date"
            name="PurchaseDate"
            id="PurchaseDate"
            onChange={handleChange}
          />
        </div>
        <div className="qty-container">
          <div className="input">
            <label htmlFor="LotNo">Lot No</label>
            <input
              type="number"
              name="LotNo"
              id="LotNo"
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
        </div>
        <div className="input">
          <label htmlFor="DrugName">Drug</label>
          <select name="DrugName" id="DrugName" onChange={handleChange}>
            <option></option>
            {drugTypes}
          </select>
        </div>
        <div className="input">
          <label htmlFor="BagWeight">Bag Weight</label>
          <input
            type="number"
            name="BagWeight"
            id="BagWeight"
            onChange={handleChange}
          />
        </div>
        <div className="qty-container">
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
        {purchase.PmtMethod === "Credit" && (
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
        {purchase.PmtMethod === "Bank" && (
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
          <label htmlFor="RecId">RecId</label>
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
            setIsDrugPurchaseForm(false);
            handleSubmit();
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
            setIsDrugPurchaseForm(false);
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
