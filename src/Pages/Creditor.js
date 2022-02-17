import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { AiOutlineLeft } from "react-icons/ai";
import "../Styles/Debtor.css";

export const Creditor = () => {
  const [returnedActiveCreditors, setReturnedActiveCreditors] = useState([]);

  const [name, setName] = useState("");
  const [returnedData, setReturnedData] = useState([]);
  const [item, setItem] = useState("");
  const [cost, setCost] = useState(0);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [qty, setQty] = useState(0);
  const { id } = useParams();
  const history = useHistory();
  const [creditorId, setCreditorId] = useState({ theCreditor: parseInt(id) });
  const [isConfirm, setIsConfirm] = useState(false);

  let d = new Date();

  let b = d.getMonth();
  let a = d.getMonth() + 3;

  console.log(a);
  console.log(b);

  const newCreditPay = async () => {
    const newData = await fetch("/create/creditor-pay", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        ...creditorId,
      }),
    }).then((res) => res.json());
    setReturnedData(newData[0]);
  };

  // getting active creditors start-----------------------------------------------------
  const getActiveCreditors = async () => {
    try {
      const activeCreditors = await fetch("/api/active-creditors", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedActiveCreditors(activeCreditors);
    } catch (error) {
      console.log(error);
    }
  };
  // getting active creditors end-----------------------------------------------------
  //   let newDebtor;
  useEffect(() => {
    getActiveCreditors();
  }, []);
  useEffect(() => {
    if (returnedActiveCreditors.name) {
      const newCreditor = returnedActiveCreditors.name.find(
        (creditor) => creditor.CreditorId === parseInt(id)
      );

      setName(newCreditor.SupplierName);
      setItem(newCreditor.PurchaseName);
      setDate(newCreditor.PurchaseDate);
      setCost(newCreditor.Cost);
      setAmount(newCreditor.Amount);
      setQty(newCreditor.Qty);
    }
  }, [id, returnedActiveCreditors.name]);

  console.log(name);
  return (
    <div className="income">
      <div
        className={`${isConfirm ? "form-background" : "hide-background"}`}
        onClick={() => {
          setIsConfirm(false);
        }}
      >
        <div className="pay-confirm">
          <p>Are you sure you want to mark this transaction as paid?</p>
          <div className="btn-pay-confirm">
            <button
              className="btn-order"
              onClick={() => {
                newCreditPay();
                history.goBack();
              }}
            >
              Confirm
            </button>
            <button className="btn-discard">Discard</button>
          </div>
        </div>
      </div>
      <Navbar />

      <div className="income-container">
        {returnedActiveCreditors.name ? (
          <div className="debtor-info-container">
            <button className="btn-back" onClick={() => history.goBack()}>
              <AiOutlineLeft />
              Go back
            </button>
            <div className="pay-status-container">
              <p className="status">Status</p>
              <div className="unpaid">
                <p>unpaid</p>
              </div>
            </div>
            <div className="debtor-details-container">
              <div className="debtor-details-wrapper">
                <div className="debtor-name-wrapper">
                  <p>Creditor Name</p>
                  <h3>{name}</h3>
                </div>
                <div className="debtor-name-wrapper">
                  <p>Date</p>
                  <h3>{date}</h3>
                </div>
              </div>
              <table className="debtor-table">
                <tbody>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Cost</th>
                    <th>Amount</th>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>{item}</td>
                    <td>{qty}</td>
                    <td>{cost}</td>
                    <td>{amount}</td>
                  </tr>
                </tbody>
              </table>
              <div className="debtor-total">
                <p>Amount Due</p>
                <h2>{amount}</h2>
              </div>
            </div>
            <button
              className="btn-pay"
              onClick={() => {
                setIsConfirm(!isConfirm);
              }}
            >
              Mark as paid
            </button>
          </div>
        ) : (
          <p>loading, please wait...</p>
        )}
      </div>
    </div>
  );
};
