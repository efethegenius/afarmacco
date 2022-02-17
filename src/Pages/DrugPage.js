import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import "../Styles/Drug.css";
import { DrugConsumed } from "../Components/DrugConsumed";
import { DrugPurchase } from "../Components/DrugPurchase";
import { Navbar } from "../Components/Navbar";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { BsFileEarmarkText } from "react-icons/bs";
import { AuthContext } from "../helpers/AuthContext";
import { LoggedOut } from "../Components/LoggedOut";
import { DrugPurchaseTable } from "../Components/Tables/DrugPurchaseTable";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

import { DrugConsumedTable } from "../Components/Tables/DrugConsumedTable";

export const DrugPage = () => {
  const [returnedDrugPurchase, setReturnedDrugPurchase] = useState([]);
  const [returnedDrugConsumed, setReturnedDrugConsumed] = useState([]);
  const [returnedActiveCreditors, setReturnedActiveCreditors] = useState([]);
  const [isDrugToggle, setIsDrugToggle] = useState(true);
  const [isDrugPurchaseForm, setIsDrugPurchaseForm] = useState(false);
  const [isDrugConsumedForm, setIsDrugConsumedForm] = useState(false);
  const [isFullReport, setIsFullReport] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isNav, setIsNav] = useState(false);

  const { authState, setAuthState } = useContext(AuthContext);
  const [animState, setAnimState] = useState(true);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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

  // getting drug purchase start-----------------------------------------------------
  const getAllDrugPurchase = async () => {
    try {
      const allDrugPurchase = await fetch("/api/all-drug-purchase", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedDrugPurchase(allDrugPurchase);
    } catch (error) {
      console.log(error);
    }
  };
  // getting drug purchase end-----------------------------------------------------

  // getting drug consumed start-----------------------------------------------------
  const getAllDrugConsumed = async () => {
    try {
      const allDrugConsumed = await fetch("/api/all-drug-consumed", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedDrugConsumed(allDrugConsumed);
    } catch (error) {
      console.log(error);
    }
  };
  // getting drug consumed end-----------------------------------------------------

  useEffect(() => {
    getAllDrugPurchase();
    getActiveCreditors();
    getAllDrugConsumed();
  }, []);

  // sorting by date--------------------------------------------------------------------

  // Top 7 List----------------------------------------------------------------------------------
  let miniPurchaseList;
  if (returnedDrugPurchase.name) {
    miniPurchaseList = returnedDrugPurchase.name.map((purchase) => {
      const { DrugPurchaseId, PurchaseDate, DrugName, Qty, UnitPrice } =
        purchase;
      const newDate = `${new Date(PurchaseDate).toLocaleDateString()}`;
      return (
        <tbody key={DrugPurchaseId}>
          <tr>
            <td>{newDate}</td>
            <td>{DrugName}</td>
            <td>{Qty}</td>
            <td>{UnitPrice}</td>
          </tr>
        </tbody>
      );
    });
  }
  let miniConsumptionList;
  if (returnedDrugConsumed.name) {
    miniConsumptionList = returnedDrugConsumed.name.map((consumed) => {
      const {
        DrugConsumptionId,
        ConsumptionDate,
        DrugName,
        SatchetQtyUsed,
        UnitPrice,
      } = consumed;
      const newDate = `${new Date(ConsumptionDate).toLocaleDateString()}`;
      return (
        <tbody key={DrugConsumptionId}>
          <tr>
            <td>{newDate}</td>
            <td>{DrugName}</td>
            <td>{SatchetQtyUsed}</td>
            <td>{UnitPrice}</td>
          </tr>
        </tbody>
      );
    });
  }
  // Top 7 List----------------------------------------------------------------------------------

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  let activeCreditors;
  if (returnedActiveCreditors.name) {
    activeCreditors = returnedActiveCreditors.name.filter(
      (activeCreditor) =>
        activeCreditor.PurchaseType === "Drug Purchase" &&
        activeCreditor.Status === "UNPAID"
    );
  }

  let totalCredit;
  if (returnedActiveCreditors.name) {
    totalCredit = activeCreditors.reduce((a, v) => (a = a + v.Amount), 0);
  }

  let totalAmount;
  if (returnedDrugPurchase.name) {
    totalAmount = returnedDrugPurchase.name.reduce(
      (a, v) => (a = a + v.Amount),
      0
    );
  }
  let totalQty;
  if (returnedDrugPurchase.name) {
    totalQty = returnedDrugPurchase.name.reduce((a, v) => (a = a + v.Qty), 0);
  }

  let totalSatchet;
  if (returnedDrugConsumed.name) {
    totalSatchet = returnedDrugConsumed.name.reduce(
      (a, v) => (a = a + v.SatchetQtyUsed),
      0
    );
  }

  return (
    <div className="drug">
      <Navbar isNav={isNav} setIsNav={setIsNav} />
      {/* {(isDrugConsumedForm || isDrugPurchaseForm || isFullReport) && ( */}
      <div
        className={`${
          isDrugConsumedForm || isDrugPurchaseForm
            ? "form-background"
            : "hide-background"
        }`}
        onClick={() => {
          setIsDrugConsumedForm(false);
          setIsDrugPurchaseForm(false);
          setIsFullReport(false);
          setAnimState(false);
          setTimeout(() => {
            setAnimState(true);
          }, 1000);
        }}
      ></div>
      {/* )} */}
      <div
        className={`${isFullReport ? "form-background" : "hide-background"}`}
        onClick={() => {
          setIsFullReport(false);
        }}
      ></div>
      {authState ? (
        <div className="drug-container">
          <div className="drug-head">
            <AiOutlineMenu className="ham" onClick={() => setIsNav(!isNav)} />
            <div className="drug-heading">
              <h1>Drugs</h1>
              {/* <p>Manage all your drugs transactions here</p> */}
            </div>
            <div
              className="new-btn"
              onClick={() => setShowOptions(!showOptions)}
            >
              <div className="plus-circle">
                <HiOutlinePlus />
              </div>
              <p>New</p>
              <div
                className={`${
                  showOptions ? "new-options show-new-options" : "new-options"
                }`}
              >
                <button
                  className={`${isDrugPurchaseForm && "new-active"}`}
                  onClick={() => {
                    setIsDrugPurchaseForm(!isDrugPurchaseForm);
                    setIsDrugConsumedForm(false);
                  }}
                >
                  Purchase
                </button>
                <button
                  className={`${isDrugConsumedForm && "new-active"}`}
                  onClick={() => {
                    setIsDrugConsumedForm(!isDrugConsumedForm);
                    setIsDrugPurchaseForm(false);
                  }}
                >
                  Consumption
                </button>
              </div>
            </div>
          </div>
          <div className="all-drug">
            <DrugConsumed
              isDrugConsumedForm={isDrugConsumedForm}
              setIsDrugConsumedForm={setIsDrugConsumedForm}
              getAllDrugConsumed={getAllDrugConsumed}
              animState={animState}
              setAnimState={setAnimState}
            />
            <DrugPurchase
              isDrugPurchaseForm={isDrugPurchaseForm}
              setIsDrugPurchaseForm={setIsDrugPurchaseForm}
              getAllDrugPurchase={getAllDrugPurchase}
              getActiveCreditors={getActiveCreditors}
              animState={animState}
              setAnimState={setAnimState}
            />

            {!isFullReport &&
              (miniPurchaseList &&
              miniConsumptionList &&
              miniPurchaseList.length === 0 &&
              miniConsumptionList.length === 0 ? (
                <div className="empty-main-report">
                  <h1>There are no Drug reports available yet</h1>
                  <p>
                    Create a new report by tapping the <span>NEW</span>{" "}
                    button...
                  </p>
                </div>
              ) : miniPurchaseList || miniConsumptionList ? (
                <div className="mini-list">
                  <div className="mini-list-container animate__animated animate__fadeIn">
                    <div className="all-mini-wrapper">
                      <div className="all-mini-list">
                        <div className="bird-mini-list">
                          <div className="mini-table">
                            <p className="title mini-title">
                              {miniPurchaseList && miniPurchaseList.length === 0
                                ? "You do ot have a Drug purchase report yet"
                                : "Your most recent Drug Purchase transactions:"}
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <th>Date</th>
                                  <th>Drug</th>
                                  <th>Qty</th>
                                  <th>Unit Price</th>
                                </tr>
                              </tbody>

                              {returnedDrugPurchase.name &&
                                miniPurchaseList.slice(0, 5)}
                            </table>
                          </div>
                          <button
                            className="view-report"
                            onClick={() => {
                              setIsFullReport(!isFullReport);
                              setIsDrugToggle(true);
                            }}
                          >
                            View full report <BsFileEarmarkText />
                          </button>
                        </div>
                        <div className="other-mini-list">
                          <div className="mini-table">
                            <p className="title mini-title">
                              {miniConsumptionList &&
                              miniConsumptionList.length === 0
                                ? "You do not have a Drug consumption report yet"
                                : "Your most recent Drug consumption:"}
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <th>Date</th>
                                  <th>Drug</th>
                                  <th>Satchet(Qty Used)</th>
                                  <th>Unit Price</th>
                                </tr>
                              </tbody>

                              {returnedDrugConsumed.name &&
                                miniConsumptionList.slice(0, 5)}
                            </table>
                          </div>
                          <button
                            className="view-report"
                            onClick={() => {
                              setIsFullReport(!isFullReport);
                              setIsDrugToggle(false);
                            }}
                          >
                            View full report <BsFileEarmarkText />
                          </button>
                        </div>
                      </div>
                      <div className="income-info extra-info">
                        <div className="grid-1-extra">
                          <div className="extra">
                            <p className="head">Total drugs Purchased</p>
                            <p>{formatMoney(totalQty)}</p>
                          </div>
                          <div className="extra">
                            <p className="head">Total amount spent </p>
                            <p>{formatMoney(totalAmount)}</p>
                          </div>
                        </div>
                        <div className="extra">
                          <p className="head">Total qty(satchet) consumed</p>
                          <p>{formatMoney(totalSatchet)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="suppliers">
                      <p className="title">Active creditors and Amount</p>
                      <div className="debtor-list-container">
                        {activeCreditors && activeCreditors.length !== 0 ? (
                          activeCreditors.map((activeCreditor) => {
                            const { CreditorId, SupplierName, Amount } =
                              activeCreditor;
                            return (
                              <Link
                                to={`/creditor/${CreditorId}`}
                                key={CreditorId}
                                className="debtor-list"
                              >
                                <p className="d-name">{SupplierName}</p>
                                <p className="debt-amount">
                                  ₦ {formatMoney(Amount)}.00
                                </p>
                              </Link>
                            );
                          })
                        ) : (
                          <p className="title">
                            You do not have any DRUGS creditor yet. When you do,
                            they will appear here...
                          </p>
                        )}
                      </div>
                      <div className="debtor-list">
                        <p className="title">TOTAL CREDIT:</p>
                        <p className="debt-amount">
                          ₦ {formatMoney(totalCredit)}.00
                        </p>
                      </div>
                      {/* <button className="view-all">View All</button> */}
                    </div>
                  </div>
                </div>
              ) : (
                "loading, please wait"
              ))}

            {isFullReport && (
              <div className="full-report">
                <div className="drug-table-head">
                  <h3>{isDrugToggle ? "Drug purchase" : "Drug consumption"}</h3>
                </div>
                {isDrugToggle && <DrugPurchaseTable ref={componentRef} />}
                {!isDrugToggle && <DrugConsumedTable ref={componentRef} />}

                <button onClick={handlePrint} className="btn-generate">
                  Generate Report <BsFileEarmarkText className="report" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
