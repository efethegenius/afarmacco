import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { useHistory } from "react-router-dom";
import "../Styles/Debtor.css";
import { AiOutlineLeft } from "react-icons/ai";
export const Debtor = () => {
  const [returnedActiveDebtors, setReturnedActiveDebtors] = useState([]);
  const [returnedData, setReturnedData] = useState([]);
  const [name, setName] = useState("");
  const [bird, setBird] = useState("");
  const [cost, setCost] = useState(0);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [qty, setQty] = useState(0);
  const { id } = useParams();
  const history = useHistory();
  const [debtorId, setDebtorId] = useState({ theDebtor: parseInt(id) });
  const [isConfirm, setIsConfirm] = useState(false);
  console.log(debtorId);

  const newDebtPay = async () => {
    const newData = await fetch("/create/debtor-pay", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        ...debtorId,
      }),
    }).then((res) => res.json());
    setReturnedData(newData[0]);
  };

  // getting active debtors start-----------------------------------------------------
  const getActiveDebtors = async () => {
    try {
      const activeDebtors = await fetch("/api/active-debtors", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedActiveDebtors(activeDebtors);
    } catch (error) {
      console.log(error);
    }
  };
  // getting active debtors end-----------------------------------------------------
  //   let newDebtor;
  useEffect(() => {
    getActiveDebtors();
  }, []);
  useEffect(() => {
    if (returnedActiveDebtors.name) {
      const newDebtor = returnedActiveDebtors.name.find(
        (debtor) => debtor.DebtorId === parseInt(id)
      );
      setName(newDebtor.CustomerName);
      setBird(newDebtor.PurchaseName);
      setDate(newDebtor.PurchaseDate);
      setCost(newDebtor.Cost);
      setAmount(newDebtor.Amount);
      setQty(newDebtor.Qty);
    }
  }, [id, returnedActiveDebtors.name]);

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
                newDebtPay();
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
        <div className="debtor-info-container">
          <button className="btn-back" onClick={() => history.goBack()}>
            <AiOutlineLeft /> Go back
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
                <p>Debtor Name</p>
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
                  <td>{bird}</td>
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
      </div>
    </div>
  );
};
