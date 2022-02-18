import React, { useState, useContext, useEffect } from "react";
import {
  FetchFeeds,
  FetchBanks,
  FetchMethods,
} from "../FetchOptions/FetchOptions";
import { AuthContext } from "../helpers/AuthContext";

export const FeedPurchase = ({
  isFeedPurchaseForm,
  setIsFeedPurchaseForm,
  getAllFeedPurchase,
  getActiveCreditors,
  animState,
  setAnimState,
}) => {
  const [returnedData, setReturnedData] = useState();
  const { returnedFeeds } = FetchFeeds();
  const { returnedBanks } = FetchBanks();
  const { returnedMethods } = FetchMethods();
  const { upd, setUpd } = useContext(AuthContext);
  const [fieldErr, setFieldErr] = useState(false);
  const [pmtErr, setPmtErr] = useState(false);

  const [purchase, setPurchase] = useState({
    LotNo: 0,
    PurchaseDate: 0,
    InvoiceNo: 0,
    FeedType: "",
    BagWeight: 0,
    Qty: 0,
    UnitPrice: 0,
    PmtMethod: "",
    BankName: "",
    Creditor: "",
    Updtype: 1,
    RecId: 0,
  });

  let feedTypes;
  if (returnedFeeds.name) {
    feedTypes = returnedFeeds.name.map((feed) => {
      return <option key={feed.FeedTypeId}>{feed.FeedName}</option>;
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
    if (
      !purchase.FeedType ||
      !purchase.LotNo ||
      !purchase.PmtMethod ||
      !purchase.PurchaseDate ||
      !purchase.Qty ||
      !purchase.UnitPrice
    ) {
      setFieldErr(true);
      setTimeout(function () {
        setFieldErr(false);
      }, 4000);
      return;
    }
    if (
      !purchase.BankName &&
      !purchase.Creditor &&
      purchase.PmtMethod !== "Cash"
    ) {
      setPmtErr(true);
      setTimeout(function () {
        setPmtErr(false);
      }, 4000);
      return;
    }
    const newData = await fetch(
      "https://afarmacco-api.herokuapp.com/create/feed_purchase",
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
    setReturnedData(newData[0]);
    setIsFeedPurchaseForm(false);
    setAnimState(false);
    setTimeout(() => {
      setAnimState(true);
    }, 1000);
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
      getAllFeedPurchase();
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
        isFeedPurchaseForm && animState
          ? "feed-purchase animate__animated animate__fadeInDown"
          : !isFeedPurchaseForm && animState
          ? "hide-feed-purchase"
          : "feed-purchase animate__animated animate__fadeOutUp"
      }`}
    >
      <section className="form-feed-purchase">
        <h2 className="form-head">Feed Purchase</h2>
        {fieldErr && (
          <p className="form-err animate__animated animate__shakeX">
            All required fields must be filled
          </p>
        )}
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
          <label htmlFor="FeedType">Feed</label>
          <select name="FeedType" id="FeedType" onChange={handleChange}>
            <option></option>
            {feedTypes}
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
        {pmtErr && (
          <p className="form-err animate__animated animate__shakeX">
            Please select a payment method
          </p>
        )}
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
            setIsFeedPurchaseForm(false);
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
