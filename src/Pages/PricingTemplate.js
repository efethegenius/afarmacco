import React, { useState, useEffect, useRef, useContext } from "react";
import "../Styles/Expense.css";
import { AiOutlineMenu, AiOutlineLeft } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
import { AuthContext } from "../helpers/AuthContext";
import { Navbar } from "../Components/Navbar";
import { LoggedOut } from "../Components/LoggedOut";
import "../Styles/opex.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export const PricingTemplate = () => {
  const [isNav, setIsNav] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);
  const history = useHistory();
  const [showOptions, setShowOptions] = useState(false);
  const [batch, setBatch] = useState("");
  const [margin, setMargin] = useState("");
  const [returnedDocPurchase, setReturnedDocPurchase] = useState([]);
  const [returnedBirdSales, setReturnedBirdSales] = useState([]);
  const [returnedDocMortality, setReturnedDocMortality] = useState([]);

  const getAllDocPurchase = async () => {
    try {
      const allDocPurchase = await fetch("/api/all-doc-purchase", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedDocPurchase(allDocPurchase);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBirdSales = async () => {
    try {
      const allBirdSales = await fetch("/api/all-bird-sales", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedBirdSales(allBirdSales);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDocMortality = async () => {
    try {
      const allDocMortality = await fetch("/api/all-doc-mortality", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedDocMortality(allDocMortality);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllDocPurchase();
    getAllBirdSales();
    getAllDocMortality();
  }, []);

  let currentPurchase;
  if (returnedDocPurchase.name) {
    currentPurchase = returnedDocPurchase.name.filter(
      (item) => item.Batch === parseInt(batch)
    );
  }
  let currentSales;
  if (returnedBirdSales.name) {
    currentSales = returnedBirdSales.name.filter(
      (item) => item.Batch === parseInt(batch)
    );
  }
  let currentMortality;
  if (returnedDocMortality.name) {
    currentMortality = returnedDocMortality.name.filter(
      (item) => item.Batch === parseInt(batch)
    );
  }

  let purchaseQty;
  if (returnedDocPurchase.name) {
    purchaseQty = currentPurchase.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let salesQty;
  if (returnedBirdSales.name) {
    salesQty = currentSales.reduce((a, v) => (a = a + v.Qty), 0);
  }
  let mortalityQty;
  if (returnedDocMortality.name) {
    mortalityQty = currentMortality.reduce((a, v) => (a = a + v.Qty), 0);
  }

  let batchBalance;
  if (returnedDocPurchase.name) {
    batchBalance = purchaseQty - (salesQty + mortalityQty);
  }
  //   Expense Types------------------------------------------------------------------------------

  let production;
  if (returnedDocPurchase.name) {
    production = currentPurchase.filter(
      (opex) => opex.ExpenseName === "Production"
    );
  }
  let admin;
  if (returnedDocPurchase.name) {
    admin = currentPurchase.filter((opex) => opex.ExpenseName === "Admin");
  }
  let marketing;
  if (returnedDocPurchase.name) {
    marketing = currentPurchase.filter(
      (opex) => opex.ExpenseName === "Marketing(Advertising and Promotions)"
    );
  }
  let distribution;
  if (returnedDocPurchase.name) {
    distribution = currentPurchase.filter(
      (opex) => opex.ExpenseName === "Sales and Distribtions"
    );
  }
  //   Expense Types------------------------------------------------------------------------------

  let productionCost;
  if (returnedDocPurchase.name) {
    productionCost = production.reduce((a, v) => (a = a + v.Amount), 0);
  }
  let adminCost;
  if (returnedDocPurchase.name) {
    adminCost = admin.reduce((a, v) => (a = a + v.Amount), 0);
  }
  let marketingCost;
  if (returnedDocPurchase.name) {
    marketingCost = marketing.reduce((a, v) => (a = a + v.Amount), 0);
  }
  let distributionCost;
  if (returnedDocPurchase.name) {
    distributionCost = distribution.reduce((a, v) => (a = a + v.Amount), 0);
  }

  let totalCost;
  if (returnedDocPurchase.name) {
    totalCost = productionCost + adminCost + marketingCost + distributionCost;
  }
  let profitMargin;
  if (returnedDocPurchase.name) {
    profitMargin = (margin / 100) * totalCost;
  }
  let desiredSaleValue;
  if (returnedDocPurchase.name) {
    desiredSaleValue = profitMargin + totalCost;
  }

  return (
    <div className="drug">
      {/* <Navbar isNav={isNav} setIsNav={setIsNav} /> */}
      {authState ? (
        <div className="drug-container">
          <div className="drug-head">
            <button className="back-btn" onClick={() => history.goBack()}>
              <AiOutlineLeft /> Go back
            </button>
            <div className="drug-heading">
              <h1>Pricing Template</h1>
            </div>
            <p> </p>
          </div>
          <div className="pricing-container">
            <table className="pricing-table">
              <tbody>
                <tr>
                  <td>Batch No</td>
                  <td></td>
                  <td>
                    <input
                      id="batch"
                      name="batch"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Desired Profit Margin (%)</td>
                  <td></td>
                  <td>
                    <input
                      id="margin"
                      name="margin"
                      value={margin}
                      onChange={(e) => setMargin(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Profit Margin</td>
                  <td></td>
                  <td>{profitMargin}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>Summary Of Cost Profile (₦):</th>
                  <th></th>
                  <th></th>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Production Cost</td>
                  <td>{productionCost}</td>
                  <td></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Admin Cost</td>
                  <td>{adminCost}</td>
                  <td></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Marketing cost (Advertising & Promotion)</td>
                  <td>{marketingCost}</td>
                  <td></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Selling & Distribution cost</td>
                  <td>{distributionCost}</td>
                  <td></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>Total Cost</th>
                  <th></th>
                  <th>{totalCost}</th>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Desired Sales Value (₦)</td>
                  <td></td>
                  <td>{desiredSaleValue}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Quantity Of Units In The Batch</td>
                  <td></td>
                  <td>{batchBalance}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Selling Price per Unit in Batch (Naira)</td>
                  <td></td>
                  <td>{(totalCost / desiredSaleValue).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
