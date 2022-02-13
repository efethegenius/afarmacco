import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import "../Styles/Debtor.css";

export const Creditor = () => {
  const [returnedActiveCreditors, setReturnedActiveCreditors] = useState([]);

  const [name, setName] = useState("");
  const [item, setItem] = useState("");
  const [cost, setCost] = useState(0);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [qty, setQty] = useState(0);
  const { id } = useParams();

  // getting active creditors start-----------------------------------------------------
  const getActiveCreditors = async () => {
    try {
      const activeCreditors = await fetch(
        "https://afarmacco-api.herokuapp.com/api/active-creditors",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
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
        (creditor) => creditor.SupplierId === parseInt(id)
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
        </div>
      </div>
    </div>
  );
};
