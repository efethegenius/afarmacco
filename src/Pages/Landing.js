import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { AuthContext } from "../helpers/AuthContext";
import "../Styles/Landing.css";

export const Landing = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);

  return (
    <div className="landing-container">
      <div
        className={`${isConfirm ? "form-background" : "hide-background"}`}
        onClick={() => {
          setIsConfirm(false);
        }}
      >
        <div className="pay-confirm">
          <p>Are you sure you want log out?</p>
          <div className="btn-pay-confirm">
            <button
              className="btn-order"
              onClick={() => {
                setAuthState(false);
                localStorage.clear("accessToken");
              }}
            >
              Confirm
            </button>
            <button className="btn-discard">Discard</button>
          </div>
        </div>
      </div>
      <div className="landing-wrapper">
        <div className="header">
          <h2>
            <span className="land-logo">
              afarmacco<span>&#174;</span>
            </span>
            <span> </span> : Poultry Farm Management Solution
          </h2>
          <button
            className="btn-logout"
            onClick={() => {
              setIsConfirm(true);
            }}
          >
            <BiLogOut className="logout-icon" /> Log out
          </button>
        </div>
        <div className="modules-container">
          <div className="module module1">
            <div className="fin-container">
              <h3>Financial Records & Accounting</h3>
            </div>
            <div className="fin-modules">
              <div className="plan-container">
                {/* <h3>PLAN</h3> */}
                <div className="plan-btn-container">
                  <Link to="/inventory">
                    <button>Inventory</button>
                  </Link>
                  <Link to="/financial-report">
                    <button>Financial Reports</button>
                  </Link>
                  <Link to="/pricing-template">
                    <button>Pricing Template</button>
                  </Link>
                </div>
              </div>
              <div className="actuals-container">
                {/* <h3>ACTUALS</h3> */}
                <div className="actuals-modules">
                  <div className="actual-module income-module">
                    <div className="actual-module-header">
                      <h5>Income</h5>
                    </div>
                    <div className="actual-module-btn-container">
                      <Link to="/sales-page">
                        <button>Sales</button>
                      </Link>
                      <Link to="/other-income">
                        <button>Other Income</button>
                      </Link>
                    </div>
                  </div>
                  <div className="actual-module expense-module">
                    <div className="actual-module-header">
                      <h5>Expenses</h5>
                    </div>
                    <div className="actual-module-btn-container">
                      <Link to="/capex">
                        <button>Capex</button>
                      </Link>
                      <Link to="/opex">
                        <button>Opex</button>
                      </Link>
                    </div>
                  </div>
                  <div className="actual-module Assets-module">
                    <div className="actual-module-header">
                      <h5>Assets</h5>
                    </div>
                    <div className="actual-module-btn-container">
                      <Link to="/debtors">
                        <button>Debtors</button>
                      </Link>
                      <Link to="cash-book">
                        <button>Cash Book</button>
                      </Link>
                    </div>
                  </div>
                  <div className="actual-module Liabilities-module">
                    <div className="actual-module-header">
                      <h5>Liabilities</h5>
                    </div>
                    <div className="actual-module-btn-container">
                      <Link to="/capital">
                        <button>Capital</button>
                      </Link>
                      <Link to="/creditors">
                        <button>Creditors</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="module module2">
            <div className="health-container">
              <h3>Health Management & Production</h3>
            </div>
            <div className="health-modules">
              <Link to="/health">Medication & Vaccination Programme</Link>
              <Link to="/coming-soon">Extention Services</Link>
            </div>
          </div>
          <div className="module module3">
            <div className="produce-container">
              <h3>Produce Marketing & Sales</h3>
            </div>
            <div className="produce-modules">
              <Link to="/chicken-trade">Chicken Trade & Exchange</Link>
            </div>
          </div>
          <div className="resource-container">
            <div className="produce-container resource-wrapper">
              <h3>Farm Human Resource</h3>
            </div>
            <div className="produce-modules resource-modules">
              <Link to="/farm-hands">Farm Hands: Sourcing & Placements</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
