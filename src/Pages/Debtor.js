import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import "../Styles/Debtor.css";

import { useHistory } from "react-router-dom";

export const Debtor = () => {
  const [returnedActiveDebtors, setReturnedActiveDebtors] = useState([]);
  const [name, setName] = useState("");
  const [bird, setBird] = useState("");
  const [cost, setCost] = useState(0);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [qty, setQty] = useState(0);
  const { id } = useParams();

  const history = useHistory();

  // getting active debtors start-----------------------------------------------------
  const getActiveDebtors = async () => {
    try {
      const activeDebtors = await fetch(
        "https://afarmacco-api.herokuapp.com/api/active-debtors",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedActiveDebtors(activeDebtors);
    } catch (error) {
      console.log(error);
    }
  };
  // getting active debtors end-----------------------------------------------------

  const payDebt = async () => {
    try {
      await fetch("https://afarmacco-api.herokuapp.com/pay-debt", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: parseInt(id),
        }),
      }).then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  };

  //   let newDebtor;
  useEffect(() => {
    getActiveDebtors();
  }, []);
  useEffect(() => {
    if (returnedActiveDebtors.name) {
      const newDebtor = returnedActiveDebtors.name.find(
        (debtor) => debtor.CustomerId === parseInt(id)
      );
      console.log(newDebtor);

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
      <Navbar />
      <div className="income-container">
        <div className="debtor-info-container">
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
            onClick={() => {
              history.goBack();
              payDebt();
            }}
          >
            Mark as paid
          </button>
        </div>
      </div>
    </div>
  );
};
